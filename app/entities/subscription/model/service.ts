import { api } from "@/app/api";
import { ISubscriptionsResponse } from "./types";


class SubscriptionService {
    public async list() {
        const response = await api.get<ISubscriptionsResponse>('/subscriptions');
        return response.data
    }
}

export const subscriptionsService = new SubscriptionService()