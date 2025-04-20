"use client"
import { useRouter } from "next/navigation";
import Image from "next/image"
import { useEffect, useState } from "react";
import { Button, Carousel, Avatar } from "antd";
import { Download, Instagram, Pencil, Send, Sparkles } from "lucide-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { ThemeToggle } from "@/app/shared/ui/theme-toggle";
import { GeneratingAnimation } from '@/app/shared/ui/generation-animation';
import { HighlightedText } from "@/app/shared/ui/highlighted-text";
import { FeatureCard } from "@/app/entities/landing";
import { SubscriptionsList, useGetSubscriptionsListMutation } from "@/app/widgets/subscription/list";
import { useUserContext } from "@/app/providers";
import { LandingHeader } from "@/app/widgets/landing/header";
import { LandingFooter } from "@/app/widgets/landing/footer";

export default function LandingPage() {
    const REGISTER_URL = "/pages/auth/register"

    const { subscriptions, getSubscriptionsListMutation } = useGetSubscriptionsListMutation();
    const { disableDrawerWatching } = useUserContext();
    const router = useRouter();

    const handleSubscriptionSelect = async () => {
        router.push(REGISTER_URL)
    }

    useEffect(() => {
        disableDrawerWatching();
        getSubscriptionsListMutation();
    }, []);

    return (
        <div className="h-full w-full flex flex-col items-center">
            {/* wrapper */}
            <div className="flex flex-col max-w-[1200px] w-full items-center gap-24 px-4 p-8 lg:pt-24">
                <LandingHeader/>
                <section className="flex lg:flex-row flex-col-reverse gap-4 lg:gap-8 w-full items-center">

                </section>
                <section className="flex lg:flex-row flex-col gap-4 lg:gap-8 w-full items-center">

                </section>
                <section className="flex flex-col w-fit gap-4 lg:gap-8 items-center">

                </section>
                <section className="flex lg:flex-row flex-col w-full bg-blue-50 p-8 sm:p-16 rounded-4xl gap-4 lg:gap-8">

                </section>
                <section className="flex flex-col w-fit gap-8 items-center">
                    {/* header */}
                    <div className="flex flex-col gap-8 items-center">
                        <h2 className="lg:text-4xl text-3xl font-bold text-center"><HighlightedText>Compare out plans</HighlightedText> to find what suits you best</h2>
                        <SubscriptionsList subscriptions={subscriptions} onSubscriptionSelect={handleSubscriptionSelect} actionLabel="Select" className='flex md:flex-nowrap flex-wrap gap-4'/>
                    </div>
                </section>
                <footer className="bg-blue-50 py-12 rounded-4xl w-full">

                </footer>
                <LandingFooter/>
            </div>
        </div>
    );
}