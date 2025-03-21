"use client"

import { Button, Carousel } from "antd";

import { HighlightedText } from "@/app/shared/ui/highlighted-text";
import Image from "next/image";
import { FeatureCard } from "./components";
import { DownloadOutlined, EditOutlined, StarOutlined } from "@ant-design/icons";
import { SubscriptionsList, useGetSubscriptionsListMutation } from "@/app/widgets/subscription/list";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Instagram, Send } from "lucide-react";

export default function LandingPage() {
    const { subscriptions, getSubscriptionsListMutation } = useGetSubscriptionsListMutation();
    const router = useRouter()

    const handleSubscriptionSelect = async () => {
        router.push('/auth/register')
    }

    useEffect(() => {
        getSubscriptionsListMutation();
    }, []);

    return (
        <div className="h-full w-full flex flex-col items-center">
            {/* wrapper */}
            <div className="flex flex-col max-w-[1200px] items-center gap-24 px-4">
                <section className="flex gap-8 w-fit mt-24">
                    {/* left */}
                    <div className="flex flex-col p-16 gap-8 bg-blue-50 rounded-4xl min-w-[60%]">
                        <h1 className="text-4xl font-bold">Create <HighlightedText>realistic and beatutiful photos</HighlightedText> of yourself</h1>
                        <div className="font-bold text-2xl px-4 py-2 bg-blue-100 w-fit rounded-full">in 2 minutes</div>
                        <p className="text-xl">Upload a photo and get the best and fastest photo shoot of your life with <HighlightedText>ai_love_photo</HighlightedText></p>
                        <Button type="primary" href="/auth/login" className="rounded-full! h-[64px]! text-xl!" size="large">Try in now</Button>
                    </div>
                    {/* right */}
                    <Carousel className="h-[512px] w-[512px]" autoplay fade>
                        <div className="rounded-3xl overflow-hidden">
                            <Image width={512} height={512} alt="Realistic woman photo" src="/images/landing/section_1.1.jpeg"/>
                        </div>
                        <div className="rounded-3xl overflow-hidden">
                            <Image width={512} height={512} alt="Realistic woman photo" src="/images/landing/section_1.2.jpeg"/>
                        </div>
                        <div className="rounded-3xl overflow-hidden">
                            <Image width={512} height={512} alt="Realistic woman photo" src="/images/landing/section_1.3.jpeg"/>
                        </div>
                    </Carousel>
                </section>  
                <section className="flex flex-col w-fit gap-8 items-center">
                    {/* header */}
                    <div className="flex flex-col gap-2 items-center">
                        <h2 className="text-4xl font-bold">Make your <HighlightedText>dreams come true!</HighlightedText></h2>
                        <p className="text-xl">No more expensive photo shoots!</p>
                    </div>
                    {/* features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <FeatureCard
                            title="Create unique content"
                            description="Everyone will be shocked by your photos"
                            image_url="/images/landing/section_2.1.jpg"
                        />
                        <FeatureCard
                            title="Realistic photos"
                            description="No one will know it's an AI photo"
                            image_url="/images/landing/section_2.2.jpg"
                        />
                        <FeatureCard
                            title="Save time and money"
                            description="High quality for a minimum resource"
                            image_url="/images/landing/section_2.3.jpg"
                        />
                        <FeatureCard
                            title="The perfect tool for bloggers and creators"
                            description="Stay one step ahead of the competition"
                            image_url="/images/landing/section_2.4.jpg"
                        />
                        <FeatureCard
                            title="It always looks perfect in the frame"
                            description="The perfect angle for everyone"
                            image_url="/images/landing/section_2.5.jpg"
                        />
                         <FeatureCard
                            title="Original gift for friends and family"
                            description="Inpiration in every time"
                            image_url="/images/landing/section_2.6.jpg"
                        />
                    </div>
                    <Button type="primary" href="/auth/login" className="rounded-full! h-[64px]! text-xl! w-full! max-w-[528px]" size="large">Try in now</Button>
                </section>
                <section className="flex w-full bg-blue-50 p-16 rounded-4xl">
                    {/* left */}
                    <div className="flex flex-col w-full items-center gap-8">
                        <h2 className="text-5xl font-bold">
                            <HighlightedText>How does</HighlightedText> it work
                        </h2>
                        <Image
                        width={328}
                        height={700}
                        alt="Also available in telegram"
                        src="/images/landing/section_3.1.png"
                        />
                    </div>

                    {/* right */}
                    <div className="flex flex-col gap-12 justify-center">
                        {/* feature */}
                        <div className="flex items-start relative">
                        <div className="flex-shrink-0 w-16 h-16 p-4 bg-blue-100 rounded-2xl flex items-center justify-center">
                            <DownloadOutlined className="text-3xl text-indigo-500!" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold">Upload 10-15 photos for better generation</h3>
                        </div>
                        <div className="absolute left-8 top-16 h-20 w-0.5 bg-indigo-500"></div>
                        </div>
                        {/* feature */}
                        <div className="flex items-start relative">
                        <div className="flex-shrink-0 w-16 h-16 p-4 bg-blue-100 rounded-2xl flex items-center justify-center">
                            <StarOutlined className="text-3xl text-indigo-500!" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold">You are waiting for your personal neural network to learn</h3>
                        </div>
                        <div className="absolute left-8 top-16 h-20 w-0.5 bg-indigo-500"></div>
                        </div>
                        {/* feature */}
                        <div className="flex items-start relative">
                        <div className="flex-shrink-0 w-16 h-16 p-4 bg-blue-100 rounded-2xl flex items-center justify-center">
                            <EditOutlined className="text-3xl text-indigo-500!" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold">Write any descriptions of the desired photos</h3>
                        </div>
                        </div>
                    </div>
                    </section>
                <section className="flex flex-col w-fit gap-8 items-center">
                    {/* header */}
                    <div className="flex flex-col gap-8 items-center">
                        <h2 className="text-4xl font-bold"><HighlightedText>Compare out plans</HighlightedText> to find what suits you best</h2>
                        <SubscriptionsList subscriptions={subscriptions} onSubscriptionSelect={handleSubscriptionSelect} actionLabel="Select" className='flex md:flex-nowrap flex-wrap gap-4'/>
                    </div>
                </section>
                <footer className="flex flex-col p-16 items-center gap-4">
                    <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold">+1 424 2985059</div>
                        <div className="text-2xl font-bold">ailovephoto.official@gmail.com</div>
                    </div>
                    <div className="flex gap-2">
                        <Button href="https://t.me/ai_love_photo_bot" target="_blank" size="large" type="primary" shape="circle">
                            <Send size={21}/>
                        </Button>
                        <Button href="https://instagram.com/ailovephoto_" target="_blank" size="large" type="primary" shape="circle">
                            <Instagram/>
                        </Button>
                    </div>
                </footer>
            </div>
        </div>
    );
}