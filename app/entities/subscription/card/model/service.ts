import { api } from "@/app/api";
import { ISubscriptionsResponse, ICheckoutResponse } from "./types";


class SubscriptionService {
    public async list() {
        const response = await api.get<ISubscriptionsResponse>('/subscriptions');
        return response.data
    }
    public async checkout(price_id: string) {
        const response = await api.post<ICheckoutResponse>('/subscriptions/checkout-session', { price_id });
        return response.data;
    }
}

export const subscriptionsService = new SubscriptionService()