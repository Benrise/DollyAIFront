import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { FetchError } from "@/app/api";
import { toastErrorHandler } from "@/app/shared/utils";
import { ISubscriptionProduct, ISubscriptionsResponse, subscriptionsService } from "@/app/entities/subscription/card";

export function useGetSubscriptionsListMutation() {
    const [subscriptions, setSubscriptions] = useState<ISubscriptionProduct[]>([]);

    const { mutate: getSubscriptionsListMutation, isPending: isGettingSubscriptions } = useMutation({
        mutationKey: ['get subscriptions'],
        mutationFn: () => subscriptionsService.list(),
        onSuccess(data: FetchError | ISubscriptionsResponse) {
            if ('detail' in data) {
                toastErrorHandler(data);
            } 
            else if ('prices' in data) {
                setSubscriptions(data.prices);
            }
        },
        onError(error: FetchError) {
            toastErrorHandler(error);
        }
    });

    return { subscriptions, getSubscriptionsListMutation, isGettingSubscriptions };
}