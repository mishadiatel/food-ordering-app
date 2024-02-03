'use client';
import {SessionProvider} from 'next-auth/react';
import {createContext, Dispatch, SetStateAction, useEffect, useState} from 'react';
import {MenuItemWithPrices} from '@/components/layout/MenuItemForm';
import {ExtraPrice} from '@/components/layout/MenuItemPriceProps';
import toast from 'react-hot-toast';

interface CartItem extends MenuItemWithPrices {
    size: ExtraPrice | null;
    extras: ExtraPrice[];
}

export const CartContext = createContext<{
    cartProducts: CartItem[];
    setCartProducts: Dispatch<SetStateAction<CartItem[]>>;
    addToCart: (product: MenuItemWithPrices, size: ExtraPrice | null, extras: ExtraPrice[]) => void;
    removeCartProducts: (index: number) => void;
    clearCart: () => void;
}>({
    cartProducts: [],
    setCartProducts: () => {
    },
    addToCart: () => {
    },
    removeCartProducts: () => {
    },
    clearCart: () => {
    }
});

export function cartProductPrice(product: CartItem) {
    let selectedPrice = +product.basePrice!;
    if (product.size) {
        selectedPrice += +product.size.price;
    }
    if (product.extras?.length > 0) {
        selectedPrice += product.extras.reduce((acc, e) => acc + e.price, 0);
    }
    return selectedPrice;
}

export default function AppProvider({children}: Readonly<{ children: React.ReactNode }>) {
    const [cartProducts, setCartProducts] = useState<CartItem[]>([]);
    const ls = typeof window !== 'undefined' ? window.localStorage : null;

    useEffect(() => {
        if (ls && ls.getItem('cart')) {
            setCartProducts(JSON.parse(ls.getItem('cart')!));
        }
    }, []);

    function saveCartProductsToLocalStorage(cartProducts: CartItem[]) {
        if (ls) {
            ls.setItem('cart', JSON.stringify(cartProducts));
        }
    }

    function addToCart(product: MenuItemWithPrices, size: ExtraPrice | null = null, extras: ExtraPrice[] = []) {
        setCartProducts(prevState => {
            const newProducts = [...prevState, {...product, size, extras}];
            saveCartProductsToLocalStorage(newProducts);
            return newProducts;
        });
    }

    function clearCart() {
        setCartProducts([]);
        saveCartProductsToLocalStorage([]);
    }

    function removeCartProducts(index: number) {
        setCartProducts(prevState => {
            const newProducts = prevState.filter((_, i) => i !== index);
            saveCartProductsToLocalStorage(newProducts);
            return newProducts;
        });
        toast.success('Product removed');
    }

    return (
        <SessionProvider>
            <CartContext.Provider value={{cartProducts, setCartProducts, addToCart, removeCartProducts, clearCart}}>
                {children}
            </CartContext.Provider>

        </SessionProvider>
    );
}
