import { component$ } from "@builder.io/qwik";
import styles from "./banding.module.css";

export default component$(() => {
    return (
        <>
            <div class={styles['banding-section']}>
                <div class={styles['banding-left-wrapper']}>
                    <div class={styles['banding-left']}>
                        <header class={styles['banding-header']}>

                            Bandingkan harga dari toko lain
                        </header>
                        <main class={styles['banding-main']}>
                            Temukan penawaran terbaik dengan mudah! Kami adalah tempat terbaik untuk membandingkan harga dari berbagai toko online terkemuka. Dapatkan informasi harga yang akurat dan hemat waktu serta uang saat berbelanja online dengan bantuan kami.
                        </main>
                    </div></div>
                <div class={styles['banding-image-wrapper']}>
                    <div class={styles['banding-image']}>

                    </div>
                </div>
            </div>
        </>
    )
})