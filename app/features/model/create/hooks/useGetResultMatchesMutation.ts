import { IModelResultMatch, IModelResultMatchesResponse, modelsService } from '@/app/entities/model';
import { FetchError } from '@/app/api';

import { toastErrorHandler } from '@/app/shared/utils';

import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export function useGetResultMatchesListMutation() {
    const [matches, setMatches] = useState<IModelResultMatch[]>([]);

    const { mutate: getResultMatchesListMutation, isPending: isGettingResultMatches } = useMutation({
        mutationKey: ['get matches'],
        mutationFn: ({ model_id, result_id }: { model_id: number; result_id: number }) => modelsService.get_reuslt_matches(model_id, result_id),
        onSuccess(data: FetchError | IModelResultMatchesResponse) {
            if ('detail' in data) {
                toastErrorHandler(data);
            } 
            else if ('matches' in data) {
                setMatches(data.matches);
            }
        },
        onError(error: FetchError) {
            toastErrorHandler(error);
        }
    });

    return { matches, getResultMatchesListMutation, isGettingResultMatches };
}