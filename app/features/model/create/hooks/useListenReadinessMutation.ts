import { useMutation } from '@tanstack/react-query';
import { modelsService } from '@/app/entities/model';
import { toastErrorHandler } from '@/app/shared/utils';
import { useAuthStore } from '@/app/entities/auth';


export function useListenToReadinessMutation(onReady: (model_id: number) => void) {
    const { getAccessToken } = useAuthStore();
    const token = getAccessToken();

    const { mutate: listenReadinessMutation, isPending: isListeningReadiness } = useMutation({
        mutationKey: ['listen to readiness'],
        mutationFn: async (model_id: number) => {
            const controller = new AbortController();
            await modelsService.listen_status(model_id, token, 'training', controller, (data) => {
                if ('detail' in data) {
                    toastErrorHandler(data);
                    controller.abort();
                } else if ("is_ready" in data && data.is_ready) {
                    onReady(model_id);
                    controller.abort();
                }
            });

            return controller ;
        },
        onError(error) {
            console.error('Error while listening for readiness', error);
        },
    });

    return { listenReadinessMutation, isListeningReadiness };
}
