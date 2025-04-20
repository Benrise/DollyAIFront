import NextImage from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useMobileDetect } from '@/app/shared/hooks';

interface ExampleGalleryProps {
    images: string[];
    className?: string
}

export function ExampleGallery ({ images, className }: ExampleGalleryProps) {
    const { isMobile } = useMobileDetect();

    return (
        <Swiper
        modules={[Autoplay]}
        navigation={false}
        spaceBetween={16}
        allowTouchMove={false}
        noSwiping={true}
        speed={1000}
        centeredSlides={true} 
        slidesPerView={isMobile ? 2 : 1.5}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className={className}
    >
        {images.map((image, index) => (
            <SwiperSlide key={index}>
                <NextImage
                        src={`/images/examples/${image}`}
                        alt={`Slide ${index}`}
                        className="select-none rounded-4xl object-cover"
                        width={1024}
                        height={1024}
                        lazyBoundary='200px'
                    />
            </SwiperSlide>
        ))}
    </Swiper>
    )
}