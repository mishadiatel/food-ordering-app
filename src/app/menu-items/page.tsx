'use client';
import useProfile from '@/hooks/useProfile';
import UserTabs from '@/components/layout/Tabs';
import Link from 'next/link';
import Right from '@/components/icons/Right';
import {useEffect, useState} from 'react';
import Image from 'next/image';


export default function MenuItemsPage() {
    const {loading, data} = useProfile();
    const [menuItems, setMenuItems] = useState<{
        _id: string,
        name: string,
        basePrice: number,
        description: string,
        image: string,
    }[]>([]);

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setMenuItems(menuItems);
            });
        });

    }, []);

    if (loading) {
        return <div>Loading user info...</div>;
    }
    if (!data.admin) {
        return <div>Not an admin</div>;
    }

    return (
        <section className={'mt-8 max-w-2xl mx-auto'}>
            <UserTabs isAdmin={true}/>
            <div className={'mt-8'}>
                <Link href={'/menu-items/new'}
                      className={'button flex'}>
                    <span>Create new menu item</span>
                    <Right/>
                </Link>

            </div>
            <div>
                <h2 className={'text-sm text-gray-500 mt-8'}>Edit menu item</h2>
                <div className={'grid grid-cols-3 gap-2'}>
                    {menuItems.length > 0 && menuItems.map((item) => (
                        <Link href={`/menu-items/edit/${item._id}`}
                              className={'bg-gray-200 rounded-lg p-4'} key={item._id}>
                            <div className={'relative'}>
                                <Image src={item.image} alt={''} width={200} height={200} className={'rounded-md'}/>
                            </div>
                            <div className={'text-center'}>
                                {item.name}
                            </div>

                        </Link>
                    ))}
                </div>


            </div>
        </section>
    );
}
