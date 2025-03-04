export interface IModel {
    id: number;
    name: string;
    cover: string;
    created_at: string;
    updated_at: string;
    gender: string;
    is_ready: boolean;
  }

export interface IModelsResponse {
    models: IModel[];
}