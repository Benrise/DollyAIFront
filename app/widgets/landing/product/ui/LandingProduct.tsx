import NextImage from "next/image";

import { Button } from "@/app/shared/ui/button";
import { H1 } from "@/app/shared/ui/typography";
import { PRODUCT_CATEGORIES, PRODUCT_IMAGES } from "../constants";


export function LandingProduct() {
    return (
        <div 
        className="flex flex-col gap-6 md:gap-12 w-full"
      >
        <H1>AI photoshoot of your product</H1>
        <div className="flex overflow-x-auto max-w-full gap-2">
            {PRODUCT_CATEGORIES.map((category, index) => (
                <Button variant={"outline"} key={index} className={`${!index && "border-primary! text-primary!"} bg-transparent! rounded-full`} size={"lg"}>
                    {category}
                </Button>
            ))}
        </div>
        <div className="flex gap-6 overflow-x-auto max-w-full">
            {PRODUCT_IMAGES.map((image, index) => (
                <NextImage src={image} alt="Product" width={368} height={368} key={index} className="rounded-2xl" />
            ))}
        </div>
      </div>
    )
}