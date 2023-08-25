'use client'
import Image from "next/image";

import katalog from "/public/katalog_banner.webp";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import ItemCard from "@/components/ItemCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import CatalogueItemCard from "@/components/CatalogueItemCard";
import { For } from "million/react";


export default function Katalog() {

    const categories = [
        { id: "brands", label: "Brands" },
        { id: "casing_fans", label: "Casing Fans" },
        { id: "casings", label: "Casings" },
        { id: "cpu_coolers", label: "CPU Coolers" },
        { id: "cpu_integrated_gpus", label: "CPU Integrated GPUs" },
        { id: "cpu_sockets", label: "CPU Sockets" },
        { id: "cpus", label: "CPUs" },
        { id: "gpu_chipsets", label: "GPU Chipsets" },
        { id: "gpus", label: "GPUs" },
        { id: "internal_storages", label: "Internal Storages" },
        { id: "memories", label: "Memories" },
        { id: "memory_sockets", label: "Memory Sockets" },
        { id: "motherboard_chipsets", label: "Motherboard Chipsets" },
        { id: "motherboard_code_name", label: "Motherboard Code Name" },
        { id: "motherboard_form_factors", label: "Motherboard Form Factors" },
        { id: "motherboards", label: "Motherboards" },
        { id: "pc_builds", label: "PC Builds" },
        { id: "power_supplies", label: "Power Supplies" },
        { id: "product_details", label: "Product Details" },
        { id: "products", label: "Products" },
        { id: "thermal_pastes", label: "Thermal Pastes" },
        { id: "wireless_network_cards", label: "Wireless Network Cards" }
    ]

    const items = [
        { category: 'power_supplies', name: 'Power Supply (PSU) Innovation Legacy 500W 80+ Gold', price: 100000, },
        { category: 'cpus', name: 'CPU Intel Core i9-11900F 3.7 GHz', price: 100000 },
        { category: 'gpus', name: 'GPU NVIDIA GeForce RTX 3080', price: 2000000 },
        { category: 'motherboards', name: 'Motherboard ASUS ROG Strix X570-E Gaming', price: 5000000 },
        { category: 'memories', name: 'Memory Corsair Vengeance RGB Pro 16GB (2 x 8GB) DDR4 3200MHz', price: 1500000 },
        { category: 'internal_storages', name: 'Storage Samsung 970 EVO Plus 1TB NVMe M.2 SSD', price: 3000000 },
    ]

    const [selectedItems, setSelectedItems] = useState<Array<string>>([]);

    return (
        <div className="flex min-h-screen mx-auto w-full px-2 md:px-0">
            <aside
                className="md:block sticky top-0 h-min w-40 overflow-y-auto bg-card shadow-md ml-1 mr-2 mt-4 rounded-xl">
                <div className="bg-orange-500 w-full h-4">
                </div>
                <div className="m-1">
                    <span className="text-lg font-semibold">
                        Filter
                    </span>
                    <div className="flex flex-col ml-0.5">
                        <div className="mb-4 grid grid-flow-row gap-2">
                            <span className="font-semibold">Kategori</span>
                            <ScrollArea className="w-full h-48 text-sm">
                                <For each={categories}>
                                    {(item) => (
                                        <div key={item.id}>
                                            <Checkbox id={item.id} value={item.id} checked={selectedItems.includes(item.id)} onChange={() => setSelectedItems(!selectedItems.includes(item.id) ? [...selectedItems, item.id] : selectedItems.filter((id) => id !== item.id))} />
                                            <label className="ml-2" htmlFor={item.id}>{item.label}</label>
                                        </div>
                                    )}
                                </For>
                            </ScrollArea>

                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Urutkan:</span>
                            <div className="text-sm">
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Harga terendah" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="new">Terbaru</SelectItem>
                                        <SelectItem value="price-low">Harga terendah</SelectItem>
                                        <SelectItem value="price-high">Harga tertinggi</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* <div className="mb-4">
                            <span className="font-semibold">Kompatibel dengan :</span>
                        </div> */}
                        {/* <div className="mb-4">
                            <span className="font-semibold">Kondisi :</span>
                            <div className="ml-2">
                                <div className="flex">

                                    <input type={"checkbox"} value="Baru" name="kondisi-baru" id="kondisi-baru"/>
                                    <label htmlFor="kondisi-baru" className="ml-2">Baru</label>
                                </div>
                                <div className="flex">
                                    <input type={"checkbox"} value="Secondhand" name="kondisi-second"
                                           id="kondisi-second"/>
                                    <label htmlFor="kondisi-second" className="ml-2">Secondhand</label>
                                </div>
                            </div>
                        </div> */}
                        {/* <div className="mb-4">
                            <span className="font-semibold">Ketersediaan :</span>
                            <div className="ml-2">
                                <div className="flex">
                                    <input type={"checkbox"} value="Segera" name="ketersediaan-segera"
                                           id="ketersediaan-segera"/>
                                    <label htmlFor="ketersediaan-segera" className="ml-2">Segera</label>
                                </div>
                                <div className="flex">
                                    <input type={"checkbox"} value="Tersedia" name="ketersediaan-tersedia"
                                           id="ketersediaan-tersedia"/>
                                    <label htmlFor="ketersediaan-tersedia" className="ml-2">Tersedia</label>
                                </div>
                                <div className="flex">
                                    <input type={"checkbox"} value="Habis" name="ketersediaan-habis"
                                           id="ketersediaan-habis"/>
                                    <label htmlFor="ketersediaan-habis" className="ml-2">Habis</label>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </aside>

            <main className="flex-1 my-4">
                <Image src={katalog.src} className="object-scale-down rounded-xl shadow-xl" width={katalog.width}
                    height={katalog.height} alt="katalog" />
                <div className="h-2" />
                <div className="grid grid-cols-4 lg:grid-cols-5 gap-2">
                    <For each={items}>
                      {(item, index) => (
                        <CatalogueItemCard key={'item-' + index} name={item.name} price={item.price} />
                      )}
                    </For>
                </div>
                {/* <section className="flex flex-col mt-4">
                    <div className="flex flex-row justify-between">
                        <span className="text-xl">Casing PC</span>
                        <Link href="#" className="bg-orange-500 hover:bg-orange-700 active:bg-orange-800 active:scale-90 transition-all flex flex-row py-1 px-3 mx-2 rounded-md text-white">
                            Lihat Lainnya
                        </Link>
                    </div>
                    <div className="flex flex-row mt-4">
                        <div className="sm:block hidden flex-1 mr-4 aspect-[3/4] bg-white shadow-lg rounded-lg"></div>
                        <div className="flex-1 mr-4 aspect-[3/4] bg-white shadow-lg rounded-lg"></div>
                        <div className="flex-1 mr-4 aspect-[3/4] bg-white shadow-lg rounded-lg"></div>
                        <div className="flex-1 aspect-[3/4] bg-white shadow-lg rounded-lg"></div>
                    </div>
                </section>
                <section className="flex flex-col mt-4">
                    <div className="flex flex-row justify-between">
                        <span className="text-xl">Motherboard</span>
                        <Link href="#"  className="bg-orange-500 hover:bg-orange-700 active:bg-orange-800 active:scale-90 transition-all flex flex-row py-1 px-3 mx-2 rounded-md text-white">
                            Lihat Lainnya
                        </Link>
                    </div>
                    <div className="flex flex-row mt-4">
                        <div className="sm:block hidden flex-1 mr-4 aspect-[3/4] bg-white shadow-lg rounded-lg"></div>
                        <div className="flex-1 mr-4 aspect-[3/4] bg-white shadow-lg rounded-lg"></div>
                        <div className="flex-1 mr-4 aspect-[3/4] bg-white shadow-lg rounded-lg"></div>
                        <div className="flex-1 aspect-[3/4] bg-white shadow-lg rounded-lg"></div>
                    </div>
                </section>
                <section className="flex flex-col mt-4">
                    <div className="flex flex-row justify-between">
                        <span className="text-xl">CPU</span>
                        <Link href="#"  className="bg-orange-500 hover:bg-orange-700 active:bg-orange-800 active:scale-90 transition-all flex flex-row py-1 px-3 mx-2 rounded-md text-white">
                            Lihat Lainnya
                        </Link>
                    </div>
                    <div className="flex flex-row mt-4">
                        <div className="sm:block hidden flex-1 mr-4 aspect-[3/4] bg-white shadow-lg rounded-lg"></div>
                        <div className="flex-1 mr-4 aspect-[3/4] bg-white shadow-lg rounded-lg"></div>
                        <div className="flex-1 mr-4 aspect-[3/4] bg-white shadow-lg rounded-lg"></div>
                        <div className="flex-1 aspect-[3/4] bg-white shadow-lg rounded-lg"></div>
                    </div>
                </section>
                <section className="flex flex-col mt-4">
                    <div className="flex flex-row justify-between">
                        <span className="text-xl">GPU</span>
                        <Link href="#"  className="bg-orange-500 hover:bg-orange-700 active:bg-orange-800 active:scale-90 transition-all flex flex-row py-1 px-3 mx-2 rounded-md text-white">
                            Lihat Lainnya
                        </Link>
                    </div>
                    <div className="flex flex-row mt-4">
                        <div className="sm:block hidden flex-1 mr-4 aspect-[3/4] bg-white shadow-lg rounded-lg"></div>
                        <div className="flex-1 mr-4 aspect-[3/4] bg-white shadow-lg rounded-lg"></div>
                        <div className="flex-1 mr-4 aspect-[3/4] bg-white shadow-lg rounded-lg"></div>
                        <div className="flex-1 aspect-[3/4] bg-white shadow-lg rounded-lg"></div>
                    </div>
                </section>
                <section className="flex flex-col mt-4">
                    <div className="flex flex-row justify-between">
                        <span className="text-xl">Power Supply Unit (PSU)</span>
                        <Link href="#"  className="bg-orange-500 hover:bg-orange-700 active:bg-orange-800 active:scale-90 transition-all flex flex-row py-1 px-3 mx-2 rounded-md text-white">
                            Lihat Lainnya
                        </Link>
                    </div>
                    <div className="flex flex-row mt-4">
                        <div className="sm:block hidden flex-1 mr-4 aspect-[3/4] bg-white shadow-lg rounded-lg"></div>
                        <div className="flex-1 mr-4 aspect-[3/4] bg-white shadow-lg rounded-lg"></div>
                        <div className="flex-1 mr-4 aspect-[3/4] bg-white shadow-lg rounded-lg"></div>
                        <div className="flex-1 aspect-[3/4] bg-white shadow-lg rounded-lg"></div>
                    </div>
                </section> */}
            </main>
        </div>
    )
}