'use client';
import EditableImage from '@/components/layout/EditableImage';
import {FormEvent, useState} from 'react';
import useProfile, {IUser} from '@/hooks/useProfile';
import AddressInputs from '@/components/layout/AddressInputs';

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

    function handleAddressChange(propName: string, value: string) {
        switch (propName) {
            case 'phone':
                setPhone(value);
                break;
            case 'streetAddress':
                setStreetAddress(value);
                break;
            case 'postalCode':
                setPostalCode(value);
                break;
            case 'city':
                setCity(value);
                break;
            case 'country':
                setCountry(value);
                break;
            default:
                break;
        }
    }

    const {data: loggedInUser} = useProfile();
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
                <AddressInputs addressProps={{streetAddress, postalCode, city, country, phone}}
                               setAddressProp={handleAddressChange} />
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
