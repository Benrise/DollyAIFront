"use client";

import { useEffect, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ChevronDown, Download, Lightbulb  } from 'lucide-react';
import { Image } from 'antd';

import { downloadBlob } from '@/app/shared/lib/download';
import { useMobileDetect } from '@/app/shared/hooks';
import { ContentSection } from '@/app/shared/ui/content-section';
import { GeneratingAnimation } from '@/app/shared/ui/generation-animation';
import { SubscriptionBadge } from '@/app/entities/subscription/badge';
import { UserBadge, useUserStore } from '@/app/entities/user';
import { type IModel } from '@/app/entities/model';
import { Button } from '@/app/shared/ui/button';
import { ModelsList, useGetModelsListMutation } from '@/app/widgets/model/list';
import { useListenToResultMutation } from '@/app/features/model/create';
import { useListenToReadinessMutation } from '@/app/features/model/create';
import { useGenerateModelMutation } from '@/app/features/model/create';
import { Textarea } from '@/app/shared/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/shared/ui/tooltip';

export default function Home() {
  const [parent] = useAutoAnimate();
  const [activeModel, setActiveModel] = useState<IModel | undefined>(undefined);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const { me } = useUserStore();
  const [prompt, setPrompt] = useState("");
  const [isTextAreaFocused, setIsTextAreaFocused] = useState(false);
  const { isMobile } = useMobileDetect();

  const { models, getModelsListMutation } = useGetModelsListMutation(setActiveModel);
  const { generateModelMutation, isSendingGenerationRequest } = useGenerateModelMutation(() => {
    if (activeModel) {
      listenResultMutation(activeModel.id);
    }
  });
  const { listenResultMutation, isListeningResult } = useListenToResultMutation((url) => {
    setResultUrl(url)
    setPrompt("");
  });
  const { listenReadinessMutation, isListeningReadiness } = useListenToReadinessMutation((model_id) => {
    listenResultMutation(model_id)
  });

  const handleModelCreated = () => {
    getModelsListMutation(undefined, {
      onSuccess: async () => {
        await me();
      }
    });
  };
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeModel && prompt.trim()) {
      setResultUrl(null); 
      generateModelMutation({ model_id: activeModel.id, prompt }, {
        onSuccess: async () => {
          await me();
        }
      });
    }
  };
  const handleDownload = (result_url: string | null, name='result.png') => {
    if (result_url) {
      downloadBlob(result_url, name);
    }
  }
  const handleFocus = () => setIsTextAreaFocused(isMobile && true);
  const handleBlur = () => setIsTextAreaFocused(isMobile && false);

  useEffect(() => {
    getModelsListMutation();
  }, []);
  useEffect(() => {
    if (activeModel) {
      setResultUrl(null);
      setPrompt("");

      if (activeModel.is_ready) {
        listenResultMutation(activeModel.id);
      } else {
        listenReadinessMutation(activeModel.id);
      }
    }
  }, [activeModel, listenResultMutation, listenReadinessMutation]);

  return (
    <ContentSection className='sm:max-w-lg sm:rounded-4xl sm:min-w-lg max-h-none md:max-h-[90vh]'>
      <div className="flex flex-col gap-4 lg:gap-8 relative w-full">
        <UserBadge/>
        <div className='flex flex-col gap-2 '>
            <ModelsList
              models={models}
              setActiveModel={setActiveModel}
              activeModel={activeModel}
              onModelCreated={handleModelCreated}
            />
            <SubscriptionBadge/>
        </div>
        <div ref={parent} className="px-4 sm:px-10 flex flex-col gap-4 lg:gap-8 items-center">
            {!isTextAreaFocused ? (
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
            ) : (
              <Button onClick={handleBlur} variant='secondary' size='lg' className="w-full">
                  <ChevronDown className="h-4 w-4" />
              </Button>
            )}
          <form onSubmit={handleGenerate} className="flex flex-col gap-4 w-full">
          <div className="grid w-full gap-1.5 relative">
              <Textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onClick={handleFocus}
                disabled={!activeModel || !activeModel.is_ready || isSendingGenerationRequest || isListeningResult}
                placeholder="Imagine me in Paris with the Eiffel Tower in the background"
                className="min-h-[80px] pr-10"
              />
              
              <div className="absolute right-3 top-3">
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-primary">
                        <Lightbulb className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left" align="end" className="max-w-[300px]">
                      <p>The more detailed your description, the better the result will be</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            {activeModel && !activeModel.is_ready ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button disabled size="lg" className='w-full'>
                      Generate
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Model is training. Please wait. Often it takes a while (up to 3 hours).</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <Button 
                onClick={handleBlur} 
                disabled={!activeModel || isSendingGenerationRequest || isListeningResult} 
                isLoading={isSendingGenerationRequest || isListeningResult} 
                className='w-full' 
                size="lg"
                type="submit"
              >
                Generate
              </Button>
            )}
          </form>
        </div>
      </div>
    </ContentSection>
  );
}