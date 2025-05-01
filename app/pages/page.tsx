"use client";

import { useEffect, useState } from 'react';

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
    <div className="w-full h-full flex items-center justify-center p-6">
      <ContentSection className='w-full h-full sm:rounded-4xl gap-4 lg:gap-8 relative'>
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
          <div className="px-4 sm:px-10 flex flex-col gap-4 lg:gap-8 items-center">
              <GenerationResult
                resultUrl={resultUrl}
                activeModel={activeModel}
                isListeningReadiness={isListeningReadiness}
                isListeningResult={isListeningResult}
              />
              <GenerationForm
                prompt={prompt}
                activeModel={activeModel}
                isSendingGenerationRequest={isSendingGenerationRequest}
                isListeningResult={isListeningResult}
                onPromptChange={setPrompt}
                onSubmit={handleGenerate}
              />
          </div>
      </ContentSection>
    </div>
  );
}