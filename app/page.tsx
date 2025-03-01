'use client';

import { useState } from 'react';
import { redirect } from 'next/navigation';
import { Button, Card, Input, Typography, Space, Image } from 'antd';
import { Sparkles, Plus } from 'lucide-react'
import { DownloadOutlined } from '@ant-design/icons';
import { CreateModelDrawer } from '@/app/create-model/CreateModelDrawer';

const { Text } = Typography;

export default function Home() {
  const [open, setOpen] = useState(false);

  const openDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  if (false) {
    redirect('/login');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <CreateModelDrawer open={open} onClose={onClose}/>
      <div className="max-w-lg w-full px-10 py-10 bg-white rounded-4xl shadow-lg shadow-indigo-50 overflow-hidden">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div className='flex justify-between items-center'>
            <div className='flex gap-2'>
              <Button onClick={openDrawer} type="primary" shape="circle" size="large" style={{width: 48, height: 48}} block ghost>
                <Plus/>
              </Button>
              <Image
                src={`/images/examples/1.jpg`}
                width={48}
                height={48}
                preview={false}
                className="rounded-full select-none"
              />
              <Image
                src={`/images/examples/2.jpg`}
                width={48}
                height={48}
                preview={false}
                className="rounded-full select-none"
              />
              <Image
                src={`/images/examples/3.jpg`}
                width={48}
                height={48}
                preview={false}
                className="rounded-full select-none"
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Text type="secondary">25 generations</Text>
              <Button type="primary" size="large">Buy more</Button>
            </div>
          </div>

          <Card title="Результат генерации" extra={<Button type='text' shape="circle" size="large" icon={<DownloadOutlined className='text-fuchsia-600'/>}/>}>
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
              <Text className='align-middle w-fit text-[14px]!' type="secondary">Вы еще не сгенерировали ни одной фотографии</Text>
            </div>
          </Card>
          <Input.TextArea placeholder="Представь меня как космонавта в открытом космосе" rows={4} />
          <Button type="primary" size="large" htmlType="submit" block>
            Generate
          </Button>

          <div className="flex w-full gap-4 justify-around items-center">
            <div className="min-w-[144px] max-h-[164px]">
              <Image
                    src={`/images/etc/robot.png`}
                    alt="Robot Image"
                    width={144}
                    height={253}
                    className="rounded-2xl select-none absolute left-[-20px] rotate-20"
                />
            </div>
            <div className="flex items-center h-fit justify-end">
              <div className="text-2xl font-medium text-indigo-200 ">
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
