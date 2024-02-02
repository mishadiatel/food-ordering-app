'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

export default function UserTabs({isAdmin}: Readonly<{ isAdmin: boolean }>) {
    const path = usePathname();

    return (
        <div className={'flex gap-2 justify-center tabs'}>
            <Link href={'/profile'}
                  className={path === '/profile' ? 'active' : ''}>
                Profile
            </Link>
            {isAdmin && (
                <>
                    <Link href={'/categories'}
                          className={path === '/categories' ? 'active' : ''}>
                        Categories
                    </Link>
                    <Link href={'/menu-items'}
                          className={/menu-items/.test(path) ? 'active' : ''}>
                        Menu Items
                    </Link>
                    <Link href={'/users'}
                          className={path.includes('/users') ? 'active' : ''}>
                        Users
                    </Link>
                    <Link href={'/orders'}
                          className={path === '/orders' ? 'active' : ''}>
                        Orders
                    </Link>
                </>

            )}
        </div>

    );
}
