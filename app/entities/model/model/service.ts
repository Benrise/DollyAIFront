import { api } from "@/app/api";
import { IModelsReadinessResponse, IModelsResponse, IModelsListeningResponse } from "./types";
import { FetchError } from "@/app/shared/lib";

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

    public async listen_training_status(model_id: number, callback: (data: IModelsReadinessResponse | FetchError) => void) {
        const eventSource = new EventSource(`/models/${model_id}/readiness`, { withCredentials: true });

        eventSource.onmessage = (event: MessageEvent<IModelsReadinessResponse | FetchError>) => {
            const data = event.data;
            callback(data);
        }

        eventSource.onerror = (error) => {
            console.error("EventSource failed:", error);
            eventSource.close();
        }

        return eventSource;
    }

    public async listen_result_status(model_id: number, callback: (data: IModelsListeningResponse | FetchError) => void) {
        const eventSource = new EventSource(`/models/${model_id}/last-result`, { withCredentials: true });

        eventSource.addEventListener('error', function(e) {
            console.log(e);
          }, false);
        
        eventSource.onmessage = (event: MessageEvent<IModelsListeningResponse | FetchError>) => {
            const data = event.data
            callback(data);
        };
        
        eventSource.onerror = (error) => {  
            console.error("EventSource failed:", error);
            eventSource.close();
        };

        return eventSource;
    }

    public async get_result_url(model_id: number, result_id: number) {
        const response = await api.get<Blob>( `/models/${model_id}/results/${result_id}`, {responseType: 'blob'});
        return URL.createObjectURL(response);
    }
}

export const modelsService = new ModelsService()