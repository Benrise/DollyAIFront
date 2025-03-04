import { api } from "@/app/api";
import { IModelsResponse } from "./types";


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
        const response = await api.post<null>(`/models/${model_id}/generate`, { prompt });
        return response;
    }

    public async listen_result(model_id: number, callback: (data: any) => void) {
        const eventSource = new EventSource(`/models/${model_id}/last-result`);
        
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            callback(data);
        };
        
        eventSource.onerror = (error) => {  
            console.error("EventSource failed:", error);
            eventSource.close();
        };

        return eventSource;
    }

    public async result(model_id: number, result_id: number) {
        const response = await api.get(`/models/${model_id}/results/${result_id}`);
        return response;
    }
}

export const modelsService = new ModelsService()