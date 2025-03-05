import { useMutation } from '@tanstack/react-query';
import { modelsService } from '@/app/entities/model';
import { toastErrorHandler } from '@/app/shared/utils';
import { toast } from 'sonner';


export function useListenToReadinessMutation(onReady: (model_id: number) => void) {
    const { mutate: listenReadinessMutation, isPending: isListeningReadiness } = useMutation({
        mutationKey: ['listen to readiness'],
        mutationFn: async (model_id: number) => {
            const eventSource: EventSource = await modelsService.listen_training_status(model_id, (data) => {
                if ('detail' in data) {
                    toastErrorHandler(data);
                } 
                else {
                    onReady(model_id)
                    toast.success('Request sent successfully!');
                }
            });

            eventSource.onerror = () => {
                console.error('Error listening to readiness');
                eventSource.close();
            };
        },
        onError(error) {
            console.error('Error while listening for readiness', error);
        }
    });

    return { listenReadinessMutation, isListeningReadiness };
}
