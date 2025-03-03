'use client';

import useSWR from "swr";
import { useState, useEffect } from 'react';
import { Button, Card, Input, Typography, Space, Image } from 'antd';

import { Sparkles } from 'lucide-react'
import { DownloadOutlined } from '@ant-design/icons';

import { fetcher } from "@/app/libs";
import { type Model } from '@/app/entities/model';
import { ModelsList } from '@/app/widgets/model/list';

const { Text } = Typography;

export default function Home() {
  const [activeModel, setActiveModel] = useState<Model | null>(null);
  const { data, error, isLoading } = useSWR<any>(`/api/models`, fetcher);

  const _models: Model[] = [
    { id: '1', name: 'На новый год', created_at: '2022-01-01', updated_at: '2022-01-01', cover: '/images/examples/1.jpg', gender: 'male', is_ready: true },
    { id: '2', name: 'На работу', created_at: '2022-01-01', updated_at: '2022-01-01', cover: '/images/examples/2.jpg', gender: 'female', is_ready: false },
    { id: '3', name: 'Космонавт', created_at: '2022-01-01', updated_at: '2022-01-01',  cover: '/images/examples/3.jpg', gender: 'female', is_ready: false },
    { id: '4', name: 'Школа', created_at: '2022-01-01', updated_at: '2022-01-01', cover: '/images/examples/4.jpg', gender: 'male', is_ready: true },
    { id: '5', name: 'Энергия', created_at: '2022-01-01', updated_at: '2022-01-01', cover: '/images/examples/1.jpg', gender: 'male', is_ready: true },
    { id: '6', name: 'Тест', created_at: '2022-01-01', updated_at: '2022-01-01', cover: '/images/examples/2.jpg', gender: 'female', is_ready: false },
    { id: '7', name: '12391278497838974', created_at: '2022-01-01', updated_at: '2022-01-01', cover: '/images/examples/3.jpg', gender: 'female', is_ready: false },
    { id: '8', name: '_', created_at: '2022-01-01', updated_at: '2022-01-01', cover: '/images/examples/4.jpg', gender: 'male', is_ready: true },
    { id: '9', name: '1', created_at: '2022-01-01', updated_at: '2022-01-01', cover: '/images/examples/1.jpg', gender: 'male', is_ready: true },
    { id: '10', name: 'Класс', created_at: '2022-01-01', updated_at: '2022-01-01', cover: '/images/examples/2.jpg', gender: 'female', is_ready: false },
    { id: '11', name: 'ТЕСТ', created_at: '2022-01-01', updated_at: '2022-01-01', cover: '/images/examples/3.jpg', gender: 'female', is_ready: false },
    { id: '12', name: 'Наверное_123', created_at: '2022-01-01', updated_at: '2022-01-01', cover: '/images/examples/4.jpg', gender: 'male', is_ready: true },
  ];

  useEffect(() => {
    if(data && data.result.data)
      {
        console.log(data.result.data);
        setActiveModel(_models[0]);
      }
  }, [data, isLoading])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <div className="max-w-lg w-full py-10 bg-white rounded-4xl shadow-lg shadow-indigo-50 overflow-hidden">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div className='flex flex-col gap-1 '>
              <ModelsList
                models={_models}
                setActiveModel={setActiveModel}
                activeModel={activeModel}
              />
            <div className='flex gap-2 min-w-fit justify-between items-center w-full px-10'>
              <Text type="secondary">25 generations</Text>
              <Button type="primary" size="large">Buy more</Button>
            </div>
          </div>

          <div className="px-10 flex flex-col gap-4">
            <Card title="Generation result" extra={<Button type='text' shape="circle" size="large" icon={<DownloadOutlined className='text-fuchsia-600'/>}/>}>
              <div className='flex max-w-[512px] justify-center'>
                <Image
                  src={`/images/etc/magnify.png`}
                  alt="Empty State Image"
                  width={192}
                  className="rounded-2xl select-none"
                  preview={false}
                />
              </div>
              <div className='flex w-full justify-center'>
                <Text className='align-middle w-fit text-[14px]!' type="secondary">You haven't generated any photos yet</Text>
              </div>
            </Card>
            <Input.TextArea placeholder="Imagine me as an astronaut in outer space" rows={4} autoSize={{ minRows: 3, maxRows: 5 }}/>
            <Button type="primary" size="large" htmlType="submit" block>
              Generate
            </Button>
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
