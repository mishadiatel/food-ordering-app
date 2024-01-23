import Link from 'next/link';

export default function Header() {
    return (
        <header className={'flex items-center justify-between'}>
            <Link href={'/'} className={'text-primary font-semibold text-2xl'}>
                ST PIZZA
            </Link>
            <nav className={'flex gap-8 items-center text-gray-500 font-semibold'}>
                <Link href={'/'}>Home</Link>
                <Link href={'/'}>Menu</Link>
                <Link href={'/'}>About</Link>
                <Link href={'/'}>Contact</Link>
                <Link href={'/'} className={'bg-primary text-white px-8 rounded-full py-2'}>
                    Login
                </Link>
            </nav>
        </header>
    )
}
