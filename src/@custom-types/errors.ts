export interface ErrorDetails {
  code: string;
  message: string;
  details?: string;
  field?: string;
}

export interface ApiResponseWrapper<T> {
  success: boolean;
  statusCode: number;
  status: string;
  message: string;
  timestamp: string;
  endpoint: string;
  data: T;
  error: ErrorDetails | null;
}

export interface AxiosErrorResponse {
  response?: {
    data?: ApiResponseWrapper<null>;
  };
  message?: string;
}

export function isAxiosError(error: unknown): error is AxiosErrorResponse {
  return (
    typeof error === 'object' &&
    error !== null &&
    ('response' in error || 'message' in error)
  );
}
