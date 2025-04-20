"use client";

import { useEffect, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Form, Button, Input, Typography, Image, Tooltip } from 'antd';

import { ChevronDown } from 'lucide-react'
import { DownloadOutlined } from '@ant-design/icons';

import { downloadBlob } from '@/app/shared/lib/download';
import { useMobileDetect } from '@/app/shared/hooks';
import { ContentSection } from '@/app/shared/ui/content-section';
import { GeneratingAnimation } from '@/app/shared/ui/generation-animation';
import { SubscriptionBadge } from '@/app/entities/subscription/badge';
import { UserBadge, useUserStore } from '@/app/entities/user';
import { type IModel } from '@/app/entities/model';
import { ModelsList, useGetModelsListMutation } from '@/app/widgets/model/list';
import { useListenToResultMutation } from '@/app/features/model/create';
import { useListenToReadinessMutation } from '@/app/features/model/create';
import { useGenerateModelMutation } from '@/app/features/model/create';

const { Text } = Typography;

export default function Home() {
  const [ parent ] = useAutoAnimate();
  const [ activeModel, setActiveModel ] = useState<IModel | undefined>(undefined);
  const [ resultUrl, setResultUrl ] = useState<string | null>(null);
  const { me } = useUserStore();
  const [ form ] = Form.useForm();
  const [ isTextAreaFocused, setIsTextAreaFocused ] = useState(false);
  const { isMobile } = useMobileDetect();

  const { models, getModelsListMutation } = useGetModelsListMutation(setActiveModel);
  const { generateModelMutation, isSendingGenerationRequest } = useGenerateModelMutation(() => {
    if (activeModel) {
      listenResultMutation(activeModel.id);
    }
  });
  const { listenResultMutation, isListeningResult } = useListenToResultMutation((url) => {
    setResultUrl(url)
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
      setResultUrl(null); 
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
      setResultUrl(null);
      form.resetFields();

      if (activeModel.is_ready) {
        listenResultMutation(activeModel.id);
      } else {
        listenReadinessMutation(activeModel.id);
      }
    }
  }, [activeModel, listenResultMutation, listenReadinessMutation, form]);

  return (
    <ContentSection className='sm:max-w-lg sm:rounded-4xl sm:min-w-lg max-h-none md:max-h-[80vh] pb-'>
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

        <div ref={parent} className="px-4 sm:px-10 flex flex-col gap-4 lg:gap-8 items-center">
            { !isTextAreaFocused ? <div ref={parent} className={`flex flex-col rounded-[24px] overflow-hidden max-w-[512px] items-center justify-center relative`}>
                {!isListeningReadiness && isListeningResult && activeModel?.is_ready ? (
                  <GeneratingAnimation />
                ) : (
                  <Image 
                    src={
                      resultUrl 
                        ? resultUrl 
                        : activeModel && !activeModel.is_ready
                        ? '/images/etc/silky-waves.png' 
                        : '/images/etc/magnify.png'
                    }
                    alt={
                      resultUrl 
                        ? "Generation result" 
                        : activeModel && !activeModel.is_ready 
                        ? "Model is training" 
                        : "No generations"
                    }
                    className="select-none aspect-square object-cover object-top relative"
                    fallback='' 
                    preview={!!resultUrl} 
                  />
                )}
                { resultUrl && <Button type='default' size="large" className='absolute! right-[16px] top-[16px] opacity-70 hover:opacity-100' icon={<DownloadOutlined/>} onClick={() => handleDownload(resultUrl)} disabled={resultUrl === null}/>}
                <div className="flex w-full justify-center">
                  <Text className="align-middle w-fit text-[14px]!" type="secondary">
                    {isListeningResult
                      ? "Generating..."
                      : resultUrl
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
              <Input.TextArea onClick={handleFocus} disabled={!!activeModel && !activeModel.is_ready || isListeningResult} placeholder="Imagine me as an astronaut in outer space" style={{ height: 80, resize: "none" }} />
            </Form.Item>
            {
              activeModel && !activeModel.is_ready ? (
                <Tooltip trigger={"click"} title="Model is training. Please wait. Often it takes a while (up to 3 hours).">
                  <Button type="primary" size="large" htmlType="reset" ghost block>
                    Generate
                  </Button>
                </Tooltip>
              ) : (
                <Button onClick={handleBlur} disabled={!activeModel} loading={isSendingGenerationRequest || isListeningResult} type="primary" size="large" htmlType="submit" block>
                  Generate
                </Button>
              )
            }
          </Form>
        </div>
      </div>
    </ContentSection>
  );
}
