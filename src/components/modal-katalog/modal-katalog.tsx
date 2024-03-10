import { component$ } from '@builder.io/qwik';
import style from './modal-katalog.module.css';
import { TbX } from '@qwikest/icons/tablericons';
import KCpuCooler from '~/content/images/katalog_cpu_coolers.svg?jsx';
import KMemory from '~/content/images/katalog_memory.svg?jsx';
import KCooler from '~/content/images/katalog_cooler.svg?jsx';
import KCpu from '~/content/images/katalog_cpu.svg?jsx';
import KGpu from '~/content/images/katalog_gpu.svg?jsx';
import KMotherboard from '~/content/images/katalog_motherboard.svg?jsx';
import KPsu from '~/content/images/katalog_psu.svg?jsx';
import KStorage from '~/content/images/katalog_storage.svg?jsx';
import KCasing from '~/content/images/katalog_casing.svg?jsx';
import { Link } from '@builder.io/qwik-city';
import { filledButtonClass } from '../common/filled-button';
import { kToggleKatalogModal } from '~/lib/constant';


export default component$(() => {

    // const other = [
    //     {
    //         title: 'Peripherals',
    //         items: [
    //             {
    //                 name: 'Headphones',
    //                 href: '/katalog/headphone',
    //             },
    //             {
    //                 name: 'Keyboards',
    //                 href: '/katalog/keyboard',
    //             },
    //             {
    //                 name: 'Mouse',
    //                 href: '/katalog/mouse',
    //             },
    //             {
    //                 name: 'Speakers',
    //                 href: '/katalog/speaker',
    //             },
    //             {
    //                 name: 'Webcams',
    //                 href: '/katalog/webcam',
    //             }
    //             // {
    //             //     name: 'Printers',
    //             //     href: '/katalog/printer',
    //             // },
    //         ]
    //     },
    //     {
    //         title: 'Displays',
    //         items: [
    //             {
    //                 name: 'Monitors',
    //                 href: '/katalog/monitor',
    //             }
    //         ]
    //     },
    //     {
    //         title: 'Software',
    //         items: [
    //             {
    //                 name: 'Operating Systems',
    //                 href: '/katalog/os',
    //             }
    //         ]
    //     },
    //     {
    //         title: 'Expansion',
    //         items: [
    //             {
    //                 name: 'Sound Cards',
    //                 href: '/katalog/soundcard',
    //             },
    //             {
    //                 name: 'Wired Networking',
    //                 href: '/katalog/wirednetwork',
    //             },
    //             {
    //                 name: 'Wireless Networking',
    //                 href: '/katalog/wirelessnetwork',
    //             },
    //         ]
    //     },
    //     {
    //         title: 'Accessories / Other',
    //         items: [
    //             {
    //                 name: 'Case Fans',
    //                 href: '/katalog/casefan',
    //             },
    //             {
    //                 name: 'External Hard Drives',
    //                 href: '/katalog/externaldrive',
    //             }
    //         ]
    //     },
    // ]

    const katalog = [
        {
            name: 'Motherboard',
            href: '/katalog/motherboard',
            image: <KMotherboard style={{ width: '100px', height: '80px' }} />,
            disabled: false,
        },
        {
            name: 'CPU',
            href: '/katalog/cpu',
            image: <KCpu style={{ width: '100px', height: '80px' }} />,
            disabled: false,
        },
        {
            name: 'GPU',
            href: '/katalog/gpu',
            image: <KGpu style={{ width: '100px', height: '80px' }} />,
            disabled: false,
        },
        {
            name: 'Memory',
            href: '/katalog/memory',
            image: <KMemory style={{ width: '100px', height: '80px' }} />,
            disabled: false,
        },
        {
            name: 'CPU Cooler',
            href: '/katalog/cooler',
            image: <KCpuCooler style={{ width: '100px', height: '80px' }} />,
            disabled: true,
        },
        {
            name: 'Power Supply',
            href: '/katalog/psu',
            image: <KPsu style={{ width: '100px', height: '80px' }} />,
            disabled: false,
        },
        {
            name: 'Storage',
            href: '/katalog/storage',
            image: <KStorage style={{ width: '100px', height: '80px' }} />,
            disabled: false,
        },
        {
            name: 'PC Case',
            href: '/katalog/casing',
            image: <KCasing style={{ width: '100px', height: '80px' }} />,
            disabled: false,
        },
        {
            name: 'Case Fan',
            href: '/katalog/case_fan',
            image: <KCooler style={{ width: '100px', height: '80px' }} />,
            disabled: true,
        },
    ]

    return (
        <>
            <input type="checkbox" id={kToggleKatalogModal} class={style.toggleKatalogModal} hidden />
            <div class={style['modal-katalog']}>
                <label for={kToggleKatalogModal} class={style.toggleKatalogModalLabel} />
                <div class={style['modal-katalog-content']}>
                    <header class={style['modal-katalog-header']}>
                        <span class={style['modal-katalog-title']}>
                            Pilih Kategori Komponen
                        </span>
                        <label for={kToggleKatalogModal}>
                            <TbX class={style['modal-katalog-close']} />
                        </label>
                    </header>
                    <input type="checkbox" id="toggleResponsiveCategory" class={style.toggleResponsiveCategory} hidden />
                    {/* <label for="toggleResponsiveCategory" class={style.toggleResponsiveCategoryLabel}>
                        <span class={style.toggleResponsiveChangeToOther}>Kategori Lainnya <TbArrowRight class='inline' /></span>
                        <span class={style.toggleResponsiveChangeToMain}><TbArrowLeft class='inline' /> Kategori Komponen PC  </span>
                    </label> */}
                    <main class={style['modal-katalog-body']}>
                        {/* <div class={style['modal-katalog-category-other']}>
                            {other.map((item) => (
                                <div key={item.title} class={style['category-other-list']}>
                                    <span class={style['category-other-title']}>
                                        {item.title}
                                    </span>
                                    {item.items.map((item) => (
                                        <Link href={item.href} key={item.name} class={style['category-other-item']}>
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            ))}
                        </div> */}
                        <div class={style['modal-katalog-category-main']}>
                            {katalog.map((item) => (
                                <Link
                                    href={item.disabled ? '' : item.href}
                                    key={item.name}
                                    class={[style['modal-katalog-item'], item.disabled ? 'saturate-0 contrast-50 opacity-70 cursor-not-allowed pointer-events-none' : '']}
                                    onClick$={() => {
                                        const toggle = document.getElementById(kToggleKatalogModal) as HTMLInputElement | null;
                                        if (toggle) toggle.checked = false
                                    }}
                                >
                                    {item.image}
                                    <div class='h-2' />
                                    <span>{item.name}</span>
                                </Link>
                            ))}
                        </div>
                    </main>
                    <Link
                        href='/katalog'
                        class={[filledButtonClass, style['lihat-semua-button'], 'text-center']}
                        onClick$={() => {
                            const toggle = document.getElementById(kToggleKatalogModal) as HTMLInputElement | null;
                            if (toggle) toggle.checked = false
                        }}
                    >
                        Lihat Semua
                    </Link>
                </div>
            </div>
        </>
    )
})