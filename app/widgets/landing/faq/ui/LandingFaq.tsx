import NextLink from "next/link";


import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/app/shared/ui/accordion"
import { Button } from "@/app/shared/ui/button";
import { GlowingBlob } from "@/app/shared/ui/glowing-blob";
import { Body, H1 } from "@/app/shared/ui/typography";

export function LandingFaq() {
    return (
        <div className="flex flex-col p-8 gap-6 relative w-full sm:w-fit">
            <div className="flex flex-col gap-3 md:gap-6 w-full">
                <H1 className="lg:text-center xl:text-start">
                    FAQ
                </H1>
                <Body>
                    Our platform let’s you create hyper-realistic photos and videos of people. Whether you’re just getting started or looing to fine-tune you process, this guide walks you through the platform and answers the most common user questions.
                </Body>
            </div>
            <GlowingBlob opacity={0.1} className="top-[0px] left-[-100px]" />
            <Button asChild>
                <NextLink href="/pages/auth/login">
                    Get started now
                </NextLink>
            </Button>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>How does your product work?</AccordionTrigger>
                    <AccordionContent className="opacity-50">
                        You upload 10 of your photos, which serve as a basis for training our AI. 
                        It is desirable that there be less clothing. Also, you need a full-length photo 
                        and more selfies. Then you write a prompt, and our algorithm generates realistic 
                        and high-quality images.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>
                        What are the benefits of using AI to create photo shoots?
                    </AccordionTrigger>
                    <AccordionContent className="opacity-50">
                        Saving time and money: no need to hire a photographer or rent a studio.
                        Flexibility: you can choose different styles, backgrounds, and images.
                        Convenience: everything is done online, without the need for a physical presence.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>
                        What images do I need to upload to get started?
                    </AccordionTrigger>
                    <AccordionContent className="opacity-50">
                        You need to upload 10 clear photos, preferably with different angles and facial expressions. 
                        This helps the AI better understand your features and create more realistic images. 
                        Also, a full-length photo. Preferably a photo with less clothing. More selfies.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>
                        How long does it take to create one photo shoot?
                    </AccordionTrigger>
                    <AccordionContent className="opacity-50">1 minute</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger>How long does it take to train?</AccordionTrigger>
                    <AccordionContent className="opacity-50">2-3 hours</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                    <AccordionTrigger>
                        Is it possible to edit images after they are created?
                    </AccordionTrigger>
                    <AccordionContent className="opacity-50">
                        No, it is not possible, you can regenerate photos
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}