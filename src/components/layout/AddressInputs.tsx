interface AddressInputsProps {
    addressProps: {
        phone: string;
        streetAddress: string;
        postalCode: string;
        city: string;
        country: string;
    };
    setAddressProp: (propName: string, value: string) => void;
}

export default function AddressInputs({addressProps, setAddressProp}: AddressInputsProps) {
    const {
        phone,
        streetAddress,
        postalCode,
        city,
        country
    } = addressProps;

    return (
        <>
            <label>Phone number</label>
            <input type="tel" placeholder={'Phone number'}
                   value={phone} onChange={e => setAddressProp('phone', e.target.value)}/>
            <label>
                Street address
            </label>
            <input type="text" placeholder={'Street address'}
                   value={streetAddress} onChange={e => setAddressProp('streetAddress', e.target.value)}/>
            <div className={'grid grid-cols-2 gap-2'}>
                <div>
                    <label>
                        Postal code
                    </label>
                    <input type="text" placeholder={'Postal code'} value={postalCode}
                           onChange={e => setAddressProp('postalCode', e.target.value)}/>
                </div>
                <div>
                    <label>City</label>
                    <input type="text" placeholder={'City'} value={city}
                           onChange={e => setAddressProp('city', e.target.value)}/>
                </div>

            </div>
            <label>Country</label>
            <input type="text" placeholder={'Country'} value={country}
                   onChange={e => setAddressProp('country', e.target.value)}/>
        </>
    );
}
