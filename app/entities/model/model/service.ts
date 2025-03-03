import { api } from "@/app/api";
import { IModelsResponse } from "./types";


class ModelsService {
    public async list() {
        const response = await api.get<IModelsResponse>('/models');
        return response
    }

    public async create(body: FormData) {
        const response = await api.post('/models', body)
        return response;
    }
}

export const modelsService = new ModelsService()