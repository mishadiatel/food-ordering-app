'use client';
import useProfile from '@/hooks/useProfile';
import UserTabs from '@/components/layout/Tabs';
import Link from 'next/link';
import Right from '@/components/icons/Right';


export default function MenuItemsPage() {
    const {loading, data} = useProfile();

    if (loading) {
        return <div>Loading user info...</div>;
    }
    if (!data.admin) {
        return <div>Not an admin</div>;
    }

    return (
        <section className={'mt-8 max-w-md mx-auto'}>
            <UserTabs isAdmin={true}/>
            <div className={'mt-8'}>
                <Link href={'/menu-items/new'}
                      className={'button flex'}>
                    <span>Create new menu item</span>
                    <Right/>
                </Link>

            </div>
        </section>
    );
}
