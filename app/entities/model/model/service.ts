import { api } from "@/app/api";
import { IModelsReadinessResponse, IModelsResponse, IModelsListeningResponse, ModelsListeningStatusEnum } from "./types";

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

    public async get_training_status(model_id: number) {
        const response = await api.get<IModelsReadinessResponse>(`/models/${model_id}/readiness`);
        return response;
    }

    public async listen_training_status(model_id: number, onReady: (isReady: boolean) => void) {
        const eventSource = new EventSource(`/models/${model_id}/readiness`);

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.is_ready) {
                onReady(true);
                eventSource.close();
            } else {
                onReady(false);
            }
        }

        eventSource.onerror = (error) => {
            console.error("EventSource failed:", error);
            eventSource.close();
        }

        return eventSource;
    }

    public async listen_result_status(model_id: number, callback: (data: IModelsListeningResponse) => void) {
        const eventSource = new EventSource(`/models/${model_id}/last-result`);
        
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            callback(data);
    
            if (data.status === ModelsListeningStatusEnum.COMPLETED || data.status === ModelsListeningStatusEnum.ERROR) {
                eventSource.close();
            }
        };
        
        eventSource.onerror = (error) => {  
            console.error("EventSource failed:", error);
            eventSource.close();
        };

        return eventSource;
    }

    public async get_result_status(model_id: number) {
        const response = await api.get<IModelsListeningResponse>(`/models/${model_id}/last-result`);
        return response;
    }

    public async get_result_url(model_id: number, result_id: number) {
        const response = await api.get<Blob>( `/models/${model_id}/results/${result_id}`);

        return URL.createObjectURL(response);
    }
}

export const modelsService = new ModelsService()