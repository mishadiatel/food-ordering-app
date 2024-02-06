'use client';
import SectionHeaders from '@/components/layout/SectionHeaders';
import {CartContext, cartProductPrice} from '@/components/AppContext';
import {FormEvent, useContext, useEffect, useState} from 'react';
import Image from 'next/image';
import Trash from '@/components/icons/Trash';
import AddressInputs from '@/components/layout/AddressInputs';
import useProfile from '@/hooks/useProfile';
import toast from 'react-hot-toast';

export default function CartPage() {
    const {cartProducts, removeCartProducts} = useContext(CartContext);
    const [address, setAddress] = useState({
        phone: '',
        streetAddress: '',
        postalCode: '',
        city: '',
        country: ''
    });
    const {data: profileData} = useProfile();
    const subtotal = cartProducts.reduce((acc, product) => acc + cartProductPrice(product), 0);

    useEffect(() => {
        if (profileData) {
            setAddress({
                phone: profileData.phone || '',
                streetAddress: profileData.streetAddress || '',
                postalCode: profileData.postalCode || '',
                city: profileData.city || '',
                country: profileData.country || ''
            });
        }
    }, [profileData]);

    async function proceedToCheckout(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const promise: Promise<void> = new Promise((resolve, reject) => {
            fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cartProducts,
                    address
                })
            }).then(async response => {
                if (response.ok) {
                    resolve();
                    window.location.href = await response.json();
                } else {
                    reject();
                }
            });
        });

        await toast.promise(promise, {
            loading: 'Preparing your order...',
            success: 'Redirecting to payment...',
            error: 'Something went wrong. Please try again latter'
        })


    }


    function handleAddressChange(propName: string, value: string) {
        setAddress(prevState => ({...prevState, [propName]: value}));
    }

    return (
        <section className={'mt-8'}>
            <div className={'text-center'}>
                <SectionHeaders mainHeader={'Cart'}/>
            </div>

            <div className={'mt-8 grid gap-8 grid-cols-2'}>
                <div>
                    {cartProducts.length === 0 && (
                        <div>No products in your shopping cart</div>
                    )}
                    {cartProducts.length > 0 && cartProducts.map((product, index) => (
                        <div key={index} className={'flex gap-4  border-b py-4 items-center'}>
                            <div className={'w-24'}>
                                <Image src={product.image || 'https://placehold.co/600x400'} alt={product.name!}
                                       width={240} height={240}/>
                            </div>
                            <div className={'grow'}>
                                <h3 className={'font-semibold'}>{product.name}</h3>
                                {product.size && (
                                    <div className={'text-sm'}>
                                        Size: <span>{product.size.name}</span>
                                    </div>
                                )}
                                {product.extras?.length > 0 && (
                                    <div className={'text-sm text-gray-500'}>
                                        Extras:
                                        {product.extras.map((extra, index) => (
                                            <div key={index}>{extra.name} ${extra.price}</div>
                                        ))}
                                    </div>
                                )}

                            </div>
                            <div className={'text-lg font-semibold'}>
                                ${cartProductPrice(product)}
                            </div>
                            <div className={'ml-2'}>
                                <button className={'p-2'}
                                        type={'button'}
                                        onClick={() => removeCartProducts(index)}
                                >
                                    <Trash/>
                                </button>
                            </div>

                        </div>
                    ))}
                    <div className={'py-2 pr-16 flex justify-end items-center'}>
                        <div className={'text-gray-500'}>
                            Subtotal: <br/>
                            Delivery: <br/>
                            Total:
                        </div>
                        <div className={'font-semibold pl-2 text-right'}>
                            ${subtotal} <br/>
                            $5 <br/>
                            ${subtotal + 5}
                        </div>
                    </div>

                </div>
                <div className={'bg-gray-100 rounded-lg p-4'}>
                    <h2>Checkout</h2>
                    <form onSubmit={proceedToCheckout}>
                        <AddressInputs addressProps={address}
                                       setAddressProp={handleAddressChange}/>
                        <button type={'submit'}>Pay ${subtotal + 5}</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
