import { type IModelsResponse, modelsService } from '@/app/entities/model/model';
import { FetchError } from '@/app/api';

import { toastErrorHandler } from '@/app/shared/lib';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useCreateModelMutation(callbacks: (() => void)[] = []) {
    const { mutate: createModelMutation, isPending: isCreatingModel } = useMutation({
        mutationKey: ['create model'],
        mutationFn: (data: FormData) => modelsService.create(data),
        onSuccess(data: FetchError | IModelsResponse) {
            if ('detail' in data) {
                toastErrorHandler(data);
            } 
            else {
                callbacks.forEach(callback => callback?.());
                toast.success("Model  created successfully!");
            }
        },
        onError(error: FetchError) {
            toastErrorHandler(error);
        }
    });

    return { createModelMutation, isCreatingModel };
}