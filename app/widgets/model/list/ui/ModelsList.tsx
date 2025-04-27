'use client';

import { useState } from 'react';

import { Plus } from 'lucide-react'
import { LoadingOutlined } from '@ant-design/icons';
import { CircleX } from 'lucide-react'

import { Button } from '@/app/shared/ui/button';
import { ProtectedImage } from '@/app/shared/ui/protected-image';
import { CreateModelDrawer } from '@/app/features/model/create';
import { type IModel } from '@/app/entities/model';
import { UpdateModelDrawer } from '@/app/features/model/update/ui/UpdateModelDrawer';
import { useUserContext } from '@/app/providers';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/shared/ui/tooltip';

interface ModelsListProps {
    models: IModel[];
    setActiveModel: (model: IModel) => void; 
    activeModel: IModel | undefined;
    onModelCreated: () => void;
  }


export function ModelsList({ models, setActiveModel, activeModel, onModelCreated }: ModelsListProps) {
const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
const [isUpdateDrawerOpen, setIsUpdateDrawerOpen] = useState(false);

const openCreateDrawer = () => setIsCreateDrawerOpen(true);
const onCloseCreateDrawer = () => setIsCreateDrawerOpen(false);

const openUpdateDrawer = () => setIsUpdateDrawerOpen(true);
const onCloseUpdateDrawer = () => setIsUpdateDrawerOpen(false);

const { user, openPricingDrawer } = useUserContext();

const isCreatingAvailable = !!user?.models_left;
const handleModelClick = (model: IModel) => {
    if (model.id === activeModel?.id) {
        openUpdateDrawer();
    } else {
        setActiveModel(model);
    }
};

return (
    <div className='flex gap-2 w-max-[80%] overflow-x-auto pb-2 sm:pl-10 pl-4'>
        <CreateModelDrawer open={isCreateDrawerOpen} onClose={onCloseCreateDrawer} onModelCreated={onModelCreated}/>
        {activeModel && <UpdateModelDrawer open={isUpdateDrawerOpen} onClose={onCloseUpdateDrawer} onAfterAction={onModelCreated} model={activeModel}/>}
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="flex flex-col gap-1 items-center">
                        <Button onClick={isCreatingAvailable ? openCreateDrawer : openPricingDrawer} size="icon" className='rounded-full' style={{width: 64, height: 64, minWidth: 64}}><Plus/></Button>
                        <p className='align-middle w-fit text-sm'>Create</p>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Here you can create new model, after that enter prompt and get photo</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        {models.map((model) => (
            <div
                key={model.id}
                className="flex flex-col gap-1 items-center"
                onClick={() => handleModelClick(model)}
            >
                <div className="relative flex hover:cursor-pointer">
                    <ProtectedImage src={model.cover} fallback='/images/etc/spheric-vortex.png' width={64} height={64} preview={false} alt={model.name} className={`
                        rounded-full select-none min-w-[64px] border-3 transition-all duration-300 object-cover object-top
                        ${activeModel?.id === model.id && "border-primary"}
                    `}/>
                    {!model.is_ready && !model.is_train_failed && (
                        <div className="absolute top-0 left-0 w-full h-full">
                            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[85%] h-[85%] bg-black opacity-50 flex items-center justify-center rounded-full"></div>
                            <LoadingOutlined className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white!'/>
                        </div>
                    )}
                </div>
                <div className="flex items-center text-sm gap-0.5">
                    <div className={`align-middle w-fit whitespace-nowrap overflow-hidden text-ellipsis max-w-[64px] ${model.is_train_failed && 'text-red-500'}`}>
                        {model.name}
                    </div>
                    {model.is_train_failed && <CircleX className='text-red-500' size={14}/>}
                </div>
            </div>
        ))}
    </div>
);
}