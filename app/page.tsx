import Image from "next/image";
import jumbotronComputer from "/public/Jumbotron_Computer.png"
import React from "react";

export default function Home() {
    return (
        <>
            <section className="flex w-full h-full py-12 mb-12"
                     style={{backgroundImage: `url('/Jumbotron.png')`, backgroundSize: 'cover'}}>
                <div className="w-full">
                    <div className="flex flex-wrap justify-center align-middle">
                        <Image className="md:w-2/5 m-auto object-scale-down" src={jumbotronComputer.src}
                               width={jumbotronComputer.width}
                               height={jumbotronComputer.width}
                               alt="jumbotron"/>
                        <div className="md:w-1/2 w-2/3 m-auto text-white flex flex-col">
                            <p className="text-5xl font-light leading-snug">
                                Rakit <span className="font-bold">PC</span> impianmu <br/>
                                dengan <span className="font-bold text-orange-400">MUDAH</span> <br/>
                                dan <span className="font-bold text-orange-400">MURAH</span>
                            </p>
                            <button
                                className="w-fit mx-16 my-4 bg-orange-400 hover:bg-orange-500 active:bg-orange-700 transition-colors flex flex-row py-2 px-3 mx-2 rounded-md text-white">
                                Buat Sekarang
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            {/*TODO(damywise): make the header into component*/}
            <section className="flex flex-col mb-12 w-full">
                <div className="flex px-12">
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
                <div className="flex flex-row mt-4">
                    <div className="flex-1 mx-4 aspect-[3/4] bg-white shadow-lg rounded-lg"></div>
                    <div className="flex-1 mr-4 aspect-[3/4] bg-white shadow-lg rounded-lg"></div>
                    <div className="flex-1 mr-4 aspect-[3/4] bg-white shadow-lg rounded-lg"></div>
                    <div className="flex-1 mr-4 aspect-[3/4] bg-white shadow-lg rounded-lg"></div>
                </div>
            </section>
            <section className="flex flex-col mb-12 w-full">
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
                <div className="flex flex-row mt-4 mx-12">
                    <div className="flex flex-col w-full justify-between">
                        <div className="flex flex-row justify-between">
                            <span className="text-xl">Paket PC Murah Berkualitas</span>
                            <a className="bg-orange-400 hover:bg-orange-500 active:bg-orange-700 transition-colors flex flex-row py-1 px-3 mx-2 rounded-md text-white">
                                Lihat Lainnya
                            </a>
                        </div>
                        <div className="flex flex-row mt-4">
                            <div className="flex-1 mr-4 aspect-[2/3] bg-blue-600 rounded-lg"></div>
                            <div className="flex-1 mr-4 mt-auto aspect-[3/4] bg-white shadow-lg rounded-lg"></div>
                            <div className="flex-1 mr-4 mt-auto aspect-[3/4] bg-white shadow-lg rounded-lg"></div>
                            <div className="flex-1 mr-4 mt-auto aspect-[3/4] bg-white shadow-lg rounded-lg"></div>
                            <div className="flex-1 mt-auto aspect-[3/4] bg-white shadow-lg rounded-lg"></div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
