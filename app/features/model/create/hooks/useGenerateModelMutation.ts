import { modelsService } from '@/app/entities/model/model';
import { FetchError } from '@/app/shared/lib';

import { toastErrorHandler } from '@/app/shared/utils';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useGenerateModelMutation(callback: () => void) {
    const { mutate: generateModelMtation, isPending: isGenerating } = useMutation({
        mutationKey: ['generate model'],
        mutationFn: (data: {model_id: number, prompt: string}) => modelsService.generate(data.model_id, data.prompt),
        onSuccess(data: FetchError | null) {
            if (data && 'detail' in data) {
                toastErrorHandler(data);
            } 
            else {
                callback?.()
                toast.success('Model created successfully!');
            }
        },
        onError(error: FetchError) {
            toastErrorHandler(error);
        }
    });

    return { generateModelMtation, isGenerating };
}