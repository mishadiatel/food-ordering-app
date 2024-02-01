'use client';
import useProfile from '@/hooks/useProfile';
import UserTabs from '@/components/layout/Tabs';
import EditableImage from '@/components/layout/EditableImage';
import {FormEvent, useState} from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Left from '@/components/icons/Left';
import {redirect} from 'next/navigation';
import MenuItemForm, {MenuItemWithPrices} from '@/components/layout/MenuItemForm';
import {MenuItem} from '@/app/menu-items/edit/[id]/page';

export default function NewMenuItemPage() {
    const [redirectToItems, setRedirectToItems] = useState(false);
    const {loading, data} = useProfile();

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
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
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

    if (redirectToItems) {
        return redirect('/menu-items');
    }

    return (
        <section className={'mt-8 '}>
            <UserTabs isAdmin={true}/>
            <div className={'max-w-2xl mx-auto mt-8'}>
                <Link href={'/menu-items'} className={'button'}>
                    <Left/>
                    <span>Show all menu items</span>
                </Link>
            </div>
            <MenuItemForm onSubmit={handleFormSubmit} />
        </section>
    );
}
