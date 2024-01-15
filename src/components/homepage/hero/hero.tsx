import { component$ } from "@builder.io/qwik";
import Image from "~/content/images/hero-image.webp?jsx";
import styles from "./hero.module.css";
import FilledButton from "~/components/common/filled-button";
import OutlinedButton from "~/components/common/outlined-button";


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
                    <FilledButton class="w-[180px] h-[54px] flex py-[8px] px-[18px] rounded-xl items-center justify-center"
                        onClick$={() => alert('Coming Soon!')}
                    >
                        <span class="text-white font-semibold text-[15px]">
                            Rakit Sekarang
                        </span>
                    </FilledButton>
                    <OutlinedButton class="w-[180px] h-[54px] flex py-[8px] px-[18px] rounded-xl items-center justify-center border-[3px]"
                        onClick$={() => alert('Coming Soon!')}
                    >
                        <span class="font-semibold text-[15px]">
                            Cari Komponen PC
                        </span>
                    </OutlinedButton>
                </div>
            </div>
            <Image class={styles["hero-section-right"]} alt="hero image which contains components" />
        </div>
    )
})