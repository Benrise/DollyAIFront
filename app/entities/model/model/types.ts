export interface Model {
    id: string;
    createdAt: string;
    previewPhoto: string;
    name: string;
    gender: string;
    isReady: boolean;
  }

export interface ModelsResponse {
    models: Model[];
}