'use client';
import UserTabs from '@/components/layout/Tabs';
import {FormEvent, useEffect, useState} from 'react';
import useProfile from '@/hooks/useProfile';
import toast from 'react-hot-toast';
import DeleteButton from '@/components/DeleteButton';

export interface Category {
    name: string,
    _id: string
}

export default function CategoriesPage() {
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const {data: profileData, loading: profileLoading} = useProfile();
    const [editedCategory, setEditedCategory] = useState<Category | null>(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    function fetchCategories() {
        fetch('/api/categories').then(response => {
            response.json().then((categories) => {
                setCategories(categories);
            });
        });
    }

    if (profileLoading) {
        return <div>Loading user info...</div>;
    }

    if (!profileData.admin) {
        return <div>Not authorized</div>;
    }

    async function handleCategorySubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const creationPromise: Promise<void> = new Promise(async (resolve, reject) => {
            const data: { name: string, _id?: string } = {name: categoryName};
            if (editedCategory) {
                data._id = editedCategory._id;
            }
            const response = await fetch('/api/categories', {
                method: editedCategory ? 'PUT' : 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });
            setCategoryName('');
            fetchCategories();
            setEditedCategory(null);
            if (response.ok) resolve();
            else reject();
        });
        await toast.promise(creationPromise, {
            loading: editedCategory ? 'Updating category...' : 'Creating your new category...',
            success: editedCategory ? 'Category updated' : 'Category created!',
            error: 'Error, sorry...'
        });

    }

    async function handleDeleteClick(id: string) {
        const deletePromise: Promise<void> = new Promise(async (resolve, reject) => {
            const response = await fetch(`/api/categories?_id=${id}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'}
            });
            if (response.ok) resolve();
            else reject();
        });
        await toast.promise(deletePromise, {
            success: 'Category deleted',
            error: 'Error, sorry...',
            loading: 'Deleting category...'
        });
        fetchCategories();
    }

    return (
        <section className={'mt-8 max-w-2xl mx-auto'}>
            <UserTabs isAdmin={true}/>
            <form className={'mt-8'} onSubmit={handleCategorySubmit}>
                <div className="flex gap-2 items-end">
                    <div className={'grow'}>
                        <label>
                            {editedCategory ? 'Update category' : 'New category name'}
                            {editedCategory && (
                                <>: <b>{editedCategory.name}</b></>
                            )
                            }
                        </label>
                        <input type="text" value={categoryName}
                               onChange={e => setCategoryName(e.target.value)}/>
                    </div>
                    <div className={'pb-2 flex gap-2'}>
                        <button type={'submit'}
                                className={'border border-primary'}>
                            {editedCategory ? 'Update' : 'Create'}
                        </button>
                        <button
                            type={'button'}
                            onClick={() => {
                                setEditedCategory(null);
                                setCategoryName('');
                            }}>
                            Cancel
                        </button>
                    </div>
                </div>

            </form>
            <div>
                <h2 className={'mt-8 text-sm text-gray-500'}>Existing categories: </h2>
                {categories.length > 0 && categories.map(c => (
                    <div key={c._id}
                         className={'bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center'}>
                        <div
                            className={'grow '}>
                            {c.name}
                        </div>
                        <div className={'flex gap-1'}>
                            <button type={'button'}
                                    onClick={() => {
                                        setEditedCategory(c);
                                        setCategoryName(c.name);
                                    }}>
                                Edit
                            </button>
                            <DeleteButton label={'Delete'} onDelete={handleDeleteClick.bind(null, c._id)} />
                        </div>

                    </div>
                ))}
            </div>
        </section>
    );
}
