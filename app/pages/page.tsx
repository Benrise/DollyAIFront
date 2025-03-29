"use client";

import { useEffect, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Form, Button, Input, Typography, Image, Tooltip } from 'antd';

import { ChevronDown } from 'lucide-react'
import { DownloadOutlined } from '@ant-design/icons';

import { downloadBlob } from '@/app/shared/utils/download';
import { useMobileDetect } from '@/app/shared/lib';
import { ContentSection } from '@/app/shared/ui/content-section';
import { GeneratingAnimation } from '@/app/shared/ui/generation-animation';
import { SubscriptionBadge } from '@/app/entities/subscription/badge';
import { UserBadge, useUserStore } from '@/app/entities/user';
import { IModelResult, type IModel } from '@/app/entities/model';
import { useGetResultMatchesListMutation, useListenToResultMutation } from '@/app/features/model/create';
import { useListenToReadinessMutation } from '@/app/features/model/create';
import { useGenerateModelMutation } from '@/app/features/model/create';
import { ModelsList, useGetModelsListMutation } from '@/app/widgets/model/list';
import { ProductsList } from '@/app/widgets/product/list';
import { modelMatchesToProductsMapping } from '@/app/widgets/product/list/model';

const { Text } = Typography;

export default function Home() {
  const [ parent ] = useAutoAnimate();
  const [ activeModel, setActiveModel ] = useState<IModel | undefined>(undefined);
  const [ result, setResult ] = useState<IModelResult | null>(null);
  const { me } = useUserStore();
  const [ form ] = Form.useForm();
  const [ isTextAreaFocused, setIsTextAreaFocused ] = useState(false);
  const { isMobile } = useMobileDetect();

  const { models, getModelsListMutation } = useGetModelsListMutation(setActiveModel);
  const { matches, getResultMatchesListMutation } = useGetResultMatchesListMutation();
  const { generateModelMutation, isSendingGenerationRequest } = useGenerateModelMutation(() => {
    if (activeModel) {
      listenResultMutation(activeModel.id);
    }
  });
  const { listenResultMutation, isListeningResult } = useListenToResultMutation((response) => {
    setResult(response);
    if (activeModel && response) {
      getResultMatchesListMutation({ model_id: activeModel.id, result_id: response.id });
    }
    form.resetFields();
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
  const handleGenerate = async (values: { prompt: string }) => {
    if (activeModel) {
      setResult(null); 
      generateModelMutation({ model_id: activeModel.id, prompt: values.prompt }, {
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
      setResult(null);
      form.resetFields();

      if (activeModel.is_ready) {
        listenResultMutation(activeModel.id);
      } else {
        listenReadinessMutation(activeModel.id);
      }
    }
  }, [activeModel, listenResultMutation, listenReadinessMutation, form]);

  return (
    <ContentSection className='sm:max-w-lg sm:rounded-4xl sm:min-w-lg'>
      <div className="flex flex-col gap-4 lg:gap-8 relative overflow-y-auto w-full">
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
        <div ref={parent} className="px-4 sm:px-10 pb-4 sm:pb-10 flex flex-col gap-4 lg:gap-8 items-center">
            { !isTextAreaFocused ? <div ref={parent} className={`flex flex-col rounded-[24px] overflow-hidden max-w-[512px] items-center justify-center relative`}>
                {!isListeningReadiness && isListeningResult && activeModel?.is_ready ? (
                  <GeneratingAnimation />
                ) : (
                  <Image 
                    src={
                      result && result.result_url 
                        ? result.result_url 
                        : activeModel && !activeModel.is_ready
                        ? '/images/etc/silky-waves.png' 
                        : '/images/etc/magnify.png'
                    }
                    alt={
                      result && result.result_url 
                        ? "Generation result" 
                        : activeModel && !activeModel.is_ready 
                        ? "Model is training" 
                        : "No generations"
                    }
                    className="select-none aspect-square object-cover object-top relative"
                    fallback='' 
                    preview={!!(result && result.result_url)} 
                  />
                )}
                {result && (
                    <Button 
                      type='default' 
                      size="large" 
                      className='absolute! right-[16px] top-[16px] opacity-70 hover:opacity-100' 
                      icon={<DownloadOutlined/>} 
                      onClick={() => handleDownload(result.result_url)} disabled={!result.result_url}
                    />
                  )
                }
                <div className="flex w-full justify-center">
                  <Text className="align-middle w-fit text-[14px]!" type="secondary">
                    {isListeningResult
                      ? "Generating..."
                      : result && result.result_url
                      ? ""
                      : activeModel && !activeModel.is_ready
                      ? "Model is training, this may take some time"
                      : "You haven’t generated any photos yet"}
                  </Text>
                </div>
                      
            </div> : (
              <Button onClick={handleBlur} type="default" size='large' className="bg-gray-50!" block>
                  <ChevronDown/>
              </Button>
            )}
          <Form form={form} onFinish={handleGenerate} className="px-4 sm:px-10 flex flex-col gap-4 w-full">
            <Form.Item className='mb-0!' name="prompt" rules={[{ required: true, message: 'Enter a prompt' }]}>
              <Input.TextArea
                onClick={handleFocus} 
                disabled={!!activeModel && !activeModel.is_ready || isListeningResult}
                placeholder="Imagine me as an astronaut in outer space"
                style={{ height: 80, resize: "none" }}
              />
            </Form.Item>
            {
              activeModel && !activeModel.is_ready ? (
                <Tooltip trigger={"click"} title="Model is training. Please wait. Often it takes a while (up to 3 hours).">
                  <Button type="primary" size="large" htmlType="reset" ghost block>
                    Generate
                  </Button>
                </Tooltip>
              ) : (
                <Button 
                  onClick={handleBlur} 
                  disabled={!activeModel} 
                  loading={isSendingGenerationRequest || isListeningResult} 
                  type="primary" 
                  size="large" 
                  htmlType="submit" 
                  block
                >
                  Generate
                </Button>
              )
            }
          </Form>
          <ProductsList products={modelMatchesToProductsMapping(matches)}/>
        </div>
      </div>
    </ContentSection>
  );
}
