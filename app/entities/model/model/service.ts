import { api } from "@/app/api";
import { IModelsReadinessResponse, IModelsResponse, IModelsListeningResponse } from "./types";
import { FetchError } from "@/app/shared/lib";
import { fetchEventSource } from '@microsoft/fetch-event-source';

class ModelsService {
    public async list() {
        const response = await api.get<IModelsResponse>('/models');
        return response
    }

    public async create(body: FormData) {
        const response = await api.post<IModelsResponse>('/models', body)
        return response;
    }

    public async generate(model_id: number, prompt: string) {
        const response = await api.post<null>(`/models/${model_id}/generate`, { promt: prompt  });
        return response;
    }

    public async listen_status(
        model_id: number,
        token: string,
        type: 'training' | 'result',
        controller: AbortController,
        callback: (data: IModelsReadinessResponse | IModelsListeningResponse | FetchError) => void
    ) {
        const base_url = process.env.NEXT_PUBLIC_API_URL;
        const { signal } = controller;
    
        const headers = {
            'Authorization': `Bearer ${token}`
        };
    
        const url = type === 'training'
            ? `${base_url}/models/${model_id}/readiness`
            : `${base_url}/models/${model_id}/last-result`;

        await fetchEventSource(url, {
            headers,
            signal,
            onmessage(event) {
                if (!event.data) return;
        
                try {
                    const data = JSON.parse(event.data);
                    callback(data);
                } catch (error) {
                    console.error("Failed to parse JSON:", event.data, error);
                }
            },
            onerror(error) {
                console.error(`Error in ${type} event:`, error);
                callback(error);
            },
        });

        return controller;
    }

    public async get_result_url(model_id: number, result_id: number) {
        const response = await api.get<Blob>( `/models/${model_id}/results/${result_id}`, {responseType: 'blob'});
        return URL.createObjectURL(response);
    }
}

export const modelsService = new ModelsService()