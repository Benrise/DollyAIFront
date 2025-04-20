import NextImage from 'next/image';
import { useEffect, useState } from 'react';
import { HEAD_IMAGES } from '../constants/head-images';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Link from 'next/link';
import { Button } from '@/app/shared/ui/button';

export function LandingHead() {
    const SLIDE_INTERVAL = 300;

    const [activeIndex, setActiveIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [parent] = useAutoAnimate<HTMLDivElement>();

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
      ref={parent}
      className={`w-full flex items-center ${isFinished ? 'justify-between' : 'justify-center'}`}
    >
      {isFinished && (
        <div className="flex flex-col gap-12" >
            <div className="flex flex-col gap-3">
                <h1 className="text-[4rem] leading-[1.4] font-bold">
                    Create&nbsp;personalized <span className='bg-gradient-to-r from-fuchsia-500 to-white bg-clip-text text-transparent'>photos</span>&nbsp;&&nbsp;<span className='text-outline italic'>videos</span><br/>with AI
                </h1>
                <p className="text-xl">
                    Transform your ideas into stunning, custom visuals in seconds.
                </p>
            </div>
          <div className="flex gap-3">
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
            flex-shrink-0
            transition-all duration-700
            rounded-4xl overflow-hidden
            ${isFinished 
                ? 'w-[569px] h-[854px]'
                : 'w-[836px] h-[1244px]' 
            }
        `}
      >
        <NextImage
          src={HEAD_IMAGES[activeIndex]}
          alt={`Slide ${activeIndex + 1}`}
          width={836}
          height={1244}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}
