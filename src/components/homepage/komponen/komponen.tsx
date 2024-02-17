import { component$ } from "@builder.io/qwik";
import styles from "./komponen.module.css";
import Image from "~/content/images/homepage-komponen.webp?jsx";
import TickSquare from "~/components/starter/icons/tick-square";
import { filledButtonClass } from "~/components/common/filled-button";

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
                    <div class={[styles['komponen-checkbox'], 'border-t-primary/50 border-t w-full pt-4']}>
                        <TickSquare class="w-[24px] h-[24px] fill-primary" />
                        <span>
                            Simplenya Merakit PC
                        </span>
                    </div>
                    <span class={styles['komponen-subtitle']}>
                        Kami menyederhanakan proses merakit PC dengan alat simulasi yang mudah digunakan, memungkinkan Anda merancang sistem sesuai keinginan dengan cepat.
                    </span>
                    <label
                        for="toggleKatalogModal"
                        class={[filledButtonClass, "w-[180px] h-[54px] flex py-[8px] px-[18px] rounded-xl items-center justify-center "]}
                    >
                        Lihat Katalog
                    </label>

                </div>
            </div>
        </div>
    )
})