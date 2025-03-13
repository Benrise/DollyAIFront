import { IModel, modelsService } from '@/app/entities/model/model';
import { FetchError } from '@/app/api';

import { toast } from 'sonner';
import { toastErrorHandler } from '@/app/shared/utils';

import { useMutation } from '@tanstack/react-query';

export function useUpdateModelMutation() {
    const { mutate: updateModelMutation, isPending: isSendingUpdateRequest } = useMutation({
        mutationKey: ['generate model'],
        mutationFn: ({ model_id, name }: { model_id: number; name: string }) => modelsService.update(model_id, { name }),
        onSuccess(data: FetchError | Pick<IModel, 'id' | 'name'>) {
            if (data && 'detail' in data) {
                toastErrorHandler(data);
            } else {
                toast.success('Model updated successfully!');
            }
        },
        onError(error: FetchError) {
            toastErrorHandler(error);
        }
    });

    return { updateModelMutation, isSendingUpdateRequest };
}