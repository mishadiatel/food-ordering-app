'use client';
import {FormEvent, useState} from 'react';
import Image from 'next/image';
import {signIn} from 'next-auth/react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProgress, setLoginInProgress] = useState(false);

    async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoginInProgress(true);
        await signIn('credentials', {email, password, callbackUrl: '/'});
        setLoginInProgress(false);
    }

    return (
        <section className={'mt-8'}>
            <h1 className={'text-center text-primary text-4xl mb-4'}>
                Login
            </h1>
            <form className={'max-w-xs mx-auto'} onSubmit={handleFormSubmit}>
                <input type="email" name={'email'} placeholder={'email'} value={email} disabled={loginInProgress}
                       onChange={e => setEmail(e.target.value)}/>
                <input type="password" name={'password'} placeholder={'password'} value={password}
                       disabled={loginInProgress}
                       onChange={e => setPassword(e.target.value)}/>
                <button type={'submit'} disabled={loginInProgress}>Login</button>
                <div className={'text-center my-4 text-gray-500'}>
                    or login with provider
                </div>
                <button type={'button'} className={'flex gap-4 justify-center'}
                        onClick={() => signIn('google', {callbackUrl: '/'})}>
                    <Image src={'/google.png'} alt={'login with google icon'} width={24} height={24}/>
                    Login with google
                </button>
            </form>
        </section>
    );
}
