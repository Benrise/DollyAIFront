'use client';

import { Button, Image, Typography } from 'antd';
import { useState } from 'react';

import { Plus } from 'lucide-react'
import { LoadingOutlined } from '@ant-design/icons';

import { CreateModelDrawer } from '@/app/features/model/create';
import { type IModel } from '@/app/entities/model';

const { Text } = Typography;

interface ModelsListProps {
    models: IModel[];
    setActiveModel: (model: IModel) => void; 
    activeModel: IModel | undefined;
    onModelCreated: () => void;
  }

  export function ModelsList({ models, setActiveModel, activeModel, onModelCreated }: ModelsListProps) {
    const [isOpen, setIsOpen] = useState(false);
    
    const openDrawer = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    return (
        <div className='flex gap-2 w-max-[80%] overflow-x-auto pb-2 pl-10'>
            <CreateModelDrawer open={isOpen} onClose={onClose} onModelCreated={onModelCreated}/>
            <div className="flex flex-col gap-1 items-center">
                <Button onClick={openDrawer} type="primary" shape="circle" size="large" style={{width: 64, height: 64, minWidth: 64}} block><Plus/></Button>
                <Text className='align-middle w-fit text-[12px]!'>Create</Text>
            </div>
            {models.map((model) => (
                <div
                    key={model.id}
                    className="flex flex-col gap-1 items-center"
                    onClick={() => setActiveModel(model)}
                >
                    <div className="relative flex">
                        <Image src={model.cover} fallback='/images/etc/spheric-vortex.png' width={64} height={64} preview={false} alt={model.name} className={`
                            rounded-full select-none min-w-[64px] border-3 transition-all duration-300
                            ${activeModel?.id === model.id? "border-fuchsia-500": "border-white hover:cursor-pointer hover:border-fuchsia-200"}
                        `}/>
                        {!model.is_ready && (
                            <div className="absolute top-0 left-0 w-full h-full">
                                <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[85%] h-[85%] bg-black opacity-50 flex items-center justify-center rounded-full"></div>
                                <LoadingOutlined className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white!'/>
                            </div>
                        )}
                    </div>
                    <Text className="align-middle w-fit text-[12px]! whitespace-nowrap overflow-hidden text-ellipsis max-w-[64px]">
                        {model.name}
                    </Text>
                </div>
            ))}
      </div>
    );
  }