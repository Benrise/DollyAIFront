"use client"
import { useEffect } from "react";

import { useUserContext } from "@/app/providers";
import { LandingHeader } from "@/app/widgets/landing/header";
import { LandingFooter } from "@/app/widgets/landing/footer";
import { LandingHead } from "@/app/widgets/landing/head";
import { LandingDemo } from "@/app/widgets/landing/demo";
import { LandingGallery } from "@/app/widgets/landing/gallery";
import { LandingProduct } from "@/app/widgets/landing/product";
import { LandingExamples } from "@/app/widgets/landing/examples";
import { LandingFashion } from "@/app/widgets/landing/fashion";
import { LandingSocials } from "@/app/widgets/landing/socials";
import { LandingFaq } from "@/app/widgets/landing/faq";
import { LandingPricing } from "@/app/widgets/landing/pricing";


export default function LandingPage() {
        const { disableDrawerWatching } = useUserContext();

        useEffect(() => {
            disableDrawerWatching();
        }, []);

        return (
            <div className="h-full w-full flex flex-col items-center">
                <div className="flex flex-col max-w-[1408px] w-full justify-center items-center gap-16 xl:gap-24  px-8 p-8">
                    <LandingHeader/>
                    <LandingHead/>
                    <LandingDemo/>
                    <LandingGallery/>
                    <LandingProduct/>
                    <LandingExamples/>
                    <LandingFashion/>
                    <LandingPricing/>
                    <LandingSocials/>
                    <LandingFaq/>
                    <LandingFooter/>
                </div>
            </div>
        );
}