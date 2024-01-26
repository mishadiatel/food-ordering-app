'use client';
import {useSession} from 'next-auth/react';
import {redirect} from 'next/navigation';
import Image from 'next/image';
import {FormEvent, useEffect, useState} from 'react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
    const session = useSession();
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState('');
    const {status} = session;
    useEffect(() => {
        setUserName(session.data?.user?.name!);
        setImage(session.data?.user?.image!);
    }, [session, status]);
    if (status === 'loading') {
        return <div>Loading...</div>;
    }
    if (status === 'unauthenticated') {
        return redirect('/login');
    }

    async function handleProfileInfoUpdate(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const savingPromise: Promise<void> = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name: userName, image})
            });
            if (response.ok) resolve();
            else reject();
        });
        await toast.promise(savingPromise, {
            loading: 'Saving...',
            success: 'Profile saved',
            error: 'Error'
        });

    }

    async function handleFileChange(event: FormEvent<HTMLInputElement>) {

        const files = event.currentTarget.files;
        if (files && files.length > 0) {
            const data = new FormData;
            data.set('file', files[0]);
            const uploadPromise: Promise<void> = fetch('/api/upload', {
                method: 'POST',
                body: data
            }).then(response => {
                if (response.ok) {
                    return response.json().then(link => {
                        setImage(link);
                    });
                }
                throw new Error('Something went wrong');
            });


            await toast.promise(uploadPromise, {
                loading: 'Uploading...',
                success: 'Uploads complete',
                error: 'Error uploading photo'
            });
        }


    }

    return (
        <section className={'mt-8'}>
            <h1 className={'text-center text-primary text-4xl mb-4'}>
                Profile
            </h1>
            <div className={'max-w-md mx-auto '}>
                <div className={'flex gap-4 items-center'}>
                    <div>
                        <div className={' p-2 rounded-lg relative'}>
                            {image && (
                                <Image src={image} alt={'user image avatar'} width={250} height={250}
                                       className={'rounded-lg w-full h-full mb-1 max-w-[120px]'}/>
                            )}

                            <label>
                                <input type="file" className={'hidden'} onChange={handleFileChange}/>
                                <span className={'block border-gray-300 rounded-lg p-2 text-center cursor-pointer'}>
                                    Edit
                                </span>
                            </label>
                        </div>

                    </div>
                    <form className={'grow'} onSubmit={handleProfileInfoUpdate}>
                        <input type="text" placeholder={'First and last name'}
                               value={userName} onChange={e => setUserName(e.target.value)}/>
                        <input type="email" value={session.data?.user?.email!} disabled={true}/>
                        <button type={'submit'}>Save</button>
                    </form>

                </div>
            </div>
        </section>
    );
}
