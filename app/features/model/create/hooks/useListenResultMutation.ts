import { useMutation } from '@tanstack/react-query';
import { IModelsListeningResponse, modelsService, ModelsListeningStatusEnum } from '@/app/entities/model';

export function useListenToResultMutation(model_id?: number, callback?: (data: string) => void) {
    const { mutate: listenResultMutation, isPending: isListening } = useMutation({
        mutationKey: ['listen to result'],
        mutationFn: (data: { model_id: number }) => modelsService.listen_result(data.model_id, handleResult),
        onError(error) {
            console.error('Error while listening for result', error);
        }
    });

    const handleResult = async (data: IModelsListeningResponse) => {
        if (model_id && data.status === ModelsListeningStatusEnum.COMPLETED) {
                const result_url = await modelsService.result(model_id, data.id);
                callback?.(result_url)
        }
    };

    return { listenResultMutation, isListening };
}
