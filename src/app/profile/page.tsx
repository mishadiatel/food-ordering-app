'use client';
import {useSession} from 'next-auth/react';
import {redirect} from 'next/navigation';
import {FormEvent, useEffect, useState} from 'react';
import toast from 'react-hot-toast';
import UserTabs from '@/components/layout/Tabs';
import EditableImage from '@/components/layout/EditableImage';

export default function ProfilePage() {
    const session = useSession();
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState('');
    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [profilefetched, setProfileFetched] = useState(false);
    const {status} = session;

    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.data?.user?.name!);
            setImage(session.data?.user?.image!);
            fetch('/api/profile').then(response => {
                response.json().then((data) => {
                    setPhone(data.phone);
                    setStreetAddress(data.streetAddress);
                    setPostalCode(data.postalCode);
                    setCity(data.city);
                    setCountry(data.country);
                    setIsAdmin(data.admin);
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

    async function handleProfileInfoUpdate(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const savingPromise: Promise<void> = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: userName,
                    image,
                    streetAddress,
                    postalCode,
                    city,
                    country,
                    phone
                })
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
                <div className={'flex gap-4 '}>
                    <div>
                        <div className={' p-2 rounded-lg relative'}>
                            <EditableImage link={image} setLink={setImage}/>
                        </div>

                    </div>
                    <form className={'grow'} onSubmit={handleProfileInfoUpdate}>
                        <label>
                            First and last name
                        </label>
                        <input type="text" placeholder={'First and last name'}
                               value={userName} onChange={e => setUserName(e.target.value)}/>
                        <label>Email</label>
                        <input type="email" value={session.data?.user?.email!}
                               disabled={true} placeholder={'Email'}/>
                        <label>Phone number</label>
                        <input type="tel" placeholder={'Phone number'}
                               value={phone} onChange={e => setPhone(e.target.value)}/>
                        <label>
                            Street address
                        </label>
                        <input type="text" placeholder={'Street address'}
                               value={streetAddress} onChange={e => setStreetAddress(e.target.value)}/>
                        <div className={'flex gap-2'}>
                            <div>
                                <label>
                                    Postal code
                                </label>
                                <input type="text" placeholder={'Postal code'} value={postalCode}
                                       onChange={e => setPostalCode(e.target.value)}/>
                            </div>
                            <div>
                                <label>City</label>
                                <input type="text" placeholder={'City'} value={city}
                                       onChange={e => setCity(e.target.value)}/>
                            </div>

                        </div>
                        <label>Country</label>
                        <input type="text" placeholder={'Country'} value={country}
                               onChange={e => setCountry(e.target.value)}/>
                        <button type={'submit'}>Save</button>
                    </form>

                </div>
            </div>
        </section>
    );
}
