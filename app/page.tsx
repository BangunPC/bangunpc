import Image from "next/image";
import jumbotronBg from "/public/Jumbotron.png"
import jumbotronComputer from "/public/Jumbotron_Computer.png"
import {cleanURL} from "next/dist/server/future/route-modules/app-route/helpers/clean-url";
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
                               height={jumbotronComputer.width}/>
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
                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-orange-400 mr-4" width="24"
                         height="24" viewBox="0 0 24 24" strokeWidth="0" stroke="currentColor" fill={true}
                         strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11"></path>
                    </svg>
                    <span>
                    Flash Deals
                    </span>
                </div>
                <div>
                    Content
                </div>
            </section>
            <section className="flex flex-col mb-12 w-full">
                <div className="flex px-12">
                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-orange-400 mr-4" width="24"
                         height="24" viewBox="0 0 24 24" strokeWidth="0" stroke="currentColor" fill={true}
                         strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11"></path>
                    </svg>
                    <span>
                    Kategori PC
                    </span>
                </div>
                <div>
                    Content
                </div>
            </section>
        </>
    )
}
