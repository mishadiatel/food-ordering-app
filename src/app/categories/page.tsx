'use client';
import UserTabs from '@/components/layout/Tabs';
import {FormEvent, useEffect, useState} from 'react';
import useProfile from '@/hooks/useProfile';
import toast from 'react-hot-toast';

export default function CategoriesPage() {
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState<{ name: string, _id: string }[]>([]);
    const {data: profileData, loading: profileLoading} = useProfile();
    const [editedCategory, setEditedCategory] = useState<{ name: string, _id: string } | null>(null);

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

    return (
        <section className={'mt-8 max-w-md mx-auto'}>
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
                    <div className={'pb-2'}>
                        <button type={'submit'}
                                className={'border border-primary'}>
                            {editedCategory ? 'Update' : 'Create'}
                        </button>
                    </div>
                </div>

            </form>
            <div>
                <h2 className={'mt-8 text-sm text-gray-500'}>Edit category: </h2>
                {categories.length > 0 && categories.map(c => (
                    <button key={c.name}
                            onClick={() => {
                                setEditedCategory(c);
                                setCategoryName(c.name);
                            }}
                            className={'rounded-xl p-2 px-4 flex gap-1 cursor-pointer mb-1'}>
                        <span>{c.name}</span>
                    </button>
                ))}
            </div>
        </section>
    );
}
