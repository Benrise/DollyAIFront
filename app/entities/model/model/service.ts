import { api } from "@/app/api";
import { IModelsResponse } from "./types";


class ModelsService {
    public async list() {
        return await api.get<IModelsResponse>('/model');
    }

    public async create(body: FormData) {
        return await api.post('/models', body);
    }
}

export const modelsService = new ModelsService()