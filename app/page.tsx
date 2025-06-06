"use client";

import { useEffect, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Button, Card, Input, Typography, Space, Image, Tooltip } from 'antd';

import { Sparkles } from 'lucide-react'
import { DownloadOutlined } from '@ant-design/icons';

import { GeneratingAnimation } from '@/app/shared/ui/generation-animation';
import { UserBadge } from '@/app/entities/user';
import { type IModel } from '@/app/entities/model';
import { ModelsList, useGetModelsListMutation } from '@/app/widgets/model/list';
import { useListenToResultMutation } from './features/model/create';

const { Text } = Typography;

export default function Home() {
  const [parent] = useAutoAnimate();
  const [activeModel, setActiveModel] = useState<IModel | undefined>(undefined);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const {models, getModelsListMutation} = useGetModelsListMutation(setActiveModel);
  const { listenResultMutation, isListening } = useListenToResultMutation(activeModel?.id, (resultUrl) => setResultUrl(resultUrl));

  useEffect(() => {
    getModelsListMutation();
  }, [getModelsListMutation]);

  useEffect(() => {
    if (activeModel && activeModel.is_ready) {
      listenResultMutation({ model_id: activeModel.id });
    }
  }, [activeModel, listenResultMutation]);

  const handleModelCreated = () => {
      getModelsListMutation();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <div 
          className="
              w-full sm:max-w-lg sm:py-10 bg-white rounded-none sm:rounded-4xl 
              shadow-none sm:shadow-xl sm:shadow-indigo-50 overflow-hidden
              h-screen sm:h-auto pt-16
          "
        >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
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
                  <Button type="primary" size="large" disabled>
                    Buy more
                  </Button>
                </div>
              )}
            </div>     
          </div>

          <div className="px-10 flex flex-col gap-4">
            <Card 
              title="Generation result" 
              extra={<Button type='text' shape="circle" size="large" icon={<DownloadOutlined className='text-fuchsia-600' />} disabled/>}
            >
              <div className='flex max-w-[512px] justify-center'>
                {isListening ? (
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
                    width={192} 
                    className="rounded-2xl select-none" 
                    preview={false} 
                  />
                )}
              </div>
              <div className="flex w-full justify-center">
                <Text className="align-middle w-fit text-[14px]!" type="secondary">
                  {isListening
                    ? "Generating..."
                    : resultUrl
                    ? "Generation complete"
                    : activeModel && !activeModel.is_ready
                    ? "Model is training, this may take some time"
                    : "You haven’t generated any photos yet"}
                </Text>
              </div>
            </Card>
            <Input.TextArea disabled={!!activeModel && !activeModel.is_ready || isListening} placeholder="Imagine me as an astronaut in outer space" style={{ height: 80, resize: "none" }} />
            {
              activeModel && !activeModel.is_ready ? (
                <Tooltip trigger={"click"} title="Model is training. Please wait. Often it takes a while (up to 3 hours).">
                  <Button type="primary" size="large" htmlType="submit" ghost block>
                    Generate
                  </Button>
                </Tooltip>
              ) : (
                <Button disabled={!activeModel} type="primary" size="large" htmlType="submit" block>
                  Generate
                </Button>
              )
            }
          </div>
          <div className="flex w-full gap-4 justify-evenly items-center">
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
