import { api } from "@/app/api";
import { IModelsReadinessResponse, IModelsResponse, IModelsListeningResponse, IModel, IResultMatchesResponse } from "./types";
import { FetchError } from "@/app/api";
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { IRefreshResponse } from "@/app/entities/auth";

class ModelsService {
    public async list() {
        const response = await api.get<IModelsResponse>('/models');
        return response.data
    }

    public async create(body: FormData) {
        const response = await api.post<IModelsResponse>('/models', body, { headers: { 'Content-Type': 'multipart/form-data' } });
        return response.data;
    }

    public async update(model_id: number, { name }: { name: string }) {
        const response = await api.put<Pick<IModel, 'id' | 'name'>>(`/models/${model_id}`, { name: name });
        return response.data
    }

    public async delete(model_id: number) {
        const response = await api.delete<null>(`/models/${model_id}`);
        return response.data
    }

    public async generate(model_id: number, prompt: string) {
        const response = await api.post<null>(`/models/${model_id}/generate`, { promt: prompt  });
        return response.data;
    }

    public async listen_status(
        model_id: number,
        token: string,
        type: 'training' | 'result',
        controller: AbortController,
        callback: (data: IModelsReadinessResponse | IModelsListeningResponse | FetchError) => void,
        refresh: () => Promise<IRefreshResponse>,
        signOut: () => Promise<void>,
    ) {
        const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
        const { signal } = controller;
    
        const headers = {
            'Authorization': `Bearer ${token}`
        };
    
        const url = type === 'training'
            ? `${BASE_URL}/models/${model_id}/readiness`
            : `${BASE_URL}/models/${model_id}/last-result`;

        await fetchEventSource(url, {
            headers,
            signal,
            async onopen(response) {
                if (response.status === 403) {
                    controller.abort();
                    await signOut();
                }
                else if (response.status === 401) {
                    const { access: new_token } = await refresh();
                    await modelsService.listen_status(model_id, new_token, type, controller, callback, refresh, signOut);
                }
            },
            onmessage(event) {
                if (!event.data) return;

                try {
                    const data = JSON.parse(event.data);
                    callback(data);
                } catch (error) {
                    console.error("Failed to parse JSON:", event.data, error);
                }
            },
        });

        return controller;
    }

    public async get_result_url(model_id: number, result_id: number) {
        const response = await api.get<Blob>( `/models/${model_id}/results/${result_id}`, {responseType: 'blob'});
        return URL.createObjectURL(response.data);
    }

    public async get_reuslt_matches(model_id: number, result_id: number) {
        const response = await api.get<IResultMatchesResponse>( `/models/${model_id}/results/${result_id}/matches`);
        return response.data;
    }
}

export const modelsService = new ModelsService()