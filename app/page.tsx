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
import { LandingHead } from "@/app/widgets/landing/head";

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
            <div className="flex flex-col max-w-[1408px] w-full justify-center items-center gap-24 px-4 p-8">
                <LandingHeader/>
                <LandingHead/>
                <LandingFooter/>
            </div>
        </div>
    );
}