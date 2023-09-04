'use client'
import Image from "next/image"
import StarRating from "./StarRating"
import { block } from "million/react"

const ItemCard = block((props: { name: string, stars: number, price: number, discountPercent: number }) => {
    const { name, stars, price, discountPercent } = props

    const priceBeforeDiscount = price / (1 - discountPercent / 100)

    return (
        <div className="flex-1 h-full px-2">
            <div className="flex flex-col bg-white shadow-md rounded-lg w-full h-full">
                <header className='relative h-full aspect-square rounded-md bg-slate-50 m-1'>
                    <div className='z-10 absolute top-1 left-1 rounded-md bg-orange-600 text-white w-fit px-2 text-sm'>{discountPercent}% Off</div>
                    <Image src={''} alt={''} className="object-cover" />
                </header>
                <main className='flex flex-col p-4'>
                    <span aria-label='title'>{name}</span>
                    <StarRating rating={stars} />
                    <div className='flex flex-row justify-between'>
                        <div className='flex flex-col'>
                            <span aria-label='price before discount' className='font-bold line-through opacity-50 text-sm'>
                                Rp.{priceBeforeDiscount.toLocaleString("ID")}
                            </span>
                            <span aria-label='price' className='font-bold text-lg'>
                                Rp.{price.toLocaleString("ID")}
                            </span>
                        </div>
                        <button aria-label="increment item" className="hover:bg-orange-500 hover:scale-110 hover:text-white active:text-white active:scale-90 active:bg-orange-500 hover:border-none transition-all flex justify-center w-10 h-10 border rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="m-auto" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M12 5l0 14"></path>
                                <path d="M5 12l14 0"></path>
                            </svg>
                        </button>
                    </div>
                </main>
            </div>
        </div>
    )
})

export default ItemCard