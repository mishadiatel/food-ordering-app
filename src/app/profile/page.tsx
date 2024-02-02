'use client';
import {useSession} from 'next-auth/react';
import {redirect} from 'next/navigation';
import {FormEvent, useEffect, useState} from 'react';
import toast from 'react-hot-toast';
import UserTabs from '@/components/layout/Tabs';
import {IUser} from '@/hooks/useProfile';
import UserForm from '@/components/layout/UserForm';

export default function ProfilePage() {
    const session = useSession();

    const [user, setUser] = useState<IUser | undefined>(undefined);
    const [isAdmin, setIsAdmin] = useState(false);
    const [profilefetched, setProfileFetched] = useState(false);
    const {status} = session;

    useEffect(() => {
        if (status === 'authenticated') {
            // setUserName(session.data?.user?.name!);
            // setImage(session.data?.user?.image!);
            fetch('/api/profile').then(response => {
                response.json().then((data: IUser) => {
                    // setPhone(data.phone);
                    // setStreetAddress(data.streetAddress);
                    // setPostalCode(data.postalCode);
                    // setCity(data.city);
                    // setCountry(data.country);
                    setUser(data);
                    setIsAdmin(!!data.admin);
                    setProfileFetched(true);
                });
            });
        }

    }, [session, status]);
    if (status === 'loading') {
        return <div>Loading...</div>;
    }
    if (status === 'unauthenticated') {
        return redirect('/login');
    }

    async function handleProfileInfoUpdate(event: FormEvent<HTMLFormElement>, data: IUser) {
        event.preventDefault();
        const savingPromise: Promise<void> = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
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

    return (
        <section className={'mt-8'}>
            <UserTabs isAdmin={isAdmin}/>
            <div className={'max-w-2xl mx-auto mt-8 '}>
                {user && <UserForm user={user} onSave={handleProfileInfoUpdate}/>}
            </div>
        </section>
    );
}
