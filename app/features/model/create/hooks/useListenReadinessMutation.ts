import { useMutation } from '@tanstack/react-query';
import { modelsService } from '@/app/entities/model';

export function useListenToReadinessMutation(onReady: (model_id: number) => void) {
    const { mutate: listenReadinessMutation, isPending: isListeningReadiness } = useMutation({
        mutationKey: ['listen to readiness'],
        mutationFn: async (model_id: number) => {
            const readiness = await modelsService.get_training_status(model_id);
            
            if (readiness.is_ready) {
                onReady(model_id);
            } else {
                const eventSource: EventSource = await modelsService.listen_training_status(model_id, (isReady: boolean) => {
                    if (isReady) {
                        onReady(model_id);
                        eventSource.close();
                    }
                });

                eventSource.onerror = () => {
                    console.error('Error listening to readiness');
                    eventSource.close();
                };
            }
        },
        onError(error) {
            console.error('Error while listening for readiness', error);
        }
    });

    return { listenReadinessMutation, isListeningReadiness };
}
