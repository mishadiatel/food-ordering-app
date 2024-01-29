'use client';
import useProfile from '@/hooks/useProfile';
import UserTabs from '@/components/layout/Tabs';
import EditableImage from '@/components/layout/EditableImage';
import {FormEvent, useState} from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Left from '@/components/icons/Left';
import {redirect} from 'next/navigation';

export default function NewMenuItemPage() {
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [basePrice, setBasePrice] = useState('');
    const [redirectToItems, setRedirectToItems] = useState(false);
    const {loading, data} = useProfile();

    if (loading) {
        return <div>Loading user info...</div>;
    }
    if (!data.admin) {
        return <div>Not an admin</div>;
    }

    async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = {
            image,
            name,
            description,
            basePrice
        };
        const savingPromise: Promise<void> = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });
            if (response.ok) resolve();
            else reject();
        });
        await toast.promise(savingPromise, {
            loading: 'Saving this tasty item...',
            success: 'Item saved!',
            error: 'Error.'
        });
        setRedirectToItems(true);
    }

    if (redirectToItems) {
        return redirect('/menu-items');
    }

    return (
        <section className={'mt-8 '}>
            <UserTabs isAdmin={true}/>
            <div className={'max-w-md mx-auto mt-8'}>
                <Link href={'/menu-items'} className={'button'}>
                    <Left/>
                    <span>Show all menu items</span>
                </Link>
            </div>
            <form onSubmit={handleFormSubmit} className={'mt-8 max-w-md mx-auto'}>
                <div className="grid gap-4 items-start"
                     style={{gridTemplateColumns: '.3fr .7fr'}}>
                    <div>
                        <EditableImage link={image} setLink={setImage}/>
                    </div>

                    <div className={'grow'}>
                        <label>Item name</label>
                        <input type="text" value={name}
                               onChange={e => setName(e.target.value)}/>
                        <label>Description</label>
                        <input type="text" value={description}
                               onChange={e => setDescription(e.target.value)}/>
                        <label>Base Price</label>
                        <input type="text" value={basePrice}
                               onChange={e => setBasePrice(e.target.value)}/>
                        <button type={'submit'}>Save</button>
                    </div>

                </div>
            </form>
        </section>
    );
}
