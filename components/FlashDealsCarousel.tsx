'use client';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import StarRating from './StarRating';
import Image from 'next/image';
import ItemCard from './ItemCard';

const SampleNextArrow = (props: any) => {
    const { onClick } = props
    return (
        <div className='z-10 absolute top-1/2 right-2' onClick={onClick}>
            <button aria-label='next' className='rounded-full text-orange-600 hover:text-orange-700 hover:scale-110 active:text-orange-800 active:scale-90 transition-all'>
                <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24" stroke-width={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0 -18"></path>
                    <path d="M16 12l-4 -4"></path>
                    <path d="M16 12h-8"></path>
                    <path d="M12 16l4 -4"></path>
                </svg>
            </button>
        </div>
    )
}
const SamplePrevArrow = (props: any) => {
    const { onClick } = props
    return (
        <div className='z-10 absolute top-1/2 left-2' onClick={onClick}>
            <button aria-label='previous' className='rounded-full text-orange-600 hover:text-orange-700 hover:scale-110 active:text-orange-800 active:scale-90 transition-all'>
                <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24" stroke-width={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M12 21a9 9 0 1 0 0 -18a9 9 0 0 0 0 18"></path>
                    <path d="M8 12l4 4"></path>
                    <path d="M8 12h8"></path>
                    <path d="M12 8l-4 4"></path>
                </svg>
            </button>
        </div>
    )
}

interface Carousel {
    slidesToShow: number;
    slidesToScroll: number;
    className: string;
}

const FlashDealsCarousel: React.FC<Carousel> = (props) => {
    const carouselItemIds = [
        212211,
        // Add more carousel items as needed
    ];

    // get image, name, star, price

    // TODO(damywise): filter from database instead of hard-coding

    const carouselItems = [
        { name: "AMD Ryzen 3 3200G - Radeon Vega 8 - RAM 8 GB - SSD 640GB", stars: 1, price: 500000, discountPercent: 20, },
        { name: "AMD Ryzen 3 3200G - Radeon Vega 8 - RAM 4 GB - SSD 120GB", stars: 4.5, price: 200000, discountPercent: 25, },
        { name: "AMD Ryzen 3 3200G - Radeon Vega 8 - RAM 12 GB - SSD 320GB", stars: 3, price: 400000, discountPercent: 54, },
        { name: "AMD Ryzen 3 3200G - Radeon Vega 8 - RAM 8 GB - SSD 120GB", stars: 2.5, price: 700000, discountPercent: 32, },
        { name: "AMD Ryzen 3 3200G - Radeon Vega 8 - RAM 2 GB - SSD 240GB", stars: 5, price: 100000, discountPercent: 12, },
    ];

    return (
        <div className={props.className}>
            <Slider
                dots={false}
                infinite={true}
                slidesToShow={props.slidesToShow}
                slidesToScroll={2}
                autoplay={true}
                nextArrow={<SampleNextArrow />}
                prevArrow={<SamplePrevArrow />}
            >
                {carouselItems.map((item, index) => {
                    return (
                        <div key={index} className='p-1'>
                            <ItemCard {...item} />
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
};

export default FlashDealsCarousel;