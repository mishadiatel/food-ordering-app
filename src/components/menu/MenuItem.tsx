import {MenuItemWithPrices} from '@/components/layout/MenuItemForm';
import {ChangeEvent, useContext, useState} from 'react';
import {CartContext} from '@/components/AppContext';
import toast from 'react-hot-toast';
import MenuItemTile from '@/components/menu/MenuItemTile';
import Image from 'next/image';
import {ExtraPrice} from '@/components/layout/MenuItemPriceProps';

export default function MenuItem({item}: { item: MenuItemWithPrices }) {
    const {
        image,
        name,
        description,
        basePrice,
        sizes,
        extraIngredientPrices
    } = item;
    const [selectedSize, setSelectedSize] = useState<ExtraPrice | null>(sizes?.[0] || null);
    const [selectedExtras, setSelectedExtras] = useState<ExtraPrice[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const {addToCart} = useContext(CartContext);

    function handleAddToCartButtonClick() {
        const hasOptions = (sizes && sizes?.length > 0) || (extraIngredientPrices && extraIngredientPrices?.length > 0);
        if(hasOptions && !showPopup) {
            setShowPopup(true);
            return ;
        }
        addToCart(item, selectedSize, selectedExtras);
        setShowPopup(false)
        toast.success('Added to cart');
    }

    function handleExtraThingClick(event: ChangeEvent<HTMLInputElement>, extraThing: ExtraPrice) {
        const checked = event.target.checked;
        if (checked) {
            setSelectedExtras(prevState => [...prevState, extraThing]);
        } else {
            setSelectedExtras(prevState => prevState.filter(e => e.name !== extraThing.name));
        }
    }

    let selectedPrice = +basePrice!;
    if (selectedSize) {
        selectedPrice += +selectedSize.price;
    }
    if (selectedExtras.length > 0) {
        selectedPrice += selectedExtras.reduce((acc, e) => acc + e.price, 0);
    }

    return (
        <>
            {showPopup && (
                <div className={'fixed top-0 left-0 w-full h-full bg-black/80 flex items-center justify-center'}
                     onClick={() => setShowPopup(false)}>
                    <div className={'my-8 bg-white p-4 rounded-lg w-full max-w-md max-h-screen overflow-y-auto'}
                         onClick={e => e.stopPropagation()}>
                        <Image src={image || 'https://placehold.co/600x400'} alt={name!} width={200} height={200} className={'mx-auto'}/>
                        <h2 className={'text-lg font-bold text-center mb-2'}>{name}</h2>
                        <p className={'text-center text-gray-500 text-sm mb-2'}>{description}</p>
                        {sizes?.length && sizes?.length > 0 && (
                            <div className={'py-2'}>
                                <h3 className={'text-center text-gray-700'}>Pick your size</h3>
                                {sizes.map((size, index) => (
                                    <label key={index} className={'flex items-center gap-2 p-4 rounded-md mb-1 border'}>
                                        <input type={'radio'} onClick={() => setSelectedSize(size)}
                                               checked={selectedSize?.name === size.name} name={'size'}/> {size.name} -
                                        ${+basePrice! + +size.price}
                                    </label>
                                ))}
                            </div>
                        )}
                        {extraIngredientPrices && extraIngredientPrices.length > 0 && (
                            <div className={'py-2'}>
                                <h3 className={'text-center text-gray-700'}>Any extras?</h3>
                                {extraIngredientPrices.map((extraThing, index) => (
                                    <label key={index} className={'flex items-center gap-2 p-4 rounded-md mb-1 border'}>
                                        <input type={'checkbox'}
                                               name={extraThing.name}
                                               onChange={e => handleExtraThingClick(e, extraThing)}
                                        /> {extraThing.name} +${extraThing.price}
                                    </label>
                                ))}
                            </div>
                        )}
                        <button className={'primary sticky bottom-2'} onClick={handleAddToCartButtonClick}>Add to cart
                            ${selectedPrice}</button>
                        <button onClick={() => setShowPopup(false)}
                                className={'mt-2'}>
                            Cancel
                        </button>
                    </div>

                </div>
            )}
            <MenuItemTile onAddToCart={handleAddToCartButtonClick} item={item}/>
        </>

    );
}
