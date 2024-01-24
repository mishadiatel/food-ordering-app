import Header from '@/components/layout/Header';
import Hero from '@/components/layout/Hero';
import HomeMenu from '@/components/layout/HomeMenu';
import SectionHeaders from '@/components/layout/SectionHeaders';

export default function Home() {
    return (
        <>
            <Hero/>
            <HomeMenu/>
            <section className={'text-center my-16'}>
                <SectionHeaders subHeader={'aour story'} mainHeader={'About Us'}/>
                <div className={'text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4'}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum est iure molestiae unde! Ab
                        deleniti
                        dolore, earum enim hic, iure iusto nam nisi optio perferendis quasi quidem sint, vero
                        voluptates?
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum est iure molestiae unde! Ab
                        deleniti
                        dolore, earum enim hic, iure iusto nam nisi optio perferendis quasi quidem sint, vero
                        voluptates?
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum est iure molestiae unde! Ab
                        deleniti
                        dolore, earum enim hic, iure iusto nam nisi optio perferendis quasi quidem sint, vero
                        voluptates?
                    </p>

                </div>
            </section>
            <section className={'text-center my-8'}>
                <SectionHeaders subHeader={'Don\'t hesitate'} mainHeader={'Contact Us'}/>
                <div className={'mt-8'}>
                    <a href={'tel:+46638123123'} className={'text-4xl underline text-gray-500'}>
                        +46 638 123 123
                    </a>
                </div>

            </section>
        </>
    );
}
