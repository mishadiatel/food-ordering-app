import Trash from '@/components/icons/Trash';
import Plus from '@/components/icons/Plus';
import {ChangeEvent, Dispatch, SetStateAction, useState} from 'react';
import ChevronDown from '@/components/icons/ChevronDown';
import ChevronUp from '@/components/icons/ChevronUp';

export interface ExtraPrice {
    name: string;
    price: number;
}

interface IMenuItemPriceProps {
    props: ExtraPrice[];
    setProps: Dispatch<SetStateAction<ExtraPrice[]>>;
    name: string;
    addLabel: string;
}

export default function MenuItemPriceProps({props, setProps, name, addLabel}: IMenuItemPriceProps) {
    const [isOpen, setIsOpen] = useState(false);

    function addProp() {
        setProps(prevState => [...prevState, {name: '', price: 0}]);
    }

    function editProp(event: ChangeEvent<HTMLInputElement>, index: number, prop: 'name' | 'price') {
        const newValue = event.target.value;
        setProps(prevSizes => {
            const newSizes = [...prevSizes];
            // @ts-ignore
            newSizes[index][prop] = newValue;
            return newSizes;
        });
    }

    function removeProp(index: number) {
        setProps(prevState => prevState.filter((v, i) => i !== index));
    }

    return (
        <div className={'bg-gray-200 p-2 rounded-md mb-2'}>

            <button className={'inline-flex p-1 border-0 justify-start'} type={'button'}
                    onClick={() => setIsOpen(prevState => !prevState)}>
                {isOpen ? <ChevronUp/> : <ChevronDown/>}
                <span>{name}</span>
                <span>({props.length})</span>
            </button>

            <div className={isOpen ? 'block' : 'hidden'}>
                {props.length > 0 && props.map((size, index) => (
                    <div key={index} className={'flex gap-2 items-end'}>
                        <div>
                            <label>Name</label>
                            <input type="text" placeholder={'Size name'}
                                   value={size.name} onChange={e => editProp(e, index, 'name')}/>
                        </div>
                        <div>
                            <label>Extra price</label>
                            <input type="text" placeholder={'Extra price'}
                                   value={size.price} onChange={e => editProp(e, index, 'price')}/>
                        </div>
                        <div>
                            <button type={'button'}
                                    onClick={removeProp.bind(null, index)}
                                    className={'bg-white mb-2 px-2'}>
                                <Trash/>
                            </button>
                        </div>

                    </div>
                ))}
                <button className={'bg-white items-center'} type={'button'}
                        onClick={addProp}>
                    <Plus className={'w-4 h-4'}/>
                    <span>{addLabel}</span>

                </button>
            </div>

        </div>
    );
}
