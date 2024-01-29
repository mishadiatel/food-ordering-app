import {useEffect, useState} from 'react';

interface IUser {
    email?: string;
    phone?: string;
    streetAddress?: string;
    postalCode?: string;
    country?: string;
    city?: string;
    admin?: boolean;
    name?: string;
    image?: string;
    password?: string;
}

export default function useProfile() {
    const [data, setData] = useState<IUser>({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        fetch('/api/profile').then(response => {
            response.json().then((data) => {
                setData(data);
                setLoading(false);
            });
        });
    }, []);
    return {data, loading};
}
