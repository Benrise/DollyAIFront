"use client"
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Download, Pencil, Sparkles } from "lucide-react";
import { useState } from "react";
import { Avatar, Image } from "antd";

import { MODELS, RESULT_IMAGE_DEFAULT, RESULT_IMAGE_MOCK } from "../constants";
import { Textarea } from "@/app/shared/ui/textarea"
import { GeneratingAnimation } from "@/app/shared/ui/generation-animation";
import { Button } from "@/app/shared/ui/button";
import { HighlightedText } from "@/app/shared/ui/highlighted-text";
import { GlowingBlob } from "@/app/shared/ui/glowing-blob";
import { Body, H1 } from "@/app/shared/ui/typography";


export function LandingDemo() {
    const [parent] = useAutoAnimate();
    const [selectedAvatar, setSelectedAvatar] = useState(MODELS[1].id);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);

    const handleGenerate = () => {
        setIsGenerating(true);
        
        setTimeout(() => {
            const result = RESULT_IMAGE_MOCK;
            setGeneratedImage(result);
            setIsGenerating(false);
        }, 4000);
    };

    return (
        <section className="flex p-8 md:p-12 xl:px-24 xl:py-16 gap-6 md:gap-12 border overflow-hidden border-secondary rounded-4xl lg:flex-row flex-col-reverse justify-around w-full items-center">
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
                            preview={false}
                            src={generatedImage}
                            className="object-cover"
                        />
                    ) : (
                        <Image
                            alt="Example photo"
                            preview={false}
                            src={RESULT_IMAGE_DEFAULT}
                            className="object-cover"
                        />
                    )}
                </div>
                <div className="flex gap-4 justify-center">
                    {MODELS.map(model => (
                        <Avatar
                            key={model.id}
                            size={{ xs: 64, sm: 64, md: 64, lg: 64, xl: 72, xxl: 72 }}
                            src={model.src}
                            className={`cursor-pointer transition-all ${
                                selectedAvatar === model.id ? 'ring-2 ring-fuchsia-500 scale-105' : 'opacity-80 hover:opacity-100'
                            }`}
                            onClick={() => setSelectedAvatar(model.id)}
                        />
                    ))}
                </div>
                <Textarea className="px-6 py-3 rounded-2xl resize-none h-[96px] max-h-24px" placeholder="Enter prompt"/>
                <Button size={"lg"} onClick={handleGenerate} isLoading={isGenerating} className="w-full">
                    Generate
                </Button>
            </div>
            {/* right */}
            <div className="flex flex-col gap-6 md:gap-12 relative w-full sm:w-fit">
                <H1 className="lg:text-center xl:text-start"><HighlightedText>Personalized</HighlightedText><br/>AI-powered generations</H1>
                <div className="flex flex-col gap-6 sm:gap-12 justify-center w-full">
                    {/* step */}
                    <div className="flex items-center relative">
                        <Download className="min-w-6 text-3xl text-primary" />
                        <div className="ml-4">
                            <Body className="sm:text-nowrap">Upload 10+ photos for better generation</Body>
                        </div>
                        <div className="hidden sm:block absolute left-2.5 top-9 h-8 w-0.5 bg-primary"></div>
                    </div>
                    {/* step */}
                    <div className="flex items-center relative">
                        <Sparkles className="min-w-6 text-3xl text-primary" />
                        <div className="ml-4">
                            <Body className="sm:text-nowrap">Wait for your personal AI model to learn</Body>
                        </div>
                        <div className="hidden sm:block absolute left-2.5 top-9 h-8 w-0.5 bg-primary"></div>
                        </div>
                    {/* step */}
                    <div className="flex items-center relative">
                        <Pencil className="min-w-6 text-3xl text-primary"/>
                        <div className="ml-4">
                            <Body className="sm:text-nowrap">Generate desired photos using text prompt</Body>
                        </div>
                    </div>
                </div>
                <GlowingBlob opacity={0.1} className="top-[-140px] left-[-50px]"/>
            </div>
        </section>
    )
}