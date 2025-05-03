"use client";

import { Download } from 'lucide-react';
import { Image } from 'antd';

import { GlowingBlob } from "@/app/shared/ui/glowing-blob";
import { downloadBlob } from '@/app/shared/lib/download';
import { GeneratingAnimation } from '@/app/shared/ui/generation-animation';
import { Button } from '@/app/shared/ui/button';
import { IModel } from '@/app/entities/model';
import { Logo } from '@/app/shared/ui/logo';

interface GenerationResultProps {
    className?: string
    resultUrl: string | null;
    activeModel: IModel | undefined;
    isListeningReadiness: boolean;
    isListeningResult: boolean;
}

export const GenerationResult = ({
  resultUrl,
  activeModel,
  isListeningReadiness,
  isListeningResult,
}: GenerationResultProps) => {
    const handleDownload = (result_url: string | null, name='result.png') => {
        if (result_url) {
            downloadBlob(result_url, name);
        }
    }

    return (
        <div className={`flex flex-col gap-4 rounded-3xl max-w-[512px] items-center justify-center relative`}>
            {isListeningReadiness && isListeningResult && activeModel?.is_ready ? (
                <GeneratingAnimation />
            ) : resultUrl ? (
                <>
                    <Image 
                        src={resultUrl}
                        alt="Generation result"
                        className="select-none aspect-square object-cover object-top relative rounded-3xl"
                        fallback=''
                        preview={true}
                    />
                    <Button 
                        size="icon" 
                        variant={'outline'}
                        className='absolute rounded-lg right-[16px] top-[16px] opacity-80 hover:opacity-100' 
                        onClick={() => handleDownload(resultUrl)}
                    >
                        <Download className="h-4 w-4" />
                    </Button>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center gap-6 p-8 text-center">
                    <div className="text-2xl font-bold">
                        <Logo className='max-h-12'/>
                    </div>
                    <p className="text-lg opacity-50">
                        What are we creating today?
                    </p>
                    <GlowingBlob opacity={1} size={50}/>
                </div>
            )}
        </div>
    );
};