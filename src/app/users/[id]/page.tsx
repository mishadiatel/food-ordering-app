'use client';
import UserTabs from '@/components/layout/Tabs';
import useProfile, {IUser} from '@/hooks/useProfile';
import UserForm from '@/components/layout/UserForm';
import {FormEvent, useEffect, useState} from 'react';
import {useParams} from 'next/navigation';
import toast from 'react-hot-toast';

export default function EditUsersPage() {
    const {id} = useParams();
    const {data, loading} = useProfile()
    const [user, setUser] = useState<IUser | undefined>(undefined);
    useEffect(() => {
        fetch(`/api/profile?_id=${id}`).then(response => {
            response.json().then((user) => {
                setUser(user)
            })
        })
    }, [])
    if(loading) return <div>Loading user info...</div>
    if(!data?.admin) return <div>Not an admin</div>
    async function handleSaveButtonClick(event: FormEvent<HTMLFormElement>, data: IUser) {
        event.preventDefault();
        const savingPromise: Promise<void> = new Promise(async (resolve, reject) => {
            const response = await fetch(`/api/profile`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({...data, _id: id})
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
        <section className={'mt-8 mx-auto max-w-2xl'}>
            <UserTabs isAdmin={true}/>
            <div className={'mt-8'}>
                <UserForm user={user} onSave={handleSaveButtonClick} />
            </div>
        </section>
    )
}
