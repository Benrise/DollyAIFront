import { Image } from "antd";


interface FeatureCardProps {
    title: string,
    image_url: string,
    description: string,
}

export function FeatureCard({title, image_url, description} : FeatureCardProps) {
    return (
        <div className="flex flex-col gap-4 bg-blue-50 p-6 rounded-4xl relative">
            <h2 className="text-2xl font-bold">{title}</h2>
            <div className="rounded-4xl overflow-hidden">
                <Image preview={false} src={image_url}/>
            </div>
            <div className="flex items-center justify-center px-4 py-3 rounded-3xl bg-indigo-500 absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-[90%] text-center min-h-[72px]">
                <p className="text-lg text-white">{description}</p>
            </div>
        </div>
    )
}