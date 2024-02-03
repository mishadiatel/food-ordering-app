import {MenuItemWithPrices} from '@/components/layout/MenuItemForm';
import AddToCartButton from '@/components/menu/AddToCartButton';

export default function MenuItemTile({onAddToCart, item}: { onAddToCart: () => void, item: MenuItemWithPrices }) {
    const {
        image,
        name,
        description,
        basePrice,
        sizes,
        extraIngredientPrices
    } = item;

    const hasSizesOrExtras = (sizes && sizes.length > 0) || (extraIngredientPrices && extraIngredientPrices.length > 0);

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
            <AddToCartButton onAddToCart={onAddToCart} hasSizesOrExtras={hasSizesOrExtras} basePrice={basePrice}/>
        </div>
    );
}
