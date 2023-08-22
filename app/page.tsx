import Image from "next/image";
import jumbotronComputer from "/public/Jumbotron_Computer.webp"
import kerehore from "/public/kategori_kerehore.png"
import React from "react";
import Link from "next/link";
import FlashDealsCarousel from "@/components/FlashDealsCarousel";
import { supabase } from "@/lib/supabase";
import ItemCard from "@/components/ItemCard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'BangunPC — Find Parts, Components, Builds, and More',
    description: 'Selamat datang di BangunPC, platform untuk penggemar PC! Kami ada untuk membantu Anda menemukan komponen PC dari platform belanja terpercaya. Manfaatkan fitur-fitur kami seperti simulasi rakit PC manual dan katalog komponen lengkap. Kami juga menyediakan panduan mudah untuk pemula agar Anda bisa merakit PC sendiri. Bergabunglah dengan BangunPC dan wujudkan PC impian Anda sekarang!',
    icons: [
        { rel: "apple-touch-icon", sizes: "180x180", url: "/apple-touch-icon.png" },
        { rel: "icon", sizes: "32x32", url: "/favicon-32x32.png" },
        { rel: "icon", sizes: "16x16", url: "/favicon-16x16.png" },
        { rel: "manifest", url: "/site.webmanifest" },
    ]
}
export default function Home() {

    const categoryImages = [
        "kerehore.png",
        "mending.png",
        "sulthan.png",
    ].map((image) => supabase.storage.from('website-images').getPublicUrl('category/' + image));


    return (
        <>
            <section className="flex w-full h-full py-12 mb-12"
                style={{ backgroundImage: `url('/Jumbotron.webp')`, backgroundSize: 'cover' }}>
                <div className="w-full">
                    <div className="flex flex-wrap justify-center align-middle ">
                        <Image className="flex-1 md:w-2/5 m-auto object-scale-down" src={jumbotronComputer.src}
                            width={320}
                            height={320}
                            alt="computer" />
                        <div className="flex-1 md:w-1/2 w-2/3 m-auto text-center md:text-left text-white flex flex-col items-center md:items-start">
                            <p className="text-5xl font-light leading-snug">
                                Rakit <span className="font-bold">PC</span> impianmu <br />
                                dengan <span className="font-bold text-orange-400">MUDAH</span> <br />
                                dan <span className="font-bold text-orange-400">MURAH</span>
                            </p>
                            <Link href="/simulasi"
                                className="w-fit text-2xl my-4 bg-orange-500 hover:bg-orange-700 active:bg-orange-800 active:scale-90 transition-all flex flex-row py-3 px-8 mx-2 rounded-md text-white">
                                Buat Sekarang
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    className="ml-2" width="32" height="32"
                                    viewBox="0 0 24 24" strokeWidth="1.4" stroke="currentColor" fill="none"
                                    strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path
                                        d="M11.414 10l-7.383 7.418a2.091 2.091 0 0 0 0 2.967a2.11 2.11 0 0 0 2.976 0l7.407 -7.385"></path>
                                    <path
                                        d="M18.121 15.293l2.586 -2.586a1 1 0 0 0 0 -1.414l-7.586 -7.586a1 1 0 0 0 -1.414 0l-2.586 2.586a1 1 0 0 0 0 1.414l7.586 7.586a1 1 0 0 0 1.414 0z"></path>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            {/*TODO(damywise): make the header into component*/}
            {/* Flash deals */}
            <section className="flex flex-col mb-12 w-full">
                <div className="flex px-2 md:px-12">
                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-orange-400 stroke-orange-400 mr-4"
                        width="24"
                        height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="true"
                        strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11"></path>
                    </svg>
                    <span>
                        Flash Deals
                    </span>
                </div>
                {/* Note: items in carousel must be exactly or more than the biggest slidesToShow */}
                <FlashDealsCarousel slidesToShow={5} slidesToScroll={3} className="hidden xl:block" />
                <FlashDealsCarousel slidesToShow={4} slidesToScroll={3} className="hidden lg:block xl:hidden" />
                <FlashDealsCarousel slidesToShow={3} slidesToScroll={2} className="hidden md:block lg:hidden" />
                <FlashDealsCarousel slidesToShow={2} slidesToScroll={2} className="block md:hidden" />
            </section>
            {/* Kategori PC */}
            <section className="flex flex-col mb-12">
                <div className="flex px-12">
                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-orange-400 stroke-orange-400 mr-4"
                        width="24"
                        height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="true"
                        strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11"></path>
                    </svg>
                    <span>
                        Kategori PC
                    </span>
                </div>
                {categoryImages.map((image) => (
                    <>
                        <div className="flex flex-row mt-4 mx-auto">
                            <div className="h-[10rem] md:h-[12rem] lg:h-[17rem] xl:h-[22rem] mr-4 aspect-[355.16/473]">
                                <Image alt="kategori" src={image.data.publicUrl} width={kerehore.width} height={kerehore.height}
                                    className="rounded-lg object-scale-down">
                                </Image>
                            </div>
                            <div className="flex flex-col w-full justify-between">
                                <div className="flex flex-row justify-between">
                                    <span className="text-xl"><span className="hidden md:inline">Paket</span> PC Murah Berkualitas</span>
                                    <Link href="#"
                                        className="bg-orange-500 hover:bg-orange-700 active:bg-orange-800 active:scale-90 transition-all flex flex-row py-1 px-3 mx-2 rounded-md text-white">
                                        Lainnya
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            className="ml-1" width="24" height="24"
                                            viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                                            strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <path d="M5 12l14 0"></path>
                                            <path d="M15 16l4 -4"></path>
                                            <path d="M15 8l4 4"></path>
                                        </svg>
                                    </Link>
                                </div>
                                <div className="flex flex-row mt-4 w-80 sm:w-96 md:w-[30rem] lg:w-[43rem] xl:w-[55rem] py-1 overflow-auto">
                                    <ItemCard name={"Ini PC 1"} stars={2} price={10000000} discountPercent={4} />
                                    <ItemCard name={"INI PC YANG KEDUA"} stars={4} price={2000000} discountPercent={23} />
                                    <ItemCard name={"This is the third PC"} stars={5} price={3000000} discountPercent={3} />
                                    <ItemCard name={"Ieu mah PC anu katilu"} stars={3.2} price={300000} discountPercent={34} />
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </section>
        </>
    )
}
