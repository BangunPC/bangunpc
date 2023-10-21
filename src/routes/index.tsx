import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Image from "~/content/images/hero-image.webp?jsx";

export default component$(() => {
  return (
    <>
      <div class="bg-[#ECEEF5] hero-section">
        <div class='hero-section-left'>

          <div class='hero-section-left-top'>

            <div class='hero-buatpcsesuai'>
              <span>
                Buat PC sesuai dengan kebutuhan dan gayamu.
              </span>
            </div>

            <div class='hero-section-left-top-bottom'>
              <span class='hero-section-left-top-bottom-rakitpc'>

                Rakit PC Impianmu
                <br />
                dengan<span class='text-[#4C5986]'> MUDAH </span>dan
                <br />
                <span class='text-[#4C5986]'>MURAH </span>

              </span>
              <span class='hero-section-left-top-bottom-rekomendasi'>
                Rekomendasi komponen yang berkualitas tinggi dengan harga terjangkau.
              </span>
            </div>
          </div>
          <div class='hero-section-left-buttons'>

            <btn class='filled-button'>
              <span>

                Rakit Sekarang
              </span>
            </btn>
            <btn class='outlined-button'>
              <span>

                Cari Komponen PC
              </span>
            </btn>
          </div>
        </div>
        <Image class="hero-section-right" />
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Complete PC/Components - BangunPC",
  meta: [
    {
      name: "description",
      content:
        "Tired of searching for components? Worry not! We're here with a complete list of PC build and components from various marketplace.",
    },
  ],
};
