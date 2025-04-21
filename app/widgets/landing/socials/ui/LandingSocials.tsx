import './styles.scss';

import { TikTokOutlined, InstagramOutlined, TwitterOutlined, YoutubeOutlined, FacebookOutlined } from '@ant-design/icons';
import NextImage from "next/image";
import NextLink from "next/link";

import { Body, H1 } from "@/app/shared/ui/typography";
import { Button } from "@/app/shared/ui/button";

export function LandingSocials() {
    return (
        <section className="flex flex-col-reverse md:flex-row p-8 pb-0 xl:p-16 xl:pb-0 gap-12 border overflow-hidden border-secondary rounded-4xl justify-around items-center w-full">
            <NextImage src="/images/landing/socials/instagram-feed.jpg" alt="Product" width={426} height={783} className="rounded-4xl rounded-b-none" />
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3 md:gap-6 w-full">
                    <H1>
                        See us in action on socials!
                    </H1>
                    <Body>We’re where the AI art revolution happens. Follow for daily inspo, wild photo challenges, and exclusive tools to make your content unstoppable</Body>
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