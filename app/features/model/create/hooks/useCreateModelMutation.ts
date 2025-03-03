import { modelsService } from '@/app/entities/model/model';


import { toastErrorHandler } from '@/app/shared/utils';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useCreateModelMutation(callback?: () => void) {
    const { mutate: createModelMutation, isPending: isCreatingModel } = useMutation({
        mutationKey: ['create model'],
        mutationFn: (data: FormData) => modelsService.create(data),
        onSuccess(data: any) {
            if (data.message) {
                toastErrorHandler(data);
            } else {
                callback?.();
                toast.success('Model created successfully!');
            }
        },
        onError(error) {
            toastErrorHandler(error);
        }
    });

    return { createModelMutation, isCreatingModel };
}