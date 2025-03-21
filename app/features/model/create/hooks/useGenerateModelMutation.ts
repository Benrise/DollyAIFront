import { modelsService } from '@/app/entities/model/model';
import { FetchError } from '@/app/api';

import { toastErrorHandler } from '@/app/shared/utils';

import { useMutation } from '@tanstack/react-query';

export function useGenerateModelMutation(callback: () => void) {
    const { mutate: generateModelMutation, isPending: isSendingGenerationRequest } = useMutation({
        mutationKey: ['generate model'],
        mutationFn: async (data: {model_id: number, prompt: string}) => await modelsService.generate(data.model_id, data.prompt),
        onSuccess(data: FetchError | null) {
            if (data && 'detail' in data) {
                toastErrorHandler(data);
            } 
            else {
                callback?.()
            }
        },
        onError(error: FetchError) {
            toastErrorHandler(error);
        }
    });

    return { generateModelMutation, isSendingGenerationRequest };
}