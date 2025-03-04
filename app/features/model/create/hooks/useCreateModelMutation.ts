import { type IModelsResponse, modelsService } from '@/app/entities/model/model';
import { FetchError } from '@/app/shared/lib';

import { toastErrorHandler } from '@/app/shared/utils';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useCreateModelMutation(callback?: () => void) {
    const { mutate: createModelMutation, isPending: isCreatingModel } = useMutation({
        mutationKey: ['create model'],
        mutationFn: (data: FormData) => modelsService.create(data),
        onSuccess(data: FetchError | IModelsResponse) {
            if ('detail' in data) {
                toastErrorHandler(data);
            } 
            else {
                callback?.();
                toast.success('Model created successfully!');
            }
        },
        onError(error: FetchError) {
            toastErrorHandler(error);
        }
    });

    return { createModelMutation, isCreatingModel };
}