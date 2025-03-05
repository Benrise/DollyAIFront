import { useMutation } from '@tanstack/react-query';
import { modelsService, ModelsListeningStatusEnum } from '@/app/entities/model';
import { toastErrorHandler } from '@/app/shared/utils';
import { toast } from 'sonner';


export function useListenToResultMutation(onCompleted: (url: string | null) => void) {
    const { mutate: listenResultMutation, isPending: isListeningResult } = useMutation({
        mutationKey: ['listen to result'],
        mutationFn: async (model_id: number) => {
            const eventSource: EventSource = await modelsService.listen_result_status(model_id, (data) => {

                if ('detail' in data) {
                    toastErrorHandler(data);
                    eventSource.close();
                } 
                else if ('status' in data) {
                    if (data.status === ModelsListeningStatusEnum.COMPLETED) {
                        modelsService.get_result_url(model_id, data.id).then(imageUrl => onCompleted(imageUrl));
                        toast.success('Generation completed!');
                        eventSource.close();
                    } 
                    else if (data.status === ModelsListeningStatusEnum.ERROR) {
                        console.error("Generation failed");
                        onCompleted(null);
                        eventSource.close();
                    }
                }

            });

            eventSource.onerror = () => {
                console.error('Error listening for result');
                eventSource.close();
            };
        },
        onError(error) {
            console.error('Error while listening for result', error);
        }
    });

    return { listenResultMutation, isListeningResult };
}

