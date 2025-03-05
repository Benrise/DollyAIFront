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

/**
 * Represents the generation result response of a model.
 * @property {number} id - Result's id.
 * @property {ModelsListeningStatusEnum} status - Model's generation result status.
 */
export interface IModelsListeningResponse {
    id: number;
    status: ModelsListeningStatusEnum
}

/**
 * Represents the readiness response of a model.
 * @property {number} id - Model's id.
 * @property {boolean} is_ready - Model's training status.
 */
export interface IModelsReadinessResponse {
    id: number;
    is_ready: boolean;
}

export const enum ModelsListeningStatusEnum {
    QUEQUED = 'quequed',
    COMPLETED = 'completed',
    ERROR = 'error'
}