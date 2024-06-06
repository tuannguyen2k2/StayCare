export interface Metadata {
  total_data?: number | null;
  prev_page?: number | null;
  current_page?: number | null;
  next_page?: number | null;
  total_page?: number | null;
  limit?: number | null;
}

export interface BaseResponse<T> {
  code: number;
  message: string;
  data: T;
  metadata: Metadata;
}

export type EntityErrorPayload = {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
};

export class HttpError extends Error {
  status: number;
  payload: {
    message: string;
    [key: string]: any;
  };

  constructor({ status, payload }: { status: number; payload: any }) {
    super(`Http Error: ${status}`);
    this.status = status;
    this.payload = payload;
  }
}

export class EntityError extends HttpError {
  status: 422;
  payload: EntityErrorPayload;

  constructor({
    status,
    payload,
  }: {
    status: 422;
    payload: EntityErrorPayload;
  }) {
    super({ status, payload });
    this.status = status;
    this.payload = payload;
  }
}

export interface CustomResponse<T> {
  ok: boolean;
  status: number;
  payload: T;
}

export interface CustomOptions extends Omit<RequestInit, "method"> {
  baseUrl?: string | undefined;
}