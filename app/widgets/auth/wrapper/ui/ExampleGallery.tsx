'use client'

import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

interface ExampleGalleryProps {
    images: string[];
}

export function ExampleGallery ({ images }: ExampleGalleryProps) {
    return (
        <Swiper
        modules={[Autoplay]}
        spaceBetween={16}
        navigation={false}
        allowTouchMove={false}
        noSwiping={true}
        slidesPerView={1.4}
        speed={1000}
        centeredSlides={true} 
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="w-full"
    >
        {images.map((image, index) => (
            <SwiperSlide key={index} className="flex justify-center items-center">
                <Image
                    src={`/images/examples/${image}`}
                    alt={`Slide ${index}`}
                    width={1024}
                    height={1024}
                    className="rounded-2xl select-none"
                />
            </SwiperSlide>
        ))}
    </Swiper>
    )
}