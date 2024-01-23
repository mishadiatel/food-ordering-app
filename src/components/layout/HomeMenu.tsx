import Image from 'next/image';
import MenuItem from '@/components/menu/MenuItem';
import SectionHeaders from '@/components/layout/SectionHeaders';

export default function HomeMenu() {
    return (
        <section className={''}>
            <div className={'absolute left-0 right-0 w-full justify-start '}>
                <div className={'absolute left-0 -top-[70px] -z-10'}>
                    <Image src={'/sallad1.png'} alt={'salad1'} width={109} height={195}/>
                </div>
                <div className={'absolute right-0 -top-24 -z-10'}>
                    <Image src={'/sallad2.png'} alt={'salad2'} width={107} height={195}/>
                </div>


            </div>
            <div className={'text-center mb-6'}>
                <SectionHeaders subHeader={'check out'} mainHeader={'Menu'} />
            </div>
            <div className={'grid grid-cols-3 gap-4'}>
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
            </div>
        </section>
    );
}
