import { useMutation } from '@tanstack/react-query';

import { toastErrorHandler } from '@/app/shared/utils';
import { ICheckoutResponse, subscriptionsService } from '@/app/entities/subscription';
import { FetchError } from "@/app/api";
import { useRouter } from 'next/navigation';

export function useCheckoutMutation() {
    const router = useRouter()

    const {mutate: checkoutMutation, isPending: isLoadingcheckout} = useMutation({
        mutationKey: ['checkout'],
        mutationFn: (price_id: string) => subscriptionsService.checkout(price_id),
        onSuccess(data: FetchError | ICheckoutResponse) {
            if (data && 'detail' in data) {
                toastErrorHandler(data);
            } 
            else if ('url' in data) {
                router.push(data.url);
            }
        },
        onError(error: FetchError) {
            toastErrorHandler(error)
        }
    })

    return { checkoutMutation, isLoadingcheckout }
}