import { component$ } from "@builder.io/qwik";
import styles from "./jasa.module.css";
import { TbBook, TbDeviceDesktopCog, TbDevicesPc, TbTool } from "@qwikest/icons/tablericons";
import JasaCard from "./jasa-card/jasa-card";

export default component$(() => {
    const jasa = [
        {
            icon: <TbDevicesPc q:slot="icon" style={{ width: '24px', height: '24px' }} />,
            title: 'Simulasi Rakit PC',
            description: 'Cukup pilih komponen PC yang anda inginkan di setiap kategori komponennya dan secara otomatis kompatibilitas antar komponennya sudah sesuai'
        },
        {
            icon: <TbBook q:slot="icon" style={{ width: '24px', height: '24px' }} />,
            title: 'Katalog Komponen PC',
            description: 'Temukan komponen PC yang anda inginkan yang sudah terkategorisasi dan terafiliasi dengan marketplace yang ada di Indonesia',
            labelFor: "toggleKatalogModal",
        },
        {
            icon: <TbTool q:slot="icon" style={{ width: '24px', height: '24px' }} />,
            title: 'Jasa Rakit PC',
            description: 'Tak punya waktu atau bingung cara merakit PC sendiri? Tenang, kami dapat merakitkan PC impian Anda sampai siap pakai'
        },
        {
            icon: <TbDeviceDesktopCog q:slot="icon" style={{ width: '24px', height: '24px' }} />,
            title: 'Jasa Servis PC & Laptop',
            description: 'Ada komponen PC atau laptop yang bermasalah? Kami siap membantu Anda memperbaikinya dengan teknisi yang telah berpengalaman',
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
                    <JasaCard
                        key={item.title}
                        title={item.title}
                        iconNumber={index + 1}
                        description={item.description}
                        labelFor={item.labelFor}
                    >
                        {item.icon}
                    </JasaCard>
                ))}
            </main>
        </div>
    );
})