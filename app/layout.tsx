import './globals.css'
import {Inter} from 'next/font/google'
import React from "react";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({subsets: ['latin']})

const iconButtonClassname = "bg-blue-50 hover:bg-blue-200 active:bg-blue-300 active:scale-90 transition-all w-12 h-12 rounded-full mx-4"

export const metadata = {
    title: 'BangunPC',
    description: 'Semua kebutuhan PC Anda disini',
}

export default function RootLayout(props: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>

        <main className="flex flex-col items-center justify-between">

            <header className="flex flex-col w-full bg-white shadow-xl">
                <div className="w-full h-8 bg-[#3e3e3e]"></div>
                <nav className="p-4">
                    <div className="flex flex-col w-full" id="top-bar">
                        {/*top*/}
                        <div className="flex flex-row mt-2 mb-6">
                            <Link href="/">
                                <Image src="/bangunpc.png" width={28} height={28} className="m-2 mr-8" alt="logo"/>
                            </Link>
                            <form action="/search" className="w-full mx-4">
                                <div className="flex border border-gray-500 rounded-full">
                                    <span className="m-auto p-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                             height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                                             fill="none" strokeLinecap="round" strokeLinejoin="round"><path
                                            stroke="none" d="M0 0h24v24H0z" fill="none"></path><path
                                            d="M10 10m-7 0a7 7 0 1 0 14 0 7 7 0 1 0-14 0"></path><path
                                            d="M21 21l-6-6"></path></svg>
                                    </span>
                                    <input type="text" className="w-full px-4 py-2"
                                           placeholder="Cari PC-mu..."/>
                                    <div className="border border-r-0 border-b-0 border-t-0 border-l-gray-500 p-3 px-6">
                                        Kategori
                                    </div>
                                </div>
                            </form>
                            <div className="flex flex-row">

                                <button
                                    className={iconButtonClassname}>
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
                                <button
                                    className={iconButtonClassname}>
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
                                </button>
                            </div>
                        </div>
                        {/*bottom*/}
                        <div className="flex flex-wrap justify-between px-24">
                            <button
                                className="bg-blue-50 hover:bg-blue-200 active:bg-blue-300 active:scale-90 transition-all flex flex-row py-2 px-3 rounded-md">
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
                            <div className="flex flex-row justify-center">
                                <Link href="/"
                                    className="bg-transparent hover:bg-orange-200 active:bg-orange-500 active:scale-90 transition-all flex flex-row py-2 px-3 mx-2 rounded-md">
                                    Beranda
                                </Link>
                                <Link href="/katalog"
                                   className="bg-transparent hover:bg-orange-200 active:bg-orange-500 active:scale-90 transition-all flex flex-row py-2 px-3 mx-2 rounded-md">
                                    Katalog
                                </Link>
                                <Link href="/simulasi"
                                    className="bg-orange-400 hover:bg-orange-500 active:bg-orange-700 active:scale-90 transition-all flex flex-row py-2 px-3 mx-2 rounded-md text-white">
                                    Simulasi Rakit PC
                                </Link>
                            </div>
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
                            <br/>
                            <span>
                                Membantumu untuk merakit PC sesuai kebutuhan
                            </span>
                        </section>
                        <section className="flex flex-col w-full justify-start md:py-0 pt-12">
                            <span className="font-bold">About Us</span>
                            <br/>
                            <a href="">Portfolio</a>
                            <a href="">Careers</a>
                            <a href="">Contact Us</a>
                        </section>
                        <section className="flex flex-col w-full justify-start md:py-0 pt-12">
                            <span className="font-bold">Contact Us</span>
                            <br/>
                            Jl. Telekomunikasi. 1, Terusan Buahbatu - Bojongsoang, Telkom University, Sukapura, Kec.
                            Dayeuhkolot, Kabupaten Bandung, Jawa Barat 40257
                            <br/>
                            +62 895-3430-86057
                        </section>
                        <section className="flex flex-row align-bottom mt-auto md:py-0 pt-12">
                            <button className={iconButtonClassname}>
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
                            <button className={iconButtonClassname}>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     className="m-auto text-gray-700" width="24" height="24"
                                     viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                                     strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path
                                        d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z"></path>
                                </svg>
                            </button>
                            <button className={iconButtonClassname}>
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
                    </div>
                    <div className="my-12 border-t border-t-white"/>
                    <section className="m-12 text-center" id="copyright">
                        Copyright © 2023 BangunPC All Rights Reserved.
                    </section>
                </footer>
            </section>
        </main>
        </body>
        </html>
    )
}
