export interface PubDocumentRequest {
  studentId?: string;
  startDate: string;
  endDate: string;
}

export interface PubDocumentResponse {
  id: string; // UUID
  studentId: string;
  uploadDate: string;
  startDate: string;
  endDate: string;
  downloadUrl: string;
  fileName: string;
}
