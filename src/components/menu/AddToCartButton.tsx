interface AddToCartButtonProps {
    onAddToCart: () => void;
    hasSizesOrExtras: boolean | undefined;
    basePrice: number | undefined;
}

export default function AddToCartButton({onAddToCart, hasSizesOrExtras, basePrice}: AddToCartButtonProps) {

    return (
        <button className={'bg-primary text-white rounded-full px-8 py-2 mt-4'}
                onClick={onAddToCart}
        >
            {hasSizesOrExtras ?
                (<span>Add to cart (From ${basePrice})</span>) :
                (<span>Add to cart ${basePrice}</span>)
            }

        </button>
    );
}
