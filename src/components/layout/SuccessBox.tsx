import {PropsWithChildren} from 'react';

export default function SuccessBox({ children }: PropsWithChildren<{}>) {
    return (
        <h2 className={'text-center bg-green-100 p-4 rounded-lg border border-green-300'}>
            {children}
        </h2>
    )
}
