import { Button, Carousel } from "antd";

import { HighlightedText } from "@/app/shared/ui/highlighted-text";
import Image from "next/image";

export default function LandingPage() {
    return (
        <div className="h-full w-full flex flex-col items-center">
            {/* wrapper */}
            <div className="flex flex-col max-w-[1200px]">
                <section className="flex w-fit mt-24">
                    <div className="flex gap-8 w-fit">
                        {/* left */}
                        <div className="flex flex-col p-16 gap-4 bg-blue-50 rounded-4xl">
                            <h1 className="text-4xl font-bold">Create <HighlightedText>realistic and beatutiful photos</HighlightedText> of yourself</h1>
                            <div className="font-bold text-2xl px-4 py-2 bg-blue-100 w-fit rounded-full">in 2 minutes</div>
                            <p className="text-xl">Upload a photo and get the best and fastest photo shoot of your life with <HighlightedText>ai_love_photo</HighlightedText></p>
                            <Button type="primary" className="rounded-full!" size="large">Try in now</Button>
                        </div>
                        {/* right */}
                        <Carousel className="h-[512px] w-[512px]" autoplay fade>
                            <div className="rounded-3xl overflow-hidden">
                                <Image width={512} height={512} alt="Realistic woman photo" src="/images/landing/section_1.jpeg"/>
                            </div>
                            <div className="rounded-3xl overflow-hidden">
                                <Image width={512} height={512} alt="Realistic woman photo" src="/images/landing/section_2.jpeg"/>
                            </div>
                            <div className="rounded-3xl overflow-hidden">
                                <Image width={512} height={512} alt="Realistic woman photo" src="/images/landing/section_3.jpeg"/>
                            </div>
                        </Carousel>
                    </div>  
                </section>
            </div>
        </div>
    );
}