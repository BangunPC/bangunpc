import { component$ } from "@builder.io/qwik";
import styles from "./komponen.module.css";
import { TbCheckbox } from "@qwikest/icons/tablericons";
import Image from "~/content/images/homepage-komponen.webp?jsx";

export default component$(() => {
    return (
        <div id="komponen" class={styles['komponen-section']}>
            <div class={styles['komponen-image']}>
                <Image alt="easy search, components, and suggestions" />
            </div>
            <div class={styles['komponen-content-wrapper']}>

                <div class={styles['komponen-content']}>
                    <header class={styles['komponen-header']}>
                        Bersama kami, wujudkan PC idaman Anda dengan mudah dan profesional!
                    </header>
                    <main class={styles['komponen-main']}>
                        Kami hadir untuk membuat pengalaman merakit PC menjadi mudah, tanpa ribet, dan profesional. Kami siap membantu Anda menemukan solusi sesuai dengan kebutuhan dan anggaran Anda, serta memberikan panduan dan dukungan yang dibutuhkan. Bersama kami, wujudkan PC impian Anda!
                    </main>
                    <div class={styles['komponen-checkbox']}>
                        <TbCheckbox />
                        <span>

                            Simplenya Merakit PC
                        </span>
                    </div>
                    <div class={styles['komponen-checkbox']}>
                        <TbCheckbox />
                        <span>

                            Realisasi Impian Anda
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
})