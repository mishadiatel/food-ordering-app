'use client';
import {useEffect, useState} from 'react';
import {Category} from '@/app/categories/page';
import {MenuItemWithPrices} from '@/components/layout/MenuItemForm';
import SectionHeaders from '@/components/layout/SectionHeaders';
import MenuItem from '@/components/menu/MenuItem';

export default function MenuPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [menuItems, setMenuItems] = useState<MenuItemWithPrices[]>([]);
    useEffect(() => {
        fetch('/api/categories').then(response => {
            response.json().then(categories => {
                setCategories(categories);
            });
        });
        fetch('/api/menu-items').then(response => {
            response.json().then(menuItems => {
                setMenuItems(menuItems);
            });
        });
    }, []);
    return (
        <section className={'mt-8'}>
            {categories.length > 0 && categories.map(c => (
                <div key={c._id} className={'text-center'}>
                    <SectionHeaders mainHeader={c.name}/>
                    <div className={'grid grid-cols-3 gap-4 mt-6 mb-12'}>
                        {menuItems.filter(item => item.category === c._id).map(item => (
                            <MenuItem item={item} key={item._id} />
                        ))}
                    </div>


                </div>
            ))}
        </section>
    );
}
