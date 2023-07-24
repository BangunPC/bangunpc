export default function Keranjang() {
    return (
        <main className="flex flex-row my-12 px-8 justify-around w-full">
            <div className="w-full h-full">
                <div className="flex flex-1 mr-4 flex-row bg-white rounded-lg p-4 shadow-md mb-4">
                    <div className="flex">
                        Image
                    </div>
                    <div className="flex flex-1 flex-col">
                        <div className="ml-auto">
                            <button aria-label="delete">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M4 7l16 0"></path>
                                    <path d="M10 11l0 6"></path>
                                    <path d="M14 11l0 6"></path>
                                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="font-semibold text-2xl">
                            Name
                        </div>
                        <div className="flex flex-row ml-auto">
                            <button aria-label="increment item" className="hover:bg-orange-500 hover:scale-110 hover:text-white active:text-white active:scale-90 active:bg-orange-500 hover:border-none transition-all flex justify-center w-10 h-10 border rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" className="m-auto" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M12 5l0 14"></path>
                                    <path d="M5 12l14 0"></path>
                                </svg>
                            </button>
                            <div className="w-4" />
                            <button aria-label="decrement item" className="hover:bg-gray-400 hover:scale-110 active:bg-gray-400 active:scale-90 transition-all flex justify-center w-10 h-10 rounded-md bg-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="m-auto" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M5 12l14 0"></path>
                                </svg>
                            </button>
                        </div>
                        <div>
                            Price | Price 2
                        </div>
                    </div>
                </div>
            </div>

            <aside
                className="md:block hidden sticky top-16 w-64 h-32 bg-white shadow-md m-4 rounded-xl">
                <div className="flex flex-col w-64 h-32 bg-white rounded-lg shadow-md px-4">
                    <div className="my-auto">
                        <span className="font-bold text-orange-500 text-lg">Semua Barang</span>
                        <div className="border-t border-t-gray-200 my-4" />
                        <div className="flex justify-between my-auto">
                            <span>Total harga:</span>
                            <span className="font-bold text-orange-500 text-lg">Rp. XXXXXXX</span>
                        </div>
                    </div>
                </div>
                <button className="bg-orange-500 hover:bg-orange-700 active:bg-orange-800 active:scale-90 transition-all flex flex-row justify-center py-2 px-3 mx-2 rounded-md text-white text-center my-4">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        className="mr-1 my-auto" width="21" height="21" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z"></path>
                        <path d="M9 11v-5a3 3 0 0 1 6 0v5"></path>
                    </svg>
                    Beli Sekarang
                </button>
            </aside>
        </main>
    )
}