import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Image } from 'antd';
import { ArrowDown } from 'lucide-react';

import { HEAD_IMAGES } from '../constants/head-images';
import { Button } from '@/app/shared/ui/button';
import { Body } from '@/app/shared/ui/typography';
import { GlowingBlob } from '@/app/shared/ui/glowing-blob';


export function LandingHead() {
    const SLIDE_INTERVAL = 300;

    const [activeIndex, setActiveIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleScrollClick = () => {
      if (containerRef.current) {
        const componentBottom = containerRef.current.offsetTop + containerRef.current.offsetHeight;
        window.scrollTo({
          top: componentBottom,
          behavior: 'smooth'
        });
      }
    };

    useEffect(() => {
      let count = 0;
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % HEAD_IMAGES.length);
        count++;
        if (count >= HEAD_IMAGES.length) {
          clearInterval(interval);
          setTimeout(() => setIsFinished(true), SLIDE_INTERVAL);
        }
      }, SLIDE_INTERVAL);

      return () => clearInterval(interval);
    }, []);

    return (
      <div
        ref={containerRef}
        className={`w-full flex flex-col gap-12 xl:gap-none xl:flex-row items-center ${isFinished ? 'justify-between' : 'justify-center'} relative`}
      >
        {isFinished && (
          <div className="flex flex-col gap-6 w-full" >
              <div className="flex flex-col gap-3">
                  <h1 className='text-center xl:text-start leading-16 xl:leading-20 text-[3rem] md:text-[4rem] font-bold'>Create personalized<br/><span className='bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent'>photos</span> & <span className='text-outline italic'>videos</span><br/>with AI</h1>
                  <Body className='text-lg! text-center xl:text-start'>
                      Transform your ideas into stunning, custom visuals in seconds.
                  </Body>
              </div>
            <div className="flex gap-3 justify-center xl:justify-start">
              <Button asChild>
                  <Link href="/pages/auth/register">
                      Get started — it’s free
                  </Link>
              </Button>
              <Button variant="outline">
                  Try demo
              </Button>
            </div>
          </div>
        )}
        <div
          className={`
              rounded-4xl overflow-hidden
              w-full h-full
              ${isFinished ? 'xl:max-w-[569px] max-h-[854px]' : 'max-w-[836px] max-h-[1244px]'}
          `}
        >
          <Image
            src={HEAD_IMAGES[activeIndex]}
            alt={`Slide ${activeIndex + 1}`}
            preview={false}
            width={'100%'}
          />
        </div>
        {isFinished && <Button onClick={handleScrollClick} variant="ghost" className='hidden xl:flex absolute bottom-0 left-0'>
              Scroll to explore
              <ArrowDown className='ml-2'/>
          </Button>
        }
        <GlowingBlob opacity={0.1} className="top-[150px] right-[150px]" />
      </div>
    );
}
