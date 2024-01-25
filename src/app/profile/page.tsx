'use client';
import {useSession} from 'next-auth/react';
import {redirect} from 'next/navigation';
import Image from 'next/image';
import {FormEvent, useEffect, useState} from 'react';

export default function ProfilePage() {
    const session = useSession();
    const [userName, setUserName] = useState('');
    const [saved, setSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const {status} = session;
    useEffect(() => {
        setUserName(session.data?.user?.name!);
    }, [session, status]);
    if (status === 'loading') {
        return <div>Loading...</div>;
    }
    if (status === 'unauthenticated') {
        return redirect('/login');
    }
    const userImage = session.data?.user?.image!;

    async function handleProfileInfoUpdate(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSaved(false);
        setIsSaving(true)
        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: userName})
        });
        if (response.ok) {
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        }
        setIsSaving(false)
    }

    return (
        <section className={'mt-8'}>
            <h1 className={'text-center text-primary text-4xl mb-4'}>
                Profile
            </h1>
            <div className={'max-w-md mx-auto '}>
                {saved && (
                    <h2 className={'text-center bg-green-100 p-4 rounded-lg border border-green-300'}>
                        Profile saved
                    </h2>
                )}
                {isSaving && (
                    <h2 className={'text-center bg-blue-100 p-4 rounded-lg border border-blue-300'}>
                        Saving...
                    </h2>
                )}
                <div className={'flex gap-4 items-center'}>
                    <div>
                        <div className={' p-2 rounded-lg relative'}>
                            <Image src={userImage} alt={'user image avatar'} width={250} height={250}
                                   className={'rounded-lg w-full h-full mb-1'}/>

                            <button type={'button'}>Edit</button>
                        </div>

                    </div>
                    <form className={'grow'} onSubmit={handleProfileInfoUpdate}>
                        <input type="text" placeholder={'First and last name'} disabled={isSaving}
                               value={userName} onChange={e => setUserName(e.target.value)}/>
                        <input type="email" value={session.data?.user?.email!} disabled={true}/>
                        <button type={'submit'} disabled={isSaving}>Save</button>
                    </form>

                </div>
            </div>
        </section>
    );
}
