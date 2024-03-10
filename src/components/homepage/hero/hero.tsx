import { component$ } from "@builder.io/qwik";
import Image from "~/content/images/hero-image.webp?jsx";
import styles from "./hero.module.css";
import { filledButtonClass } from "~/components/common/filled-button";
import Computer from "~/components/starter/icons/computer";
import { Link } from "@builder.io/qwik-city";


export default component$(() => {
    return (
        <div id="hero" class={["bg-[#ECEEF5]", styles['hero-section']]}>
            <div class={styles['hero-section-left']}>

                <div class={styles['hero-section-left-top']}>

                    <div class={styles['hero-buatpcsesuai']}>
                        <span>
                            Bangun PC sesuai kebutuhan dan gayamu.
                        </span>
                    </div>

                    <div class={styles['hero-section-left-top-bottom']}>
                        <h1 class={styles['hero-section-left-top-bottom-rakitpc']}>

                            Rakit PC Impianmu
                            <br />
                            dengan<span class='text-primary'> MUDAH </span>dan
                            <br />
                            <span class='text-primary'>MURAH </span>

                        </h1>
                        <span class={styles['hero-section-left-top-bottom-rekomendasi']}>
                            Rekomendasi komponen PC yang berkualitas tinggi dengan harga terbaik.
                        </span>
                    </div>
                </div>
                <div class={styles['hero-section-left-buttons']}>
                    <Link href="/simulasi" class={[filledButtonClass, "w-[180px] h-[54px] flex py-[8px] px-[18px] rounded-xl items-center justify-center"]}
                    >
                        <span class="text-white font-semibold text-[15px]">
                            <Computer class='inline w-5 h-5 fill-transparent -translate-y-[3px]' />{' Rakit Sekarang '}
                        </span>
                    </Link>
                </div>
            </div>
            <Image class={styles["hero-section-right"]} alt="hero image which contains components" />
        </div>
    )
})