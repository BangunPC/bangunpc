export default function Katalog() {
    return (
        <div className="flex min-h-screen w-full">
            <asid
                className="sticky top-16 h-[calc(100vh-theme(spacing.16))] w-56 overflow-y-auto bg-white shadow-md m-4 rounded-xl">
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
            </asid>

            <main className="mt-16 flex-1 bg-yellow-200">
                <p>content</p>
            </main>
        </div>
    )
}