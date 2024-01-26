'use client';
import {useSession} from 'next-auth/react';
import {redirect} from 'next/navigation';
import Image from 'next/image';
import {FormEvent, useEffect, useState} from 'react';
import InfoBox from '@/components/layout/InfoBox';
import SuccessBox from '@/components/layout/SuccessBox';

export default function ProfilePage() {
    const session = useSession();
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState('');
    const [saved, setSaved] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
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
    // const userImage = session.data?.user?.image!;

    async function handleProfileInfoUpdate(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSaved(false);
        setIsSaving(true);
        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: userName, image})
        });
        if (response.ok) {
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        }
        setIsSaving(false);
    }

    async function handleFileChange(event: FormEvent<HTMLInputElement>) {

        const files = event.currentTarget.files;
        if (files && files.length > 0) {
            const data = new FormData;
            data.set('file', files[0])
            setIsUploading(true);
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: data,
            });
            const link = await response.json();
            setImage(link);
            setIsUploading(false)
        }
    }

    return (
        <section className={'mt-8'}>
            <h1 className={'text-center text-primary text-4xl mb-4'}>
                Profile
            </h1>
            <div className={'max-w-md mx-auto '}>
                {saved && (
                    <SuccessBox>Profile saved</SuccessBox>
                )}
                {isSaving && (
                    <InfoBox>Saving...</InfoBox>
                )}
                {isUploading && (
                    <InfoBox>Uploading...</InfoBox>
                )}
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
