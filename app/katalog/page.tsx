import Image from "next/image";

import katalog from "/public/katalog_banner.png";

export default function Katalog() {
    return (
        <div className="flex min-h-screen mx-auto w-full max-w-[860px] px-2 md:px-0">
            <aside
                className="md:block hidden sticky top-16 h-[calc(100vh-theme(spacing.16))] w-56 overflow-y-auto bg-white shadow-md m-4 rounded-xl">
                <div className="bg-orange-500 w-full h-4">
                </div>
                <div className="m-4">
                    <span className="text-3xl">
                    Filter
                    </span>
                    <div className="flex flex-col my-4">
                        <div className="mb-4">

                            <span className="font-semibold">Kategori</span>
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Urut berdasarkan :</span>
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Kompatibel dengan :</span>
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Kondisi :</span>
                            <div className="ml-2">
                                <div className="flex">

                                    <input type={"checkbox"} value="Baru" name="kondisi-baru" id="kondisi-baru"/>
                                    <label htmlFor="kondisi-baru" className="ml-2">Baru</label>
                                </div>
                                <div className="flex">
                                    <input type={"checkbox"} value="Secondhand" name="kondisi-second" id="kondisi-second"/>
                                    <label htmlFor="kondisi-second" className="ml-2">Secondhand</label>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Ketersediaan :</span>
                            <div className="ml-2">
                                <div className="flex">
                                    <input type={"checkbox"} value="Segera" name="ketersediaan-segera" id="ketersediaan-segera"/>
                                    <label htmlFor="ketersediaan-segera" className="ml-2">Segera</label>
                                </div>
                                <div className="flex">
                                    <input type={"checkbox"} value="Tersedia" name="ketersediaan-tersedia" id="ketersediaan-tersedia"/>
                                    <label htmlFor="ketersediaan-tersedia" className="ml-2">Tersedia</label>
                                </div>
                                <div className="flex">
                                    <input type={"checkbox"} value="Habis" name="ketersediaan-habis" id="ketersediaan-habis"/>
                                    <label htmlFor="ketersediaan-habis" className="ml-2">Habis</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            <main className="flex-1 my-4">
                <Image src={katalog.src} className="object-scale-down rounded-xl shadow-xl" width={katalog.width} height={katalog.height}/>
                <section className="flex flex-col mt-4">
                    <div className="flex flex-row justify-between">
                        <span className="text-xl">Casing PC</span>
                        <a className="bg-orange-400 hover:bg-orange-500 active:bg-orange-700 transition-colors flex flex-row py-1 px-3 mx-2 rounded-md text-white">
                           Lihat Lainnya
                        </a>
                    </div>
                    <div className="flex flex-row mt-4">
                        <div className="sm:block hidden flex-1 mr-4 h-48 bg-white shadow-lg rounded-lg"></div>
                        <div className="flex-1 mr-4 h-48 bg-white shadow-lg rounded-lg"></div>
                        <div className="flex-1 mr-4 h-48 bg-white shadow-lg rounded-lg"></div>
                        <div className="flex-1 h-48 bg-white shadow-lg rounded-lg"></div>
                    </div>
                </section>
                <section className="flex flex-col mt-4">
                    <div className="flex flex-row justify-between">
                        <span className="text-xl">Motherboard</span>
                        <a className="bg-orange-400 hover:bg-orange-500 active:bg-orange-700 transition-colors flex flex-row py-1 px-3 mx-2 rounded-md text-white">
                           Lihat Lainnya
                        </a>
                    </div>
                    <div className="flex flex-row mt-4">
                        <div className="sm:block hidden flex-1 mr-4 h-48 bg-white shadow-lg rounded-lg"></div>
                        <div className="flex-1 mr-4 h-48 bg-white shadow-lg rounded-lg"></div>
                        <div className="flex-1 mr-4 h-48 bg-white shadow-lg rounded-lg"></div>
                        <div className="flex-1 h-48 bg-white shadow-lg rounded-lg"></div>
                    </div>
                </section>
                <section className="flex flex-col mt-4">
                    <div className="flex flex-row justify-between">
                        <span className="text-xl">CPU</span>
                        <a className="bg-orange-400 hover:bg-orange-500 active:bg-orange-700 transition-colors flex flex-row py-1 px-3 mx-2 rounded-md text-white">
                           Lihat Lainnya
                        </a>
                    </div>
                    <div className="flex flex-row mt-4">
                        <div className="sm:block hidden flex-1 mr-4 h-48 bg-white shadow-lg rounded-lg"></div>
                        <div className="flex-1 mr-4 h-48 bg-white shadow-lg rounded-lg"></div>
                        <div className="flex-1 mr-4 h-48 bg-white shadow-lg rounded-lg"></div>
                        <div className="flex-1 h-48 bg-white shadow-lg rounded-lg"></div>
                    </div>
                </section>
                <section className="flex flex-col mt-4">
                    <div className="flex flex-row justify-between">
                        <span className="text-xl">GPU</span>
                        <a className="bg-orange-400 hover:bg-orange-500 active:bg-orange-700 transition-colors flex flex-row py-1 px-3 mx-2 rounded-md text-white">
                           Lihat Lainnya
                        </a>
                    </div>
                    <div className="flex flex-row mt-4">
                        <div className="sm:block hidden flex-1 mr-4 h-48 bg-white shadow-lg rounded-lg"></div>
                        <div className="flex-1 mr-4 h-48 bg-white shadow-lg rounded-lg"></div>
                        <div className="flex-1 mr-4 h-48 bg-white shadow-lg rounded-lg"></div>
                        <div className="flex-1 h-48 bg-white shadow-lg rounded-lg"></div>
                    </div>
                </section>
                <section className="flex flex-col mt-4">
                    <div className="flex flex-row justify-between">
                        <span className="text-xl">Power Supply Unit (PSU)</span>
                        <a className="bg-orange-400 hover:bg-orange-500 active:bg-orange-700 transition-colors flex flex-row py-1 px-3 mx-2 rounded-md text-white">
                           Lihat Lainnya
                        </a>
                    </div>
                    <div className="flex flex-row mt-4">
                        <div className="sm:block hidden flex-1 mr-4 h-48 bg-white shadow-lg rounded-lg"></div>
                        <div className="flex-1 mr-4 h-48 bg-white shadow-lg rounded-lg"></div>
                        <div className="flex-1 mr-4 h-48 bg-white shadow-lg rounded-lg"></div>
                        <div className="flex-1 h-48 bg-white shadow-lg rounded-lg"></div>
                    </div>
                </section>
            </main>
        </div>
    )
}