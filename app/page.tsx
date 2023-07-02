import Image from 'next/image'

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <header className="flex flex-col w-full bg-white shadow-xl">
                <div className="w-full h-8 bg-[#3e3e3e]"></div>
                <nav className="p-4">
                    <div className="flex flex-col w-full" id="top-bar">
                        {/*top*/}
                        <div className="flex flex-row mt-2 mb-6">
                            <img src="/bangunpc.png" width={28} className="m-2 mr-8"/>
                            <form action="/search" className="w-full mx-4">
                                <div className="flex border border-gray-500 rounded-full">
                                    <span className="m-auto p-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                             height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                             fill="none" stroke-linecap="round" stroke-linejoin="round"><path
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
                                    className="bg-blue-50 hover:bg-blue-200 active:bg-blue-300 transition-colors w-12 h-12 rounded-full mx-4">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         className="m-auto"
                                         width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
                                         stroke="currentColor"
                                         fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                                    </svg>
                                </button>
                                <button
                                    className="bg-blue-50 hover:bg-blue-200 active:bg-blue-300 transition-colors w-12 h-12 rounded-full mx-4">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         className="m-auto"
                                         width="24" height="24"
                                         viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                         stroke-linecap="round" stroke-linejoin="round">
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
                                className="bg-blue-50 hover:bg-blue-200 active:bg-blue-300 transition-colors flex flex-row py-2 px-3 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     className="icon icon-tabler icon-tabler-grid-dots"
                                     width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                     fill="none" stroke-linecap="round" stroke-linejoin="round">
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
                                <button
                                    className="bg-transparent hover:bg-orange-200 active:bg-orange-500 transition-colors flex flex-row py-2 px-3 mx-2 rounded-md">
                                    Kategori
                                </button>
                                <button
                                    className="bg-transparent hover:bg-orange-200 active:bg-orange-500 transition-colors flex flex-row py-2 px-3 mx-2 rounded-md">
                                    Katalog
                                </button>
                                <button
                                    className="bg-amber-500 hover:bg-amber-700 active:bg-orange-500 transition-colors flex flex-row py-2 px-3 mx-2 rounded-md text-white">
                                    Simulasi Rakit PC
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <section>Content</section>
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
                        <section className="flex flex-col w-full justify-start md:my-0 my-12">
                            <span className="font-bold">About Us</span>
                            <br/>
                            <a href="">Portfolio</a>
                            <a href="">Careers</a>
                            <a href="">Contact Us</a>
                        </section>
                        <section className="flex flex-col w-full justify-start">
                            <span className="font-bold">Contact Us</span>
                            <br/>
                            Jl. Telekomunikasi. 1, Terusan Buahbatu - Bojongsoang, Telkom University, Sukapura, Kec.
                            Dayeuhkolot, Kabupaten Bandung, Jawa Barat 40257
                            <br/>
                            +62 895-3430-86057
                        </section>
                    </div>
                    <div className="my-12 border-t border-t-white"/>
                    <section className="m-12 text-center" id="copyright">
                        Copyright © 2023 BangunPC All Rights Reserved.
                    </section>
                </footer>
            </section>
        </main>
    )
}
