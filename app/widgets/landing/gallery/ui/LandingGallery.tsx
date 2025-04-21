import './styles.scss';

import NextImage from 'next/image';
import { ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Grid } from 'swiper/modules';

import { GALLERY_IMAGES } from '../constants';
import { H1 } from '@/app/shared/ui/typography';
import { Button } from '@/app/shared/ui/button';

export function LandingGallery() {
  const swiperRef = useRef<any>(null);

  return (
    <div 
      className="flex flex-col gap-6 md:gap-12 w-full"
    >
      <div className="flex justify-between gap-3 max-w-full items-center relative">
        <H1>Endless inspiration</H1>
        <Button variant="ghost">
          See all
          <ChevronRight className="ml-2" />
        </Button>
      </div>
      <Swiper
        ref={swiperRef}
        slidesPerView={3.5}
        speed={5000}
        modules={[Autoplay, FreeMode, Grid]}
        freeMode={{
          enabled: true,
          sticky: false,
          momentum: true,
        }}
        grid={{
          rows: 2,
          fill: 'row',
        }}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        spaceBetween={12}
        breakpoints={{
          640: {
            spaceBetween: 24,
          },
        }}
        className='landing-slider w-full'
      >
        {GALLERY_IMAGES.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="rounded-2xl xl:rounded-4xl overflow-hidden">
              <NextImage
                width={364}
                height={546}
                className="w-full h-full object-cover"
                src={image}
                alt="Gallery image"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}