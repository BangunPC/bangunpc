import { component$ } from "@builder.io/qwik";
import Image from "~/content/images/hero-image.webp?jsx";
import styles from "./hero.module.css";


export default component$(() => {
    return (
        <div id="hero" class={["bg-[#ECEEF5]", styles['hero-section']]}>
            <div class={styles['hero-section-left']}>

                <div class={styles['hero-section-left-top']}>

                    <div class={styles['hero-buatpcsesuai']}>
                        <span>
                            Buat PC sesuai dengan kebutuhan dan gayamu.
                        </span>
                    </div>

                    <div class={styles['hero-section-left-top-bottom']}>
                        <span class={styles['hero-section-left-top-bottom-rakitpc']}>

                            Rakit PC Impianmu
                            <br />
                            dengan<span class='text-[#4C5986]'> MUDAH </span>dan
                            <br />
                            <span class='text-[#4C5986]'>MURAH </span>

                        </span>
                        <span class={styles['hero-section-left-top-bottom-rekomendasi']}>
                            Rekomendasi komponen yang berkualitas tinggi dengan harga terjangkau.
                        </span>
                    </div>
                </div>
                <div class={styles['hero-section-left-buttons']}>

                    <btn class={styles['filled-button']}>
                        <span>

                            Rakit Sekarang
                        </span>
                    </btn>
                    <btn class={styles['outlined-button']}>
                        <span>

                            Cari Komponen PC
                        </span>
                    </btn>
                </div>
            </div>
            <Image class={styles["hero-section-right"]} alt="hero image which contains components" />
        </div>
    )
})