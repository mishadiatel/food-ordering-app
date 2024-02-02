'use client';

import UserTabs from '@/components/layout/Tabs';
import useProfile, {IUser} from '@/hooks/useProfile';
import {useEffect, useState} from 'react';
import Link from 'next/link';

// export interface IUser {
//     _id: string;
//     email: string;
//     name?: string;
// }

export default function UsersPage() {
    const [users, setUsers] = useState<IUser[]>([])
    const {loading, data} = useProfile()

    useEffect(() => {
        fetch('/api/users').then(response => {
            response.json().then(users => {
                setUsers(users)
            })
        })
    }, [])

    if(loading) return <div>Loading user info...</div>
    if(!data?.admin) return <div>Not an admin</div>
    return (
        <section className={'max-w-2xl mx-auto mt-8'}>
            <UserTabs isAdmin={true}/>
            <div className={'mt-8'}>
                {users.length > 0 && users.map(user => (
                    <div key={user._id} className={'bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4'}>
                        <div className={'grid grid-cols-2 md:grid-cols-3 gap-4 grow'}>
                            <div className={'text-gray-900'}>
                                {!!user.name && (<span>{user.name}</span>)}
                                {!user.name && (<span className={'italic'}>No name</span>)}
                            </div>

                            <span className={'text-gray-500'}>{user.email}</span>
                        </div>
                        <div>
                            <Link className={'button'} href={`/users/${user._id}`}>Edit</Link>
                        </div>

                    </div>
                ))}
            </div>
        </section>
    );
}
