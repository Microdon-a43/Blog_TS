export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';

export interface GlobalSchema {
  success: string;
  error: string;
}

export interface SuccessMessageType {
  type: typeof SUCCESS;
  payload: string;
}
export interface ErrorMessageType {
  type: typeof ERROR;
  payload: string;
}

export type GlobalAction = SuccessMessageType | ErrorMessageType;
