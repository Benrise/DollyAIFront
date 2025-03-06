"use client";

import { useEffect, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Form, Button, Input, Typography, Space, Image, Tooltip } from 'antd';

import { Sparkles, ChevronDown } from 'lucide-react'
import { DownloadOutlined } from '@ant-design/icons';

import { GeneratingAnimation } from '@/app/shared/ui/generation-animation';
import { UserBadge } from '@/app/entities/user';
import { type IModel } from '@/app/entities/model';
import { ModelsList, useGetModelsListMutation } from '@/app/widgets/model/list';
import { useListenToResultMutation } from './features/model/create';
import { useListenToReadinessMutation } from './features/model/create';
import { useGenerateModelMutation } from './features/model/create';
import { PricingDrawer } from './features/pricing/ui';
import { downloadBlob } from './shared/utils/download';
import { useMobileDetect } from './shared/lib';

const { Text } = Typography;

export default function Home() {
  const [ parent ] = useAutoAnimate();
  const [ activeModel, setActiveModel ] = useState<IModel | undefined>(undefined);
  const [ resultUrl, setResultUrl ] = useState<string | null>(null);
  const [ form ] = Form.useForm();
  const [ isPricingOpen, setIsPricingOpen ] = useState(false);
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

  const closePricing = () => setIsPricingOpen(false);
  const openPricing = () => setIsPricingOpen(true);

  useEffect(() => {
    getModelsListMutation();
  }, [getModelsListMutation]);
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

  const handleModelCreated = () => {
    getModelsListMutation();
  };
  const handleGenerate = (values: { prompt: string }) => {
    if (activeModel) {
      setResultUrl(null); 
      generateModelMutation({ model_id: activeModel.id, prompt: values.prompt });
    }
  };
  const handleDownload = (result_url: string | null, name='result.png') => {
    if (result_url) {
      downloadBlob(result_url, name);
    }
  }
  const handleFocus = () => setIsTextAreaFocused(isMobile && true);
  const handleBlur = () => setIsTextAreaFocused(isMobile && false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <div 
          className="
              w-full sm:max-w-lg bg-white rounded-none sm:rounded-4xl 
              shadow-none sm:shadow-xl sm:shadow-indigo-50 overflow-hidden
              h-screen sm:h-auto py-8
          "
        >
        <Space direction="vertical" size="large" className='relative' style={{ width: '100%' }}>
          <UserBadge/>
          <div className='flex flex-col gap-2 '>
              <ModelsList
                models={models}
                setActiveModel={setActiveModel}
                activeModel={activeModel}
                onModelCreated={handleModelCreated}
              />
            <div ref={parent}>
              {models.length > 0 && (
                <div className="flex gap-2 min-w-fit justify-between items-center w-full px-10">
                  <Text type="secondary">∞ generations</Text>
                  <Button type="primary" size="middle" onClick={openPricing}>
                    Buy more
                  </Button>
                  <PricingDrawer onClose={closePricing} open={isPricingOpen} />
                </div>
              )}
            </div>     
          </div>

          <div ref={parent} className="px-10 flex flex-col gap-8 items-center">
              { !isTextAreaFocused ? <div ref={parent} className={`flex flex-col max-w-[512px] items-center justify-center relative`}>
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
                      className="rounded-[24px] select-none aspect-square object-cover object-top relative"
                      fallback='' 
                      preview={false} 
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
            <Form form={form} onFinish={handleGenerate} className="px-10 flex flex-col gap-4 w-full">
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
          <div className="w-full gap-4 justify-evenly items-center sm:flex hidden">
            <div className="min-w-[144px] max-h-[164px]">
              <Image
                    src={`/images/etc/robot.png`}
                    alt="Robot Image"
                    width={144}
                    height={253}
                    className="rounded-2xl select-none absolute left-[-10px] rotate-20"
                    preview={false}
                />
            </div>
            <div className="flex items-center h-fit justify-end">
              <div className="text-3xl font-medium text-indigo-200 ">
                Making Magic
              </div>
              <Sparkles 
                size={24} 
                className="ml-2 text-indigo-200"
                style={{ fill: 'currentColor' }}
              />
              </div>
          </div>
        </Space>
      </div>
    </div>
  );
}
