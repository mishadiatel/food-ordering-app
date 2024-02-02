import EditableImage from '@/components/layout/EditableImage';
import {FormEvent, useEffect, useState} from 'react';
import {MenuItem} from '@/app/menu-items/edit/[id]/page';
import MenuItemPriceProps, {ExtraPrice} from '@/components/layout/MenuItemPriceProps';
import {Category} from '@/app/categories/page';

export interface MenuItemWithPrices extends Partial<MenuItem> {
    sizes?: ExtraPrice[];
    extraIngredientPrices?: ExtraPrice[];
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
    const [category, setCategory] = useState(menuItem?.category || '');
    const [extraIngredientPrices, setExtraIngredientPrices] = useState<ExtraPrice[]>(menuItem?.extraIngredientPrices || []);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetch('/api/categories').then(response => {
            response.json().then((categories: Category[]) => {
                setCategories(categories);
                if(categories.length > 0 && !category) setCategory(categories[0]._id);
            });
        });
    }, []);

    return (
        <form
            onSubmit={e => onSubmit(e, {image, name, description, basePrice: +basePrice, sizes, extraIngredientPrices, category})}
            className={'mt-8 max-w-2xl mx-auto'}>
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
                    <label>Category</label>
                    <select value={category} onChange={e => setCategory(e.target.value)}>
                        {categories.length > 0 && categories.map(category => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            )
                        )}
                    </select>
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
