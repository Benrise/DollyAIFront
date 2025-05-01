"use client";

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Download } from 'lucide-react';
import { Image } from 'antd';

import { downloadBlob } from '@/app/shared/lib/download';
import { GeneratingAnimation } from '@/app/shared/ui/generation-animation';
import { Button } from '@/app/shared/ui/button';
import { IModel } from '@/app/entities/model';


interface GenerationResultProps {
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
    const [parent] = useAutoAnimate();

    const handleDownload = (result_url: string | null, name='result.png') => {
        if (result_url) {
            downloadBlob(result_url, name);
        }
    }

    return (
        <div ref={parent} className={`flex flex-col gap-4 rounded-3xl overflow-hidden max-w-[512px] items-center justify-center relative`}>
            {!isListeningReadiness && isListeningResult && activeModel?.is_ready ? (
                <GeneratingAnimation />
            ) : (
                <Image 
                src={
                    resultUrl 
                    ? resultUrl 
                    : activeModel && !activeModel.is_ready
                    ? '/images/etc/silky-waves.png' 
                    : '/images/landing/demo/default.jpg'
                }
                alt={
                    resultUrl 
                    ? "Generation result" 
                    : activeModel && !activeModel.is_ready 
                    ? "Model is training" 
                    : "No generations"
                }
                className="select-none aspect-square object-cover object-top relative rounded-3xl"
                fallback=''
                preview={!!resultUrl}
                />
            )}
            {resultUrl && (
                <Button 
                size="icon" 
                variant={'outline'}
                className='absolute rounded-lg right-[16px] top-[16px] opacity-80 hover:opacity-100' 
                onClick={() => handleDownload(resultUrl)}
                >
                <Download className="h-4 w-4" />
                </Button>
            )}
            <div className="flex w-full justify-center">
                <div className="align-middle w-fit text-sm opacity-50">
                {isListeningResult
                    ? "Generating..."
                    : resultUrl
                    ? ""
                    : activeModel && !activeModel.is_ready
                    ? "Model is training, this may take some time"
                    : "You haven't generated any photos yet"}
                </div>
            </div>
        </div>
  );
};