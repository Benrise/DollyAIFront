"use client"
import { useRouter } from "next/navigation";
import Image from "next/image"
import { useEffect, useState } from "react";
import { Button, Carousel, Avatar } from "antd";
import { Download, Instagram, Pencil, Send, Sparkles } from "lucide-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { GeneratingAnimation } from '@/app/shared/ui/generation-animation';
import { HighlightedText } from "@/app/shared/ui/highlighted-text";
import { FeatureCard } from "@/app/entities/landing";
import { SubscriptionsList, useGetSubscriptionsListMutation } from "@/app/widgets/subscription/list";
import { useUserContext } from "@/app/providers";

type ResultKey = `${1|2|3}_${1|2|3|4|5|6}`;

export default function LandingPage() {
    const REGISTER_URL = "/pages/auth/register"
    const DEFAULT_RESULT_IMAGE = "/images/landing/section_2.1.png"
    const MODELS = [
        { id: 1, src: "/images/examples/2.jpg" },
        { id: 2, src: "/images/examples/3.jpg" },
        { id: 3, src: "/images/examples/4.jpg" },
    ];
    const CATEGORIES = [
        { id: 1, name: "social media", prompt: "Imagine me in trendy casual wear at a coffee shop, perfect for social media profile" },
        { id: 2, name: "business", prompt: "Imagine me in tailored navy suit in the cabinet, classic mahogany furniture, presidential ambiance" },
        { id: 3, name: "traveling", prompt: "Imagine me with backpack at beautiful mountain viewpoint, adventurous traveler look" },
        { id: 4, name: "art projects", prompt: "Imagine me as a renaissance painting, dramatic lighting, artistic masterpiece" },
        { id: 5, name: "fashion", prompt: "Imagine me on runway wearing high-fashion avant-garde clothing, editorial look" },
        { id: 6, name: "personal use", prompt: "Imagine me smiling naturally in everyday clothes, friendly and approachable" },
    ];
    const RESULTS: Record<ResultKey, string> = {
        "1_1": "/images/generations/1_1.jpg",
        "1_2": "/images/generations/1_2.jpg",
        "1_3": "/images/generations/1_3.jpg",
        "1_4": "/images/generations/1_4.jpg",
        "1_5": "/images/generations/1_5.jpg",
        "1_6": "/images/generations/1_6.jpg",
        "2_1": "/images/generations/2_1.jpg",
        "2_2": "/images/generations/2_2.jpg",
        "2_3": "/images/generations/2_3.jpg",
        "2_4": "/images/generations/2_4.jpg",
        "2_5": "/images/generations/2_5.jpg",
        "2_6": "/images/generations/2_6.jpg",
        "3_1": "/images/generations/3_1.jpg",
        "3_2": "/images/generations/3_2.jpg",
        "3_3": "/images/generations/3_3.jpg",
        "3_4": "/images/generations/3_4.jpg",
        "3_5": "/images/generations/3_5.jpg",
        "3_6": "/images/generations/3_6.jpg",
      };

      const [parent] = useAutoAnimate();
      const [selectedAvatar, setSelectedAvatar] = useState(MODELS[0].id);
      const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].id); 
      const [isGenerating, setIsGenerating] = useState(false);
      const [generatedImage, setGeneratedImage] = useState<string | null>(null);
      const { subscriptions, getSubscriptionsListMutation } = useGetSubscriptionsListMutation();
      const { disableDrawerWatching } = useUserContext();
      const router = useRouter();

    const handleSubscriptionSelect = async () => {
        router.push(REGISTER_URL)
    }
    const getResultImage = (avatarId: number, categoryId: number): string => {
        const key = `${avatarId}_${categoryId}` as ResultKey;
        return RESULTS[key] || DEFAULT_RESULT_IMAGE;
      };

      const handleGenerate = () => {
        setIsGenerating(true);
        
        setTimeout(() => {
            const result = getResultImage(selectedAvatar, selectedCategory);
            setGeneratedImage(result);
            setIsGenerating(false);
        }, 4000);
    };

    const currentPrompt = CATEGORIES.find(c => c.id === selectedCategory)?.prompt || "";

    useEffect(() => {
        disableDrawerWatching();
        getSubscriptionsListMutation();
    }, []);

    return (
        <div className="h-full w-full flex flex-col items-center">
            {/* wrapper */}
            <div className="flex flex-col max-w-[1200px] w-full items-center gap-24 px-4 p-8 lg:pt-24">
                <section className="flex lg:flex-row flex-col-reverse gap-4 lg:gap-8 w-full items-center">
                    {/* left */}
                    <div className="flex flex-col p-8 sm:p-16 gap-4 lg:gap-8 bg-blue-50 rounded-4xl w-full max-w-[600px]">
                        <h1 className="lg:text-4xl text-3xl font-bold">
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
                            href={REGISTER_URL}
                            className="rounded-full! min-h-[64px]! h-fit! text-lg! w-full max-w-[528px]"
                            size="large"
                        >
                            Try it now
                        </Button>
                    </div>

                    {/* right */}
                    <div className="w-full max-w-[512px]">
                        <Carousel autoplay fade className="w-full">
                            <Image
                                alt="Realistic woman photo"
                                src="/images/landing/section_1.1.jpeg"
                                className="w-full h-full object-cover rounded-3xl"
                                width={500}
                                height={500}
                            />
                            <Image
                                alt="Realistic woman photo"
                                src="/images/landing/section_1.2.jpeg"
                                className="w-full h-full object-cover rounded-3xl"
                                width={500}
                                height={500}
                            />
                            <Image
                                alt="Realistic woman photo"
                                src="/images/landing/section_1.3.jpeg"
                                className="w-full h-full object-cover rounded-3xl"
                                width={500}
                                height={500}
                            />
                        </Carousel>
                    </div>
                </section>
                <section className="flex lg:flex-row flex-col gap-4 lg:gap-8 w-full items-center">
                    {/* left */}
                    <div className="w-full flex flex-col gap-4 max-w-[456px]">
                        <div ref={parent} className="relative w-full aspect-square max-w-[456px] overflow-hidden rounded-4xl">
                            {isGenerating ? (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <GeneratingAnimation/>
                                </div>
                            ) : generatedImage ? (
                                <Image
                                    alt="Generated photo"
                                    src={generatedImage}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <Image
                                    alt="Example photo"
                                    src={DEFAULT_RESULT_IMAGE}
                                    fill
                                    className="object-cover"
                                />
                            )}
                        </div>
                        <div className="px-6 py-3 bg-blue-50 text-indigo-500 rounded-2xl">{currentPrompt}</div>
                        <Button type="primary" size="large" shape="round" onClick={handleGenerate} loading={isGenerating} block>Generate</Button>
                    </div>
                    {/* right */}
                    <div className="w-full flex flex-col gap-8 p-8 sm:p-16 bg-blue-50 rounded-4xl h-full justify-center max-w-[600px]">
                        <h2 className="lg:text-4xl text-2xl font-bold text-center"><HighlightedText>Personalized</HighlightedText> AI-powered generations</h2>
                        <div className="flex gap-2 justify-center">
                            {MODELS.map(model => (
                                <Avatar
                                    key={model.id}
                                    size={{ xs: 64, sm: 64, md: 64, lg: 64, xl: 92, xxl: 92 }}
                                    src={model.src}
                                    className={`cursor-pointer transition-all ${
                                        selectedAvatar === model.id ? 'ring-4 ring-fuchsia-500 scale-105' : 'opacity-80 hover:opacity-100'
                                    }`}
                                    onClick={() => setSelectedAvatar(model.id)}
                                />
                            ))}
                        </div>
                        <div className="flex gap-2 flex-wrap justify-center">
                            {CATEGORIES.map(category => (
                                <Button
                                    key={category.id}
                                    type={selectedCategory === category.id ? 'primary' : 'default'}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className="transition-all"
                                    >
                                    {category.name}
                                </Button>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="flex flex-col w-fit gap-4 lg:gap-8 items-center">
                    {/* header */}
                    <div className="flex flex-col gap-2 items-center">
                        <h2 className="lg:text-4xl text-3xl font-bold text-center">Make your <HighlightedText>dreams come true!</HighlightedText></h2>
                        <p className="text-xl">No more expensive photo shoots!</p>
                    </div>
                    {/* features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <FeatureCard
                            title="Create unique content"
                            description="Everyone will be shocked by your photos"
                            image_url="/images/landing/section_3.1.jpg"
                        />
                        <FeatureCard
                            title="Realistic photos"
                            description="No one will know it's an AI photo"
                            image_url="/images/landing/section_3.2.jpg"
                        />
                        <FeatureCard
                            title="Save time and money"
                            description="High quality for a minimum resource"
                            image_url="/images/landing/section_3.3.jpg"
                        />
                        <FeatureCard
                            title="The perfect tool for bloggers and creators"
                            description="Stay one step ahead of the competition"
                            image_url="/images/landing/section_3.4.jpg"
                        />
                        <FeatureCard
                            title="It always looks perfect in the frame"
                            description="The perfect angle for everyone"
                            image_url="/images/landing/section_3.5.jpg"
                        />
                         <FeatureCard
                            title="Original gift for friends and family"
                            description="Inpiration in every time"
                            image_url="/images/landing/section_3.6.jpg"
                        />
                    </div>
                    <Button type="primary" href={REGISTER_URL} className="rounded-full! h-[64px]! text-lg! w-full! max-w-[528px]" size="large">Try in now</Button>
                </section>
                <section className="flex lg:flex-row flex-col w-full bg-blue-50 p-8 sm:p-16 rounded-4xl gap-4 lg:gap-8">
                    {/* left */}
                    <div className="flex flex-col w-full items-center gap-8">
                        <h2 className="lg:text-5xl text-3xl font-bold">
                            <HighlightedText>How does</HighlightedText> it work
                        </h2>
                        <Image
                            alt="Screens app example photos"
                            src="/images/landing/section_4.1.png"
                            width={1152}
                            height={1205}
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
                        <Button type="primary" href={REGISTER_URL} className="rounded-full! min-h-[64px]! h-fit! text-lg! w-full max-w-[528px] text-wrap!" size="large">
                            Get the best photo shoot
                        </Button>
                    </div>
                    </section>
                <section className="flex flex-col w-fit gap-8 items-center">
                    {/* header */}
                    <div className="flex flex-col gap-8 items-center">
                        <h2 className="lg:text-4xl text-3xl font-bold text-center"><HighlightedText>Compare out plans</HighlightedText> to find what suits you best</h2>
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
                            <div className="text-lg text-gray-400">BioVita Lab Inc. © 2025. All Rights Reserved.</div>
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