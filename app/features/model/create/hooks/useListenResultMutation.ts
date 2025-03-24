import { useMutation } from '@tanstack/react-query';
import { modelsService, ModelsListeningStatusEnum } from '@/app/entities/model';
import { toastErrorHandler } from '@/app/shared/utils';
import { useAuthStore } from '@/app/entities/auth';
import { useRef } from 'react';


export function useListenToResultMutation(onCompleted: (url: string | null) => void) {
    const { getAccessToken, refresh, signOut } = useAuthStore();
    const token = getAccessToken();

    const previousControllerRef = useRef<AbortController | null>(null);

    const { mutate: listenResultMutation, isPending: isListeningResult } = useMutation({
        mutationKey: ['listen to result'],
        mutationFn: async (model_id: number) => {
            if (previousControllerRef.current) {
                previousControllerRef.current.abort();
            }
            const controller = new AbortController();
            previousControllerRef.current = controller;

            await modelsService.listen_status(model_id, token, 'result', controller, (data) => {
                if ('detail' in data) {
                    toastErrorHandler(data);
                    controller.abort();
                } else if ('status' in data) {
                    if (data.status === ModelsListeningStatusEnum.COMPLETED) {
                        modelsService.get_result_url(model_id, data.id).then(imageUrl => onCompleted(imageUrl));
                        controller.abort();
                    } else if (data.status === ModelsListeningStatusEnum.ERROR) {
                        console.error("Generation failed");
                        onCompleted(null);
                        controller.abort();
                    }
                }
            }, refresh, signOut);
            return controller;
        },
        onError(error) {
            console.error('Error while listening for result', error);
        },
        onSettled: () => {
            previousControllerRef.current = null;
        },
    });

    return { listenResultMutation, isListeningResult };
}

