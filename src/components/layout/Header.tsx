'use client';
import Link from 'next/link';
import {signOut, useSession} from 'next-auth/react';
import {useContext} from 'react';
import {CartContext} from '@/components/AppContext';
import ShoppingCart from '@/components/icons/ShoppingCart';

export default function Header() {
    const session = useSession();
    const status = session.status;
    const userData = session.data?.user;
    let userName = userData?.name || userData?.email ;
    userName = userName?.includes(' ') ? userName?.split(' ')[0] : userName;
   const {cartProducts} = useContext(CartContext)
    return (
        <header className={'flex items-center justify-between'}>

            <nav className={'flex gap-8 items-center text-gray-500 font-semibold'}>
                <Link href={'/'} className={'text-primary font-semibold text-2xl'}>
                    ST PIZZA
                </Link>
                <Link href={'/'}>Home</Link>
                <Link href={'/menu'}>Menu</Link>
                <Link href={'/#about'}>About</Link>
                <Link href={'/#contact'}>Contact</Link>

            </nav>
            <nav className={'flex items-center gap-8'}>
                {status === 'authenticated' && (
                    <>
                        <Link href={'/profile'} className={'whitespace-nowrap'}>
                            Hello {userName}
                        </Link>
                        <button onClick={() => signOut()} className={'bg-primary text-white px-8 rounded-full py-2'}>
                            Logout
                        </button>
                    </>

                )}
                {status !== 'authenticated' && (
                    <>
                        <Link href={'/login'}>
                            Login
                        </Link>
                        <Link href={'/register'} className={'bg-primary text-white px-8 rounded-full py-2'}>
                            Register
                        </Link>
                    </>

                )}
                <Link href={'/cart'} className={'relative'}>
                    <ShoppingCart />
                    <span className={'absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3'}>{cartProducts.length}</span>

                </Link>



            </nav>
        </header>
    );
}
