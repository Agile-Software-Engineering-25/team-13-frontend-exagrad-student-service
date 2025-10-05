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
