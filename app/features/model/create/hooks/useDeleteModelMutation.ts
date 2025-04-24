import { modelsService } from '@/app/entities/model/model';
import { FetchError } from '@/app/api';

import { toastErrorHandler } from '@/app/shared/lib';

import { useMutation } from '@tanstack/react-query';

export function useDeleteModelMutation(callbacks: (() => void)[] = []) {
    const { mutate: deleteModelMutation, isPending: isSendingDeleteRequest } = useMutation({
        mutationKey: ['generate model'],
        mutationFn: ({model_id}: {model_id: number}) => modelsService.delete(model_id),
        onSuccess(data: FetchError | null) {
            if (data && 'detail' in data) {
                toastErrorHandler(data);
            } 
            else {
                callbacks.forEach(callback => callback?.());
            }
        },
        onError(error: FetchError) {
            toastErrorHandler(error);
        }
    });

    return { deleteModelMutation, isSendingDeleteRequest };
}