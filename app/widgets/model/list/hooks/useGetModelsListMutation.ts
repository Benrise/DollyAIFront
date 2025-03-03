import { IModel, IModelsResponse, modelsService } from '@/app/entities/model';
import { FetchError } from '@/app/shared/lib';

import { toastErrorHandler } from '@/app/shared/utils';

import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export function useGetModelsListMutation(setActiveModel: React.Dispatch<React.SetStateAction<IModel | undefined>>) {
    const [models, setModels] = useState<IModel[]>([]);

    const { mutate: getModelsListMutation, isPending: isGettingModels } = useMutation({
        mutationKey: ['get models'],
        mutationFn: () => modelsService.list(),
        onSuccess(data: FetchError | IModelsResponse) {
            if ('detail' in data) {
                toastErrorHandler(data);
            } 
            else if ('models' in data) {
                setModels(data.models);
        
                if (data.models.length > 0) {
                    setActiveModel(data.models[0]);
                }
            }
        },
        onError(error: Error) {
            toastErrorHandler(error);
        }
    });

    return { models, getModelsListMutation, isGettingModels };
}