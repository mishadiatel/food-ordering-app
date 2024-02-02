'use client';
import EditableImage from '@/components/layout/EditableImage';
import {FormEvent, useState} from 'react';
import useProfile, {IUser} from '@/hooks/useProfile';

interface UserFormProps {
    user?: IUser;
    onSave: (event: FormEvent<HTMLFormElement>, data: IUser) => Promise<void>;
}

export default function UserForm({user, onSave}: UserFormProps) {
    const [userName, setUserName] = useState(user?.name || '');
    const [image, setImage] = useState(user?.image || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
    const [postalCode, setPostalCode] = useState(user?.postalCode || '');
    const [city, setCity] = useState(user?.city || '');
    const [country, setCountry] = useState(user?.country || '');
    const [admin, setAdmin] = useState(user?.admin || false);

    const {data: loggedInUser} = useProfile();
    console.log(user);
    return (
        <div className={'flex gap-4 '}>
            <div>
                <div className={' p-2 rounded-lg relative'}>
                    <EditableImage link={image} setLink={setImage}/>
                </div>

            </div>
            <form className={'grow'}
                  onSubmit={(event) => onSave(event, {
                      name: userName,
                      image,
                      phone,
                      streetAddress,
                      postalCode,
                      city,
                      country,
                      admin
                  })}>
                <label>
                    First and last name
                </label>
                <input type="text" placeholder={'First and last name'}
                       value={userName} onChange={e => setUserName(e.target.value)}/>
                <label>Email</label>
                <input type="email" value={user?.email}
                       disabled={true} placeholder={'Email'}/>
                <label>Phone number</label>
                <input type="tel" placeholder={'Phone number'}
                       value={phone} onChange={e => setPhone(e.target.value)}/>
                <label>
                    Street address
                </label>
                <input type="text" placeholder={'Street address'}
                       value={streetAddress} onChange={e => setStreetAddress(e.target.value)}/>
                <div className={'grid grid-cols-2 gap-2'}>
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
                {loggedInUser.admin && (
                    <div>
                        <label className={'p-2 inline-flex items-center gap-2 '}>
                            <input type={'checkbox'} checked={admin} onChange={e => setAdmin(e.target.checked)}
                                   id={'adminCb'} className={''}/>
                            <span>Admin</span>
                        </label>
                    </div>
                )}

                <button type={'submit'}>Save</button>
            </form>

        </div>
    );
}
