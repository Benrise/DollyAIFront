import './styles.scss';

import { TikTokOutlined, InstagramOutlined, TwitterOutlined, YoutubeOutlined, FacebookOutlined } from '@ant-design/icons';
import NextImage from "next/image";
import NextLink from "next/link";

import { Body, H1 } from "@/app/shared/ui/typography";
import { Button } from "@/app/shared/ui/button";
import { GlowingBlob } from '@/app/shared/ui/glowing-blob';

export function LandingSocials() {
    return (
        <section className="flex flex-col-reverse md:flex-row p-8 pb-0 xl:p-16 xl:pb-0 gap-12 border overflow-hidden border-border rounded-4xl justify-around items-center w-full bg-card">
            <div className="relative rounded-4xl p-4 bg-white rounded-b-none overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="/videos/landing/socials/instagram-feed.mp4" type="video/mp4"/>
                    <NextImage 
                        src="/images/landing/socials/instagram-feed.jpeg" 
                        alt="Product fallback" 
                        width={426} 
                        height={783}
                        className="object-cover"
                    />
                </video>
            </div>
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3 md:gap-6 w-full relative">
                    <H1>
                        See us in action on socials!
                    </H1>
                    <Body>We’re where the AI art revolution happens. Follow for daily inspo, wild photo challenges, and exclusive tools to make your content unstoppable</Body>
                    <GlowingBlob opacity={0.1} className="top-[-100px] left-[-100px]" />
                </div>
                <div className="flex gap-4">
                    <Button size="icon" className='rounded-full' asChild>
                        <NextLink href={"https://instagram.com/"} target="_blank" rel="noreferrer noopener">
                            <InstagramOutlined/>
                        </NextLink>
                    </Button>
                    <Button size="icon" className='rounded-full' asChild>
                        <NextLink href={"https://twitter.com/"} target="_blank" rel="noreferrer noopener">
                            <TwitterOutlined/>
                        </NextLink>
                    </Button>
                    <Button size="icon" className='rounded-full' asChild>
                        <NextLink href={"https://tiktok.com/"} target="_blank" rel="noreferrer noopener">
                            <TikTokOutlined/>
                        </NextLink>
                    </Button>
                    <Button size="icon" className='rounded-full' asChild>
                        <NextLink href={"https://youtube.com/"} target="_blank" rel="noreferrer noopener">
                            <YoutubeOutlined/>
                        </NextLink>
                    </Button>
                    <Button size="icon" className='rounded-full' asChild>
                        <NextLink href={"https://facebook.com/"} target="_blank" rel="noreferrer noopener">
                            <FacebookOutlined/>
                        </NextLink>
                    </Button>
                </div>
            </div>
        </section>
    );
}