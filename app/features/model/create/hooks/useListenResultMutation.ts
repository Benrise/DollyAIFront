import { useMutation } from '@tanstack/react-query';
import { modelsService } from '@/app/entities/model/model';

export function useListenToResultMutation(model_id?: number, callback?: (data: any) => void) {
    const { mutate: listenResultMutation, isPending: isListening } = useMutation({
        mutationKey: ['listen to result'],
        mutationFn: (data: { model_id: number }) => modelsService.listen_result(data.model_id, handleResult),
        onError(error) {
            console.error('Error while listening for result', error);
        }
    });

    const handleResult = (data: any) => {
        if (model_id && data.status === 'ready') {
                modelsService.result(model_id, data.result_id).then((result_url) => {
                    callback?.(result_url);
            });
        }
    };

    return { listenResultMutation, isListening };
}
