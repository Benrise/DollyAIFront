"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button, Carousel, Image } from "antd";
import { Download, Instagram, Pencil, Send, Sparkles } from "lucide-react";

import { FeatureCard } from "./components";
import { HighlightedText } from "@/app/shared/ui/highlighted-text";
import { SubscriptionsList, useGetSubscriptionsListMutation } from "@/app/widgets/subscription/list";

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
            <div className="flex flex-col max-w-[1200px] w-full items-center gap-24 px-4 p-8 lg:pt-24">
            <section className="flex lg:flex-row flex-col-reverse gap-4 lg:gap-8 w-full items-center px-4 sm:px-0">
                {/* left */}
                <div className="flex flex-col p-8 sm:p-16 gap-4 lg:gap-8 bg-blue-50 rounded-4xl w-full max-w-[600px]">
                    <h1 className="text-3xl sm:text-4xl font-bold">
                        Create <HighlightedText>realistic and beautiful photos</HighlightedText> of yourself
                    </h1>
                    <div className="font-bold text-xl sm:text-2xl px-4 py-2 bg-blue-100 w-fit rounded-full">
                        in 2 minutes
                    </div>
                    <p className="text-lg sm:text-xl">Upload a photo and get the best and fastest photo shoot of your life with{" "}
                        <HighlightedText>ai_love_photo</HighlightedText>
                    </p>
                    <Button
                        type="primary"
                        href="/auth/login"
                        className="rounded-full h-[56px] sm:h-[64px] text-lg w-full sm:w-auto"
                        size="large"
                    >
                        Try it now
                    </Button>
                </div>

                {/* right */}
                <div className="w-full max-w-[512px]">
                    <Carousel autoplay fade className="w-full">
                        <Image
                            preview={false}
                            alt="Realistic woman photo"
                            src="/images/landing/section_1.1.jpeg"
                            className="w-full h-full object-cover rounded-3xl"
                        />
                        <Image
                            preview={false}
                            alt="Realistic woman photo"
                            src="/images/landing/section_1.2.jpeg"
                            className="w-full h-full object-cover rounded-3xl"
                        />
                        <Image
                            preview={false}
                            alt="Realistic woman photo"
                            src="/images/landing/section_1.3.jpeg"
                            className="w-full h-full object-cover rounded-3xl"
                        />
                    </Carousel>
                </div>
                </section>
                <section className="flex flex-col w-fit gap-4 lg:gap-8 items-center">
                    {/* header */}
                    <div className="flex flex-col gap-2 items-center">
                        <h2 className="text-4xl font-bold text-center">Make your <HighlightedText>dreams come true!</HighlightedText></h2>
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
                    <Button type="primary" href="/auth/login" className="rounded-full! h-[64px]! text-lg! w-full! max-w-[528px]" size="large">Try in now</Button>
                </section>
                <section className="flex lg:flex-row flex-col w-full bg-blue-50 p-8 sm:p-16 rounded-4xl gap-4 lg:gap-8">
                    {/* left */}
                    <div className="flex flex-col w-full items-center gap-8">
                        <h2 className="text-5xl font-bold">
                            <HighlightedText>How does</HighlightedText> it work
                        </h2>
                        <Image
                            alt="Screens app example photos"
                            src="/images/landing/section_3.1.png"
                            preview={false}
                        />
                    </div>
                    {/* right */}
                    <div className="flex flex-col gap-12 justify-center w-full">
                        {/* feature */}
                        <div className="flex items-center relative">
                        <div className="flex-shrink-0 w-16 h-16 p-4 bg-blue-100 rounded-2xl flex items-center justify-center">
                            <Download className="text-3xl text-indigo-500!" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold">Upload 10-15 photos for better generation</h3>
                        </div>
                        <div className="absolute left-8 top-16 h-20 w-0.5 bg-indigo-500"></div>
                        </div>
                        {/* feature */}
                        <div className="flex items-center relative">
                        <div className="flex-shrink-0 w-16 h-16 p-4 bg-blue-100 rounded-2xl flex items-center justify-center">
                            <Sparkles className="text-3xl text-indigo-500!" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold">You are waiting for your personal AI to learn</h3>
                        </div>
                        <div className="absolute left-8 top-16 h-20 w-0.5 bg-indigo-500"></div>
                        </div>
                        {/* feature */}
                        <div className="flex items-center relative">
                        <div className="flex-shrink-0 w-16 h-16 p-4 bg-blue-100 rounded-2xl flex items-center justify-center">
                            <Pencil className="text-3xl text-indigo-500!" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold">Write any descriptions of the desired photos</h3>
                        </div>
                        </div>
                        <Button type="primary" href="/auth/login" className="rounded-full! min-h-[64px]! h-fit! text-lg! w-full max-w-[528px] text-wrap!" size="large">
                            Get the best photo shoot
                        </Button>
                    </div>
                    </section>
                <section className="flex flex-col w-fit gap-8 items-center">
                    {/* header */}
                    <div className="flex flex-col gap-8 items-center">
                        <h2 className="text-4xl font-bold text-center"><HighlightedText>Compare out plans</HighlightedText> to find what suits you best</h2>
                        <SubscriptionsList subscriptions={subscriptions} onSubscriptionSelect={handleSubscriptionSelect} actionLabel="Select" className='flex md:flex-nowrap flex-wrap gap-4'/>
                    </div>
                </section>
                <footer className="bg-blue-50 py-12 rounded-4xl w-full">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col items-center text-center space-y-6">
                        <div className="flex flex-col gap-4">
                            <div className="text-2xl font-bold">+1 424 2985059</div>
                            <div className="text-2xl font-bold">biovitalabinc@gmail.com</div>
                            <div className="text-2xl font-bold">30 N GOULD ST, STE R, SHERIDAN WY 82801</div>
                            <div className="text-lg text-gray-400">BioVia Lab Inc. © 2025. All Rights Reserved.</div>
                        </div>
                        <div className="flex space-x-4">
                            <Button
                                href="https://t.me/ai_love_photo_bot"
                                target="_blank"
                                size="large"
                                type="primary"
                                shape="circle"
                                className="flex items-center justify-center"
                            >
                                <Send />
                            </Button>
                            <Button
                                href="https://instagram.com/ailovephoto_"
                                target="_blank"
                                size="large"
                                type="primary"
                                shape="circle"
                                className="flex items-center justify-center"
                            >
                                <Instagram />
                            </Button>
                        </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}