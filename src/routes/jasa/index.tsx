import { component$ } from "@builder.io/qwik";
import { TbStar, TbStarFilled } from "@qwikest/icons/tablericons";
import FilledButton from "~/components/common/filled-button";
import OutlinedButton from "~/components/common/outlined-button";
import HeroImage from '~/content/images/jasa-hero.svg?jsx'

export default component$(() => {
    return (
        <div class='flex flex-col w-full p-8 gap-12'>
            {/* hero */}
            <div class='flex flex-row m-auto max-w-7xl'>
                <div class='flex flex-1 flex-col gap-4'>
                    <div class='text-xl rounded-full bg-primary w-fit text-white px-4 py-2'>
                        PC atau laptop kamu bermasalah?
                    </div>
                    <span class='text-5xl font-bold leading-[1.2]'>
                        Yuk, Pakai Layanan Jasa Servis Kami
                    </span>
                    <span class='text-xl text-[#74738a]'>
                        Biar perangkat kamu gak bermasalah lagi
                    </span>
                    <div class='flex flex-row gap-4'>
                        <FilledButton class='bg-primary w-44 h-14'>
                            Servis Sekarang
                        </FilledButton>
                        <OutlinedButton class='w-44 h-14'>
                            Cari Mitra Servis
                        </OutlinedButton>
                    </div>
                </div>
                <div class='flex'>
                    <HeroImage />
                </div>
            </div>
            {/* pilih jasa servis */}
            <div class='flex flex-col gap-3 mx-auto w-fit text-center'>
                <span class='text-4xl font-bold'>
                    Pilih Jasa Servis
                </span>
                <span class='text-2xl text-[#74738A]'>
                    Pilih jasa layanan yang kamu inginkan
                </span>
            </div>

            <div class='bg-white flex flex-col rounded-2xl shadow-bm w-[210px] h-[380px]'>
                <div>
                    image
                </div>
                <div class='flex flex-col gap-4'>
                    <span>
                        Service Keyboard Acer Swift 3 SF314
                    </span>
                    <span>
                        Rp 15.200.000
                    </span>
                    <span>
                        Pahlawan Gadget
                    </span>
                    <span>
                        Kota Bandung
                    </span>
                    <div>
                        <TbStar />
                        <TbStarFilled color="#F9C06B" />
                    </div>
                </div>
            </div>

            <OutlinedButton class='w-44 h-14 mx-auto'>
                Lihat Semua
            </OutlinedButton>
            {/* mitra jasa servis */}
            <div class='flex flex-col gap-3 mx-auto w-fit text-center'>
                <span class='text-4xl font-bold'>
                    Mitra Jasa Servis PC
                </span>
                <span class='text-2xl text-[#74738A]'>
                    Pilih mitra yang kamu mau buat gunakan jasa layanan servis pc
                </span>
            </div>

            <div class='bg-white flex flex-col rounded-2xl shadow-br w-[256px] h-[256px]'>
                <div class='flex flex-col m-auto justify-evenly text-center gap-8'>
                    <div>
                        <div class='m-auto rounded-full w-[128px] h-[128px] bg-primary'>
                            
                        </div>
                    </div>
                    <div class='flex flex-col gap-4'>
                        <span>
                            Kota Bandung
                        </span>
                        <span>
                            Servis Laptop.ID
                        </span>
                    </div>
                </div>
            </div>

            <OutlinedButton class='w-44 h-14 mx-auto'>
                Lihat Semua
            </OutlinedButton>

        </div>
    )
})