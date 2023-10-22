import { component$ } from "@builder.io/qwik";
import styles from "./jasa.module.css";
import { TbBook, TbDeviceDesktopCog, TbDevicesPc, TbTool } from "@qwikest/icons/tablericons";
import JasaCard from "./jasa-card/jasa-card";

export default component$(() => {
    const jasa = [
        {
            icon: <TbDevicesPc q:slot="icon" style={{ width: '24px', height: '24px' }} />,
            title: 'Simulasi Rakit PC',
            description: 'Deskripsi simulasi rakit PC lorem ipsum dolor sip amet Deskripsi simulasi rakit PC lorem ipsum dolor sip amet Deskripsi simulasi rakit PC lorem ipsum dolor sip amet'
        },
        {
            icon: <TbBook q:slot="icon" style={{ width: '24px', height: '24px' }} />,
            title: 'Katalog Komponen PC',
            description: 'Deskripsi simulasi rakit PC lorem ipsum dolor sip amet Deskripsi simulasi rakit PC lorem ipsum dolor sip amet Deskripsi simulasi rakit PC lorem ipsum dolor sip amet'
        },
        {
            icon: <TbTool q:slot="icon" style={{ width: '24px', height: '24px' }} />,
            title: 'Jasa Rakit PC',
            description: 'Deskripsi simulasi rakit PC lorem ipsum dolor sip amet Deskripsi simulasi rakit PC lorem ipsum dolor sip amet Deskripsi simulasi rakit PC lorem ipsum dolor sip amet'
        },
        {
            icon: <TbDeviceDesktopCog q:slot="icon" style={{ width: '24px', height: '24px' }} />,
            title: 'Jasa Servis PC',
            description: 'Deskripsi simulasi rakit PC lorem ipsum dolor sip amet Deskripsi simulasi rakit PC lorem ipsum dolor sip amet Deskripsi simulasi rakit PC lorem ipsum dolor sip amet'
        },
    ]
    return (
        <div id="jasa" class={styles['jasa-section']}>
            <header class={styles['jasa-header']}>
                <span class={styles['jasa-title']}>
                    Pilih jasa yang kami sediakan untuk anda.
                </span>
                <span class={styles['jasa-subtitle']}>
                    Kami menyediakan beragam layanan yang dapat Anda pilih sesuai dengan kebutuhan Anda.
                </span>

            </header>
            <main class={styles['jasa-main']}>
                {jasa.map((item, index) => (
                    <JasaCard key={item.title} title={item.title} iconNumber={index + 1} description={item.description}>
                        {item.icon}
                    </JasaCard>
                ))}
            </main>
        </div>
    );
})