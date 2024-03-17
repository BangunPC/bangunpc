import { component$, useSignal } from "@builder.io/qwik";
import { FaChevronDownSolid } from "@qwikest/icons/font-awesome";
import { TbStar, TbStarFilled } from "@qwikest/icons/tablericons";
import FilledButton from "~/components/common/filled-button";
import OutlinedButton from "~/components/common/outlined-button";
import LocationMarker from "~/components/starter/icons/location-marker";
import Shop from "~/components/starter/icons/shop";
import HeroImage from '~/content/images/jasa-hero.svg?jsx'

export default component$(() => {
    const index = useSignal(-1);
    return (
        <>
            <div class='flex flex-col w-full py-16 px-8 gap-12'>
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
                </div >
                {/* pilih jasa servis */}
                <div class='flex flex-col gap-3 mx-auto w-fit text-center' >
                    <span class='text-4xl font-bold'>
                        Pilih Jasa Servis
                    </span>
                    <span class='text-2xl text-[#74738A]'>
                        Pilih jasa layanan yang kamu inginkan
                    </span>
                </div>

                <div class='bg-white flex flex-col rounded-2xl shadow-bm w-[210px] h-[380px] overflow-clip'>
                    <div class='h-1/2 bg-primary'>
                    </div>
                    <div class='flex flex-col gap-4 p-4'>
                        <span class='font-semibold'>
                            Service Keyboard Acer Swift 3 SF314
                        </span>
                        <div class='flex flex-col gap-2'>
                            <span class='font-bold'>
                                Rp 15.200.000
                            </span>
                            <span class='flex text-[#74738A] items-center'>
                                <Shop width="20" height="20" class="fill-primary stroke-white mr-1" />Pahlawan Gadget
                            </span>
                            <span class='flex text-[#74738A] items-center'>
                                <LocationMarker width="20" height="20" class="fill-primary stroke-white mr-1" />Kota Bandung
                            </span>
                            <div class='flex flex-row'>
                                <TbStarFilled color="#F9C06B" />
                                <TbStarFilled color="#F9C06B" />
                                <TbStarFilled color="#F9C06B" />
                                <TbStarFilled color="#F9C06B" />
                                <TbStar />
                                (20)
                            </div>
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
                        <div class='flex flex-col'>
                            <span class='flex text-[#74738A] items-center text-lg'>
                                <LocationMarker width="28" height="28" class="fill-primary stroke-white mr-1" />
                                Kota Bandung
                            </span>
                            <span class='text-xl font-semibold'>
                                Servis Laptop.ID
                            </span>
                        </div>
                    </div>
                </div>

                <OutlinedButton class='w-44 h-14 mx-auto'>
                    Lihat Semua
                </OutlinedButton>

            </div>

            <div class='bg-[#4C5986] text-white flex'>
                <div class='m-auto flex justify-between py-24 max-w-6xl w-full'>
                    <div class='flex flex-1 flex-col gap-12'>
                        <div class='flex flex-col'>
                            <span class='font-bold text-lg'>
                                Ada Pertanyaan?
                            </span>
                            <span class='font-bold text-5xl'>
                                Boleh tanya-tanya dulu
                            </span>
                        </div>
                        <OutlinedButton class='text-white border-white w-44 h-14'>
                            Tanya Kami
                        </OutlinedButton>
                    </div>
                    <div class='flex flex-1 flex-col leading-6 justify-center'>
                        <span
                            class='flex font-semibold text-xl py-4 rounded-md hover:bg-white/20 cursor-default items-center px-2'
                            onClick$={() => {
                                index.value == 0 ? index.value = -1 : index.value = 0
                            }}
                        >
                            Bagaimana prosedurnya?
                            <FaChevronDownSolid class={['inline-block ml-auto transition-transform ', index.value == 0 ? 'rotate-180' : 'rotate-0']} />
                        </span>
                        {index.value == 0 && 'Biaya jasa rakit PC bervariasi tergantung pada spesifikasi yang Anda pilih. Hubungi kami untuk penawaran yang tepat.'}
                        <span
                            class='flex font-semibold text-xl py-4 rounded-md hover:bg-white/20 cursor-default items-center px-2'
                            onClick$={() => {
                                index.value == 1 ? index.value = -1 : index.value = 1
                            }}
                        >
                            Apakah ada garansi?
                            <FaChevronDownSolid class={['inline-block ml-auto transition-transform ', index.value == 1 ? 'rotate-180' : 'rotate-0']} />
                        </span>
                        {index.value == 1 && 'Garansi bervariasi tergantung pada spesifikasi yang Anda pilih. Hubungi kami untuk penawaran yang tepat.'}
                        <span
                            class='flex font-semibold text-xl py-4 rounded-md hover:bg-white/20 cursor-default items-center px-2'
                            onClick$={() => {
                                index.value == 2 ? index.value = -1 : index.value = 2
                            }}
                        >
                            Proses pengerjaannya berapa lama?

                            <FaChevronDownSolid class={['inline-block ml-auto transition-transform ', index.value == 2 ? 'rotate-180' : 'rotate-0']} />
                        </span>
                        {index.value == 2 && 'Proses pengerjaan rakit PC bervariasi tergantung pada spesifikasi yang Anda pilih. Hubungi kami untuk penawaran yang tepat.'}
                    </div>
                </div>
            </div>
        </>
    )
})