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
    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
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
                <div className={'flex gap-4 '}>
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
