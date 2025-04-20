"use client"
import { useAutoAnimate } from "@formkit/auto-animate/react";
import NextImage from "next/image"
import { Download, Pencil, Sparkles } from "lucide-react";
import { useState } from "react";
import { Avatar } from "antd";

import { MODELS, RESULT_IMAGE_DEFAULT, RESULT_IMAGE_MOCK } from "../constants";
import { Textarea } from "@/app/shared/ui/textarea"
import { GeneratingAnimation } from "@/app/shared/ui/generation-animation";
import { Button } from "@/app/shared/ui/button";
import { HighlightedText } from "@/app/shared/ui/highlighted-text";
import { GlowingBlob } from "@/app/shared/ui/glowing-blob";


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
        <section className="flex px-32 py-16 border border-secondary rounded-4xl lg:flex-row flex-col-reverse justify-between w-full items-center">
            {/* left */}
            <div className="w-full flex flex-col gap-4 max-w-[456px]">
                <div ref={parent} className="relative w-full aspect-square max-w-[456px] overflow-hidden rounded-4xl">
                    {isGenerating ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <GeneratingAnimation/>
                        </div>
                    ) : generatedImage ? (
                        <NextImage
                            alt="Generated photo"
                            src={generatedImage}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <NextImage
                            alt="Example photo"
                            src={RESULT_IMAGE_DEFAULT}
                            fill
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
                <Button size={"lg"} onClick={handleGenerate} isLoading={isGenerating}>
                    Generate
                </Button>
            </div>
            {/* right */}
            <div className="flex flex-col gap-12 relative">
                <h2 className="text-[3rem] leading-[1.2] font-medium"><HighlightedText>Personalized</HighlightedText><br/>AI-powered generations</h2>
                <div className="flex flex-col gap-12 justify-center w-full">
                    {/* step */}
                    <div className="flex items-center relative">
                        <Download className="text-3xl text-primary" />
                        <div className="ml-4">
                            <h3 className="text-lg">Upload 10+ photos for better generation</h3>
                        </div>
                        <div className="absolute left-2.5 top-9 h-8 w-0.5 bg-primary"></div>
                    </div>
                    {/* step */}
                    <div className="flex items-center relative">
                        <Sparkles className="text-3xl text-primary" />
                        <div className="ml-4">
                            <h3 className="text-lg">Wait for your personal AI model to learn</h3>
                        </div>
                        <div className="absolute left-2.5 top-9 h-8 w-0.5 bg-primary"></div>
                        </div>
                    {/* step */}
                    <div className="flex items-center relative">
                        <Pencil className="text-3xl text-primary"/>
                        <div className="ml-4">
                            <h3 className="text-lg">Generate desired photos using text prompt</h3>
                        </div>
                    </div>
                </div>
                <GlowingBlob opacity={0.2} className="top-[-140px] left-[-50px]"/>
            </div>
    </section>
    )
}