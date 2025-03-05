import { useMutation } from '@tanstack/react-query';
import { IModelsListeningResponse, modelsService, ModelsListeningStatusEnum } from '@/app/entities/model';


export function useListenToResultMutation(onCompleted: (url: string | null) => void) {
    const { mutate: listenResultMutation, isPending: isListening } = useMutation({
        mutationKey: ['listen to result'],
        mutationFn: async (model_id: number) => {
            const resultStatus = await modelsService.get_result_status(model_id);

            if (resultStatus.status === ModelsListeningStatusEnum.COMPLETED) {
                const imageUrl = await modelsService.get_result_url(model_id, resultStatus.id);
                onCompleted(imageUrl);
                return;
            }

            let eventSource: EventSource;
            eventSource = await modelsService.listen_result_status(model_id, (data: IModelsListeningResponse) => {
                if (data.status === ModelsListeningStatusEnum.COMPLETED) {
                    modelsService.get_result_url(model_id, data.id).then(imageUrl => onCompleted(imageUrl));
                    eventSource.close();
                } else if (data.status === ModelsListeningStatusEnum.ERROR) {
                    console.error("Generation failed");
                    onCompleted(null);
                    eventSource.close();
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

    return { listenResultMutation, isListening };
}

