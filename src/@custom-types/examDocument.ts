export interface ExamDocumentRequest {
  examId: string;
  studentId: string;
}

export interface ExamDocumentResponse {
  id: string;
  examId: string;
  studentId: string;
  uploadDate: string;
  downloadUrl: string;
  fileName: string;
}

export interface ErrorDetails {
  code: string;
  message: string;
  details: string;
  field: string;
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
