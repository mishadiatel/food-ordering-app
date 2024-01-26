import {PropsWithChildren} from 'react';

export default function InfoBox({children}: PropsWithChildren<{}>) {
    return (
        <div className={'text-center bg-blue-100 p-4 rounded-lg border border-blue-300'}>
            {children}
        </div>
    )
}
