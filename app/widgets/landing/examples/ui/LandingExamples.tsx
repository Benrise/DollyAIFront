
import NextLink from "next/link";
import NextImage from "next/image";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

import { GlowingBlob } from "@/app/shared/ui/glowing-blob";
import { HighlightedText } from "@/app/shared/ui/highlighted-text";
import { Body, H1 } from "@/app/shared/ui/typography";
import { Button } from "@/app/shared/ui/button";
import { MAPPING } from "../constants/mapping";



export function LandingExamples() {
    const prompts = Object.keys(MAPPING);
    const [selectedPrompt, setSelectedPrompt] = useState(prompts[0]);
  
    return (
      <section className="flex flex-col p-8 xl:p-16 gap-6 md:gap-12 border overflow-hidden border-border rounded-4xl justify-around w-full bg-card">
        <div className="flex flex-col gap-3 md:gap-6 relative w-full sm:w-fit">
            <H1 className="lg:text-center xl:text-start">
                Be <HighlightedText>anyone</HighlightedText> with face-swap and AI Avatars
            </H1>
            <GlowingBlob opacity={0.1} className="top-[-120px] left-[-10px]" />
        </div>
        <Button asChild>
            <NextLink href={"/pages/auth/login"} className="w-fit flex font-semibold items-center hover:cursor-pointer">
                Start creating now <ArrowRight className="ml-2 w-fit" />
            </NextLink>
        </Button>
        <div className="flex flex-col md:flex-row w-full justify-between gap-6 xl:gap-32 items-center">
            <div className="flex flex-col gap-6 w-fit max-w-none xl:max-w-[392px]">
                {prompts.map((prompt) => (
                    <Body
                        key={prompt}
                        onClick={() => setSelectedPrompt(prompt)}
                        className={`cursor-pointer transition-opacity ${
                            selectedPrompt === prompt ? "opacity-100" : "opacity-50 hover:opacity-90"
                        }`}
                        >
                        {prompt}
                    </Body>
                ))}
            </div>
            <div className="relative flex items-center w-fit">
                <div className="flex">
                    <NextImage
                    src={MAPPING[selectedPrompt][0]}
                    alt="Main image"
                    width={445}
                    height={594}
                    className="rounded-2xl xl:rounded-4xl object-cover shadow-lg border border-gray-700 z-3"
                    />
                </div>
                <div className="flex ml-[-120px] sm:ml-[-160px]">
                    <NextImage
                    src={MAPPING[selectedPrompt][1]}
                    alt="Secondary image"
                    width={340}
                    height={453}
                    className="rounded-2xl xl:rounded-4xl object-cover shadow-lg border border-gray-700 z-2"
                    />
                </div>
                <div className="hidden lg:flex ml-[-140px]">
                    <NextImage
                    src={MAPPING[selectedPrompt][2]}
                    alt="Tertiary image"
                    width={265}
                    height={353}
                    className="rounded-2xl xl:rounded-4xl object-cover shadow-lg border border-gray-700 z-1"
                    />
                </div>
            </div>
        </div>
      </section>
    );
  }