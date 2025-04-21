import NextImage from "next/image";
import { ShoppingCart, ArrowRight } from "lucide-react";

import { HighlightedText } from "@/app/shared/ui/highlighted-text";
import { Body, H1 } from "@/app/shared/ui/typography";
import { GlowingBlob } from "@/app/shared/ui/glowing-blob";
import { Button } from "@/app/shared/ui/button";


export function LandingFashion() {
    return (
        <div className="flex flex-col gap-6 md:gap-12 w-full">
            <div className="flex flex-col gap-3 md:gap-6 relative w-full sm:w-fit">
                <H1 className="lg:text-center xl:text-start">
                    Recrate fashion photos with <HighlightedText>your identity</HighlightedText>
                </H1>
                <Body>
                    Fit clothing onto AI generated models with patterns and logos preserved
                </Body>
                <GlowingBlob opacity={0.1} className="top-[-100px] right-[-10px]" />
            </div>
            <div className="flex w-full items-center justify-center">
                <div 
                    className="flex flex-col items-center gap-3 md:gap-6 mr-[-100px] relative z-10"
                >
                    <div className=" items-center bg-neutral-900 rounded-2xl lg:rounded-4xl relative">
                        <NextImage 
                            src="/images/landing/fashion/cloth.png" 
                            alt="Product" 
                            width={372} 
                            height={372}
                        />
                        <ShoppingCart className="hidden md:block absolute top-6 right-6"/>
                    </div>
                    <Button size={"lg"}>Try for me <ArrowRight className="ml-2"/></Button>
                </div>
                <NextImage 
                    src="/images/landing/fashion/model.jpg" 
                    alt="Product" 
                    width={570} 
                    height={760} 
                    className="rounded-2xl lg:rounded-4xl z-0" 
                />
            </div>
      </div>
    )
}