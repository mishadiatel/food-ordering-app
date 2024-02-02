import {MenuItemWithPrices} from '@/components/layout/MenuItemForm';

export default function MenuItemTile({onAddToCart, item}: { onAddToCart: () => void, item: MenuItemWithPrices }) {
    const {
        image,
        name,
        description,
        basePrice,
        sizes,
        extraIngredientPrices
    } = item;
    return (
        <div
            className={'bg-gray-200 rounded-lg p-4 text-center hover:bg-white transition-all hover:shadow-md hover:shadow-black/25'}>
            <div className={'text-center '}>
                <img src={image} alt="pizza" className={'max-h-24 block mx-auto'}/>
            </div>

            <h4 className={'font-semibold my-3 text-xl'}>{name}</h4>
            <p className={'text-gray-500 text-sm line-clamp-3'}>
                {description}
            </p>
            <button className={'bg-primary text-white rounded-full px-8 py-2 mt-4'}
                    onClick={onAddToCart}
            >
                {(sizes && sizes.length > 0) || (extraIngredientPrices && extraIngredientPrices.length > 0) ?
                    (<span>Add to cart (From ${basePrice})</span>) :
                    (<span>Add to cart ${basePrice}</span>)
                }

            </button>
        </div>
    );
}
