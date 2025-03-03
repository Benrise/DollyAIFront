export interface Model {
    id: string;
    name: string;
    cover: string;
    created_at: string;
    updated_at: string;
    gender: string;
    is_ready: boolean;
  }

export interface ModelsResponse {
    models: Model[];
}