import {ChangeEvent, Dispatch, SetStateAction} from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image';

interface EditableImageProps {
    link: string;
    setLink: Dispatch<SetStateAction<string>>;
}

export default function EditableImage({link, setLink}: EditableImageProps) {
    async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {

        const files = event.target.files;
        if (files && files.length > 0) {
            const data = new FormData;
            data.set('file', files[0]);
            const uploadPromise: Promise<void> = fetch('/api/upload', {
                method: 'POST',
                body: data
            }).then(response => {
                if (response.ok) {
                    return response.json().then(link => {
                        setLink(link);
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
        <>
            {link && (
                <Image src={link} alt={'user image avatar'} width={250} height={250}
                       className={'rounded-lg w-full h-full mb-1 max-w-[120px]'}/>
            )}
            {!link && (
                <div className={'text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1'}>No image </div>
            )}

            <label>
                <input type="file" className={'hidden'} onChange={handleFileChange}/>
                <span className={'block border-gray-300 rounded-lg p-2 text-center cursor-pointer'}>
                                    Edit
                                </span>
            </label>
        </>
    );
}
