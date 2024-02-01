'use client';
import useProfile from '@/hooks/useProfile';
import UserTabs from '@/components/layout/Tabs';
import {FormEvent, useEffect, useState} from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Left from '@/components/icons/Left';
import {redirect, useParams} from 'next/navigation';
import MenuItemForm, {MenuItemWithPrices} from '@/components/layout/MenuItemForm';
import DeleteButton from '@/components/DeleteButton';

export interface MenuItem {
    _id: string,
    name: string,
    image: string,
    basePrice: number,
    description: string,
    sizes: { name: string, price: number }[],
    extraIngredientPrices: { name: string, price: number }[],
}


export default function EditMenuItemPage() {
    const {id} = useParams();
    const [menuItem, setMenuItem] = useState<MenuItem | undefined>(undefined);
    const [redirectToItems, setRedirectToItems] = useState(false);
    const {loading, data} = useProfile();

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then((menuItems: MenuItem[]) => {
                const item = menuItems.find(item => item._id === id);
                setMenuItem(item);
            });
        });
    }, []);

    if (loading) {
        return <div>Loading user info...</div>;
    }
    if (!data.admin) {
        return <div>Not an admin</div>;
    }

    async function handleFormSubmit(event: FormEvent<HTMLFormElement>, data: MenuItemWithPrices) {
        event.preventDefault();
        const savingPromise: Promise<void> = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({...data, _id: id})
            });
            if (response.ok) resolve();
            else reject();
        });
        await toast.promise(savingPromise, {
            loading: 'Saving this tasty item...',
            success: 'Item saved!',
            error: 'Error.'
        });
        setRedirectToItems(true);
    }

    async function handleDeleteClick() {
        const deletePromise: Promise<void> = new Promise(async (resolve, reject) => {
            const response = await fetch(`/api/menu-items?_id=${id}`, {
                method: 'DELETE',
            })
            if (response.ok) resolve();
            else reject();
        })
        await toast.promise(deletePromise, {
            loading: 'Deleting this tasty item...',
            success: 'Item deleted!',
            error: 'Error.'
        });
        setRedirectToItems(true);

    }

    if (redirectToItems) {
        return redirect('/menu-items');
    }

    return (
        <section className={'mt-8 '}>
            <UserTabs isAdmin={true}/>
            <div className={'max-w-md mx-auto mt-8'}>
                <Link href={'/menu-items'} className={'button'}>
                    <Left/>
                    <span>Show all menu items</span>
                </Link>
            </div>
            <MenuItemForm onSubmit={handleFormSubmit} menuItem={menuItem}/>
            <div className={'max-w-md mx-auto mt-2'}>
                <div className={' max-w-xs ml-auto pl-4'}>
                    <DeleteButton label={'Delete this menu item'} onDelete={handleDeleteClick}/>
                </div>

            </div>
        </section>
    );
}
