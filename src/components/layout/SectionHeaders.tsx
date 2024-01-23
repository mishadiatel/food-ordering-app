interface SectionHeadersProps {
    subHeader: string;
    mainHeader: string;
}

export default function SectionHeaders({subHeader, mainHeader}: SectionHeadersProps) {
    return (
        <>
            <h3 className={'uppercase text-gray-500 leading-4'}>
                {subHeader}
            </h3>
            <h2 className={'text-primary font-bold text-4xl italic'}>
                {mainHeader}
            </h2>
        </>
    );
}
