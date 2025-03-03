"use client"

import { Typography, Spin } from "antd";
import { type PropsWithChildren, useState, useEffect } from "react";
import { fetchImages } from '@/app/widgets/auth/wrapper/lib';

import { ExampleGallery } from './ExampleGallery';

interface AuthWrapperProps {
    title: string | React.ReactNode,
    description?: string
    isShowExamples?: boolean
    isShowSocials?: boolean
}

const { Title, Paragraph } = Typography;

export function AuthWrapper({ children, title, description, isShowExamples = true, isShowSocials = false }: PropsWithChildren<AuthWrapperProps>) {

    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        fetchImages().then(setImages);
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
            <div className="max-w-lg w-full py-10 bg-white rounded-4xl shadow-lg shadow-indigo-50 overflow-hidden">
                <Title level={1} className="text-center mb-6">AI Love Photo</Title>
                {isShowExamples && (
                    <div className="mb-6">
                        {!images.length ? (
                            <div className='flex justify-center items-center w-full h-full'>
                                <Spin size='large'/>
                            </div>
                        ):(
                            <ExampleGallery images={images}/>
                        )}
                    </div>
                )}
                <div className="mb-6 px-10">
                    <Title level={4} className="text-center">{title}</Title>
                    <Paragraph className="text-center">
                        {description}
                    </Paragraph>
                </div>
                {children}
            </div>
        </div>
    )
}