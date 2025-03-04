"use client"

import { Typography, Spin } from "antd";
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { type PropsWithChildren, useState, useEffect } from "react";

import { fetchImages } from '@/app/widgets/auth/wrapper/lib';
import { ExampleGallery } from './ExampleGallery';

interface AuthWrapperProps {
    title: string | React.ReactNode,
    description?: string
    isShowExamples?: boolean
}

const { Title, Paragraph } = Typography;

export function AuthWrapper({ children, title, description, isShowExamples = true }: PropsWithChildren<AuthWrapperProps>) {
    const [parent] = useAutoAnimate();
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        fetchImages().then(setImages);
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen sm:h-full sm:py-2 bg-gray-50">
            <div 
                className="
                    w-full sm:max-w-lg sm:py-10 bg-white rounded-none sm:rounded-4xl 
                    shadow-none sm:shadow-xl sm:shadow-indigo-50 overflow-hidden
                    h-screen sm:h-auto py-16
                "
            >
                {isShowExamples && (
                    <div className="mb-4" ref={parent}>
                        {!images.length ? (
                            <div ref={parent} className='flex justify-center items-center w-full h-full'>
                                <Spin size='large'/>
                            </div>
                        ) : (
                            <ExampleGallery images={images}/>
                        )}
                    </div>
                )}

                <div className="mb-12 px-4 sm:px-10">
                    <Title level={3} className="text-center text-base sm:text-xl">{title}</Title>
                    <Paragraph className="text-center text-sm sm:text-base">
                        {description}
                    </Paragraph>
                </div>

                {children}
            </div>
        </div>
    )
}