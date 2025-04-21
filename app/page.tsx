"use client"
import { useEffect } from "react";

import { useUserContext } from "@/app/providers";
import { LandingHeader } from "@/app/widgets/landing/header";
import { LandingFooter } from "@/app/widgets/landing/footer";
import { LandingHead } from "@/app/widgets/landing/head";
import { LandingDemo } from "@/app/widgets/landing/demo";

export default function LandingPage() {
        const { disableDrawerWatching } = useUserContext();

        useEffect(() => {
            disableDrawerWatching();
        }, []);

        return (
            <div className="h-full w-full flex flex-col items-center">
                <div className="flex flex-col max-w-[1408px] w-full justify-center items-center gap-24 px-8 p-8">
                    <LandingHeader/>
                    <LandingHead/>
                    <LandingDemo/>
                    <LandingFooter/>
                </div>
            </div>
        );
}