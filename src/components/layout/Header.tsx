'use client';
import Link from 'next/link';
import {signOut, useSession} from 'next-auth/react';

export default function Header() {
    const session = useSession();
    const status = session.status;
    console.log(session);
    return (
        <header className={'flex items-center justify-between'}>

            <nav className={'flex gap-8 items-center text-gray-500 font-semibold'}>
                <Link href={'/'} className={'text-primary font-semibold text-2xl'}>
                    ST PIZZA
                </Link>
                <Link href={'/'}>Home</Link>
                <Link href={'/'}>Menu</Link>
                <Link href={'/'}>About</Link>
                <Link href={'/'}>Contact</Link>

            </nav>
            <nav className={'flex items-center gap-8'}>
                {status === 'authenticated' && (
                    <button onClick={() => signOut()} className={'bg-primary text-white px-8 rounded-full py-2'}>
                        Logout
                    </button>
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


            </nav>
        </header>
    );
}
