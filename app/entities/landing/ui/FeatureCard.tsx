import Image from "next/image"


interface FeatureCardProps {
    title: string,
    image_url: string,
    description: string,
}

export function FeatureCard({title, image_url, description} : FeatureCardProps) {
    return (
        <div className="flex flex-col gap-4 bg-blue-50 p-6 pb-0 rounded-4xl relative">
            <h2 className="lg:text-2xl text-xl font-bold">{title}</h2>
            <div className="flex w-full justify-center">
                <Image width={512} height={512} className="rounded-4xl rounded-b-none max-w-[90%]" alt="Feature photo" src={image_url}/>
            </div>
            <div className="flex items-center justify-center px-4 py-3 rounded-3xl bg-indigo-500 absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-[90%] text-center min-h-[72px]">
                <p className="text-lg text-white">{description}</p>
            </div>
        </div>
    )
}