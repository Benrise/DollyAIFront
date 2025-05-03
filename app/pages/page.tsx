"use client";

import { useEffect, useState } from 'react';

import { Button } from '@/app/shared/ui/button';
import { MobileHeader } from '@/app/shared/ui/mobile-header';
import { ContentSection } from '@/app/shared/ui/content-section';
import { SubscriptionBadge } from '@/app/entities/subscription/badge';
import { UserBadge, useUserStore } from '@/app/entities/user';
import { type IModel } from '@/app/entities/model';
import { useListenToResultMutation } from '@/app/features/model/create';
import { useListenToReadinessMutation } from '@/app/features/model/create';
import { useGenerateModelMutation } from '@/app/features/model/create';
import { GenerationResult } from '@/app/features/model/result';
import { GenerationForm } from '@/app/features/model/generate';
import { ModelsList, useGetModelsListMutation } from '@/app/widgets/model/list';
import { Sidebar } from '@/app/widgets/sidebar';
import { Menu, User } from 'lucide-react';


export default function Home() {
  const [activeModel, setActiveModel] = useState<IModel | undefined>(undefined);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const { me } = useUserStore();
  const [prompt, setPrompt] = useState("");

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

  const onModelCreated = () => {
    getModelsListMutation(undefined, {
      onSuccess: async () => {
        await me();
      }
    });
  };
  const onGenerate = async (e: React.FormEvent) => {
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
    <div className="w-full h-full flex items-center justify-center sm:p-6">
      <ContentSection className='w-full h-full sm:rounded-4xl gap-4 lg:gap-8 relative flex-col sm:flex-row'>
        {/* Mobile */}
        <MobileHeader 
          title="Create photo" 
          leftComponent={<Menu />} 
          rightComponent={<User />}
          className='sm:hidden'
        />
        {/* Desktop */}
        <Sidebar className='hidden sm:flex' contentComponent={
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((item) => (
                    <div key={item} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">Изображение {item}</span>
                    </div>
                ))}
            </div>
        </div>
        } bottomComponent={<UserBadge />} bottomCollapsedComponent={<Button size={'icon'} variant={'ghost'}><User/></Button>}/>
        <div className="flex flex-col w-full h-full gap-12 justify-center items-center">
          <div className="flex flex-col w-full">
            {/* Mobile */}
            <ModelsList
              className='flex sm:hidden'
              models={models}
              setActiveModel={setActiveModel}
              activeModel={activeModel}
              onModelCreated={onModelCreated}
            />
            {/* Mobile */}
            <SubscriptionBadge className='sm:hidden flex py-3 w-full'/>
          </div>
          <GenerationResult 
              resultUrl={resultUrl}
              activeModel={activeModel}
              isListeningReadiness={isListeningReadiness}
              isListeningResult={isListeningResult}
          />
          <div className="flex flex-col gap-4 w-fit bg-background p-4 rounded-2xl">
            {/* Desktop */}
            <ModelsList
              className='hidden sm:flex'
              models={models}
              setActiveModel={setActiveModel}
              activeModel={activeModel}
              onModelCreated={onModelCreated}
            />
            <GenerationForm
              prompt={prompt}
              isSendingGenerationRequest={isSendingGenerationRequest}
              isListeningResult={isListeningReadiness}
              onPromptChange={(value) => setPrompt(value)}
              onSubmit={onGenerate}
            />
          </div>
        </div>
        {/* Desktop */}
        <SubscriptionBadge className='hidden sm:flex absolute top-6 right-6'/>
      </ContentSection>
    </div>
  );
}