import './globals.css'
import { Inter } from 'next/font/google'
import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

const iconButtonClassname = "flex bg-blue-50 hover:bg-blue-200 active:bg-blue-300 active:scale-90 transition-all w-12 h-12 rounded-full mx-4"

export default function RootLayout(props: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                {/* google  */}
                <title>BangunPC — Find Parts, Components, Builds, and More</title>
                <meta name="title" content="BangunPC — Find Parts, Components, Builds, and More" />
                <meta name="description" content="Selamat datang di BangunPC, platform untuk penggemar PC! Kami ada untuk membantu Anda menemukan komponen PC dari platform belanja terpercaya. Manfaatkan fitur-fitur kami seperti simulasi rakit PC manual dan katalog komponen lengkap. Kami juga menyediakan panduan mudah untuk pemula agar Anda bisa merakit PC sendiri. Bergabunglah dengan BangunPC dan wujudkan PC impian Anda sekarang!" />
                <meta itemProp="image" content="/bangunpc_nologo.png" />
                <meta name="google-site-verification" content="gq5gsij68Np-CJw0vlhvo8ULCJgLuT-1078RclhZ8bg" />

                {/* facebook  */}
                <meta property="og:url" content="https://bangunpc.pages.dev/" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="BangunPC — Find Parts, Components, Builds, and More" />
                <meta property="og:description" content="Selamat datang di BangunPC, platform untuk penggemar PC! Kami ada untuk membantu Anda menemukan komponen PC dari platform belanja terpercaya. Manfaatkan fitur-fitur kami seperti simulasi rakit PC manual dan katalog komponen lengkap. Kami juga menyediakan panduan mudah untuk pemula agar Anda bisa merakit PC sendiri. Bergabunglah dengan BangunPC dan wujudkan PC impian Anda sekarang!" />
                <meta property="og:image" content="/bangunpc_nologo.png" />

                {/* twitter  */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://metatags.io" />
                <meta property="twitter:title" content="BangunPC — Find Parts, Components, Builds, and More" />
                <meta property="twitter:description" content="Selamat datang di BangunPC, platform untuk penggemar PC! Kami ada untuk membantu Anda menemukan komponen PC dari platform belanja terpercaya. Manfaatkan fitur-fitur kami seperti simulasi rakit PC manual dan katalog komponen lengkap. Kami juga menyediakan panduan mudah untuk pemula agar Anda bisa merakit PC sendiri. Bergabunglah dengan BangunPC dan wujudkan PC impian Anda sekarang!" />
                <meta property="twitter:image" content="https://bangunpc.pages.dev/bangunpc_nologo.png" />

                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </head>
            <body className={inter.className}>
                <main className="flex flex-col items-center justify-between">
                    <header className="flex flex-col w-full bg-white shadow-xl shadow-gray-100">
                        <div className="w-full h-8 bg-[#3e3e3e]"></div>
                        <nav className="p-4">
                            <div className="flex flex-col w-full" id="top-bar">
                                {/*top*/}
                                <div className="flex flex-row mt-2 mb-6">
                                    <Link href="/">
                                        <Image src="/bangunpc.webp" width={28} height={28} className="m-2 mr-8" alt="logo" />
                                    </Link>
                                    <form action="/search" className="w-full mx-4">
                                        <div className="flex sm:border border-gray-500 rounded-full">
                                            {/*  */}
                                            <div className='flex h-12 sm:hidden'>
                                                <span className="my-auto">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                        height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                                                        fill="none" strokeLinecap="round" strokeLinejoin="round"><path
                                                            stroke="none" d="M0 0h24v24H0z" fill="none"></path><path
                                                                d="M10 10m-7 0a7 7 0 1 0 14 0 7 7 0 1 0-14 0"></path><path
                                                                    d="M21 21l-6-6"></path></svg>
                                                </span>
                                            </div>
                                            {/*  */}
                                            <div className='hidden sm:flex w-full'>
                                                <span className="m-auto p-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                        height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                                                        fill="none" strokeLinecap="round" strokeLinejoin="round"><path
                                                            stroke="none" d="M0 0h24v24H0z" fill="none"></path><path
                                                                d="M10 10m-7 0a7 7 0 1 0 14 0 7 7 0 1 0-14 0"></path><path
                                                                    d="M21 21l-6-6"></path></svg>
                                                </span>
                                                <input type="text" className="w-full px-4 py-2"
                                                    placeholder="Cari PC-mu..." />
                                                <div className="border border-r-0 border-b-0 border-t-0 border-l-gray-500 p-3 px-6">
                                                    Kategori
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="flex flex-row">
                                        <button
                                            className={iconButtonClassname} aria-label="account">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                className="m-auto"
                                                width="24" height="24" viewBox="0 0 24 24" strokeWidth="2"
                                                stroke="currentColor"
                                                fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                                                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                                            </svg>
                                        </button>
                                        <Link href="/keranjang"
                                            className={iconButtonClassname} aria-label="cart">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                className="m-auto"
                                                width="24" height="24"
                                                viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                                                strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                                                <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                                                <path d="M17 17h-11v-14h-2"></path>
                                                <path d="M6 5l14 1l-1 7h-13"></path>
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                                {/*bottom*/}
                                <div className="flex flex-wrap md:flex-row justify-center px-24">
                                    <button
                                        className="hidden md:flex flex-row bg-blue-50 hover:bg-blue-200 active:bg-blue-300 active:scale-90 transition-all  py-2 px-3 rounded-md">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            className="m-auto text-gray-700"
                                            width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                                            fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <path d="M5 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                                            <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                                            <path d="M19 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                                            <path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                                            <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                                            <path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                                            <path d="M5 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                                            <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                                            <path d="M19 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                                        </svg>
                                        <span className="mx-5">
                                            Kategori
                                        </span>
                                    </button>
                                    <div className='w-screen md:hidden inline'></div>
                                    <Link href="/"
                                        className="bg-transparent hover:bg-orange-200 active:bg-orange-500 active:scale-90 transition-all flex flex-row py-2 px-3 mx-2 rounded-md">
                                        Beranda
                                    </Link>
                                    <Link href="/katalog"
                                        className="bg-transparent hover:bg-orange-200 active:bg-orange-500 active:scale-90 transition-all flex flex-row py-2 px-3 mx-2 rounded-md">
                                        Katalog
                                    </Link>
                                    <Link href="/simulasi"
                                        className="bg-orange-500 hover:bg-orange-700 active:bg-orange-800 active:scale-90 transition-all flex flex-row py-2 px-3 mx-2 rounded-md text-white font-semibold">
                                        Simulasi
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            className="ml-2" width="24" height="24"
                                            viewBox="0 0 24 24" strokeWidth="1.7" stroke="currentColor" fill="none"
                                            strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <path d="M3 5h6v14h-6z"></path>
                                            <path d="M12 9h10v7h-10z"></path>
                                            <path d="M14 19h6"></path>
                                            <path d="M17 16v3"></path>
                                            <path d="M6 13v.01"></path>
                                            <path d="M6 16v.01"></path>
                                        </svg>
                                    </Link>

                                    <button
                                        className="flex md:hidden flex-row mx-24 mt-4 bg-blue-50 hover:bg-blue-200 active:bg-blue-300 active:scale-90 transition-all  py-2 px-3 rounded-md">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            className="m-auto text-gray-700"
                                            width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                                            fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <path d="M5 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                                            <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                                            <path d="M19 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                                            <path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                                            <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                                            <path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                                            <path d="M5 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                                            <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                                            <path d="M19 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                                        </svg>
                                        <span className="mx-5">
                                            Kategori
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </nav>
                    </header>

                    {props.children}

                    <section className="flex justify-around w-full bg-[#3e3e3e] pt-12 text-white">
                        <footer>
                            <div className="flex md:flex-row flex-col px-12">
                                <section className="flex flex-col w-full justify-start">
                                    <span className="font-bold">
                                        BangunPC
                                    </span>
                                    <br />
                                    <span>
                                        Membantumu merakit PC sesuai kebutuhan
                                    </span>
                                </section>
                                <section className="flex flex-col w-full justify-start md:py-0 pt-12">
                                    <span className="font-bold">About Us</span>
                                    <br />
                                    <Link href="#" className="text-blue-400">Portfolio</Link>
                                    <Link href="#" className="text-blue-400">Careers</Link>
                                    <Link href="#" className="text-blue-400">Contact Us</Link>
                                </section>
                                <section className="flex flex-col w-full justify-start md:py-0 pt-12">
                                    <span className="font-bold">Contact Us</span>
                                    <br />
                                    Jl. Telekomunikasi. 1, Terusan Buahbatu - Bojongsoang, Telkom University, Sukapura, Kec.
                                    Dayeuhkolot, Kabupaten Bandung, Jawa Barat 40257
                                    <br />
                                    +62 895-3430-86057
                                </section>
                            </div>
                            <div className="mb-6 mt-12 border-t border-t-gray-500" />
                            <section className="flex flex-row align-bottom justify-center">
                                <button className={iconButtonClassname} aria-label="instagram">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        className="m-auto text-gray-700" width="24" height="24"
                                        viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path
                                            d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z"></path>
                                        <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                                        <path d="M16.5 7.5l0 .01"></path>
                                    </svg>
                                </button>
                                <button className={iconButtonClassname} aria-label="twitter">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="m-auto text-gray-700" width="24" height="24" viewBox="0 0 24 24" stroke-width={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                                        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
                                    </svg>
                                </button>
                                <button className={iconButtonClassname} aria-label="linkedin">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        className="m-auto text-gray-700" width="24" height="24"
                                        viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path
                                            d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                                        <path d="M8 11l0 5"></path>
                                        <path d="M8 8l0 .01"></path>
                                        <path d="M12 16l0 -5"></path>
                                        <path d="M16 16v-3a2 2 0 0 0 -4 0"></path>
                                    </svg>
                                </button>
                            </section>
                            <section className="mb-12 mt-4 font-light text-xs text-center" id="copyright">
                                ©2023 BangunPC. All rights reserved.
                            </section>
                        </footer>
                    </section>
                </main>
            </body>
        </html>
    )
}
