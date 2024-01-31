import EditableImage from '@/components/layout/EditableImage';
import {FormEvent, useState} from 'react';
import {MenuItem} from '@/app/menu-items/edit/[id]/page';
import MenuItemPriceProps, {ExtraPrice} from '@/components/layout/MenuItemPriceProps';

export interface MenuItemWithPrices extends Partial<MenuItem> {
    sizes: ExtraPrice[];
    extraIngredientPrices: ExtraPrice[];
}
interface MenuItemFormProps {
    onSubmit: (event: FormEvent<HTMLFormElement>, data: MenuItemWithPrices) => Promise<void>;
    menuItem?: MenuItem;
}

export default function MenuItemForm({onSubmit, menuItem}: MenuItemFormProps) {
    const [image, setImage] = useState(menuItem?.image || '');
    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice.toString() || '');
    const [sizes, setSizes] = useState<ExtraPrice[]>(menuItem?.sizes || []);
    const [extraIngredientPrices, setExtraIngredientPrices] = useState<ExtraPrice[]>(menuItem?.extraIngredientPrices || []);

    return (
        <form
            onSubmit={e => onSubmit(e, {image, name, description, basePrice: +basePrice, sizes, extraIngredientPrices})}
            className={'mt-8 max-w-md mx-auto'}>
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
                    <MenuItemPriceProps props={sizes} setProps={setSizes} name={'Sizes'} addLabel={'Add item size'}/>
                    <MenuItemPriceProps props={extraIngredientPrices} setProps={setExtraIngredientPrices}
                                        name={'Extra ingredients'} addLabel={'Add ingredients prices'}/>
                    <button type={'submit'}>Save</button>
                </div>

            </div>
        </form>
    );
}
