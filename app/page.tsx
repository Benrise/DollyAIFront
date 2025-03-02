'use client';

import { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';
import { Button, Card, Input, Typography, Space, Image } from 'antd';

import { Sparkles, Plus } from 'lucide-react'
import { DownloadOutlined } from '@ant-design/icons';

import { CreateModelDrawer } from '@/app/create-model/CreateModelDrawer';
import { type Model } from '@/app/types'

const { Text } = Typography;

export default function Home() {
  const [open, setOpen] = useState(false);
  const [activeModel, setActiveModel] = useState<Model | null>(null);

  const openDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const _models: Model[] = [
    { id: '1', name: 'На новый год', createdAt: '2022-01-01', previewPhoto: '/images/examples/1.jpg', gender: 'male', isReady: true },
    { id: '2', name: 'На работу', createdAt: '2022-01-01', previewPhoto: '/images/examples/2.jpg', gender: 'female', isReady: false },
    { id: '3', name: 'Космонавт', createdAt: '2022-01-01', previewPhoto: '/images/examples/3.jpg', gender: 'female', isReady: false },
    { id: '4', name: 'Школа', createdAt: '2022-01-01', previewPhoto: '/images/examples/4.jpg', gender: 'male', isReady: true },
    { id: '5', name: 'Энергия', createdAt: '2022-01-01', previewPhoto: '/images/examples/1.jpg', gender: 'male', isReady: true },
    { id: '6', name: 'Тест', createdAt: '2022-01-01', previewPhoto: '/images/examples/2.jpg', gender: 'female', isReady: false },
    { id: '7', name: '12391278497838974', createdAt: '2022-01-01', previewPhoto: '/images/examples/3.jpg', gender: 'female', isReady: false },
    { id: '8', name: '_', createdAt: '2022-01-01', previewPhoto: '/images/examples/4.jpg', gender: 'male', isReady: true },
    { id: '9', name: '1', createdAt: '2022-01-01', previewPhoto: '/images/examples/1.jpg', gender: 'male', isReady: true },
    { id: '10', name: 'Класс', createdAt: '2022-01-01', previewPhoto: '/images/examples/2.jpg', gender: 'female', isReady: false },
    { id: '11', name: 'ТЕСТ', createdAt: '2022-01-01', previewPhoto: '/images/examples/3.jpg', gender: 'female', isReady: false },
    { id: '12', name: 'Наверное_123', createdAt: '2022-01-01', previewPhoto: '/images/examples/4.jpg', gender: 'male', isReady: true },
  ];

  useEffect(() => {
    setActiveModel(_models[0]);
  }, [])

  if (false) {
    redirect('/login');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <CreateModelDrawer open={open} onClose={onClose}/>
      <div className="max-w-lg w-full py-10 bg-white rounded-4xl shadow-lg shadow-indigo-50 overflow-hidden">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div className='flex flex-col gap-1 '>
            <div className='flex gap-2 w-max-[80%] overflow-x-auto pb-2 pl-10'>
              <div className="flex flex-col gap-1 items-center">
                <Button onClick={openDrawer} type="primary" shape="circle" size="large" style={{width: 64, height: 64, minWidth: 64}} block>
                  <Plus/>
                </Button>
                <Text className='align-middle w-fit text-[12px]!'>Создать</Text>
              </div>
              {_models.map((model) => (
                <div key={model.id} className="flex flex-col gap-1 items-center" onClick={() => setActiveModel(model)}>
                  <Image
                    src={model.previewPhoto}
                    width={64}
                    height={64}
                    preview={false}
                    className={`rounded-full select-none min-w-[64px] border-3 transition-all duration-300 ${
                      activeModel?.id === model.id
                        ? "border-fuchsia-500"
                        : "border-white hover:cursor-pointer hover:border-fuchsia-200"
                    }`}
                  />
                  <Text className='align-middle w-fit text-[12px]! whitespace-nowrap overflow-hidden text-ellipsis max-w-[64px]'>{model.name}</Text>
                </div>
              ))}
            </div>
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
                <Text className='align-middle w-fit text-[14px]!' type="secondary">You haven't generated any photos yet.</Text>
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
