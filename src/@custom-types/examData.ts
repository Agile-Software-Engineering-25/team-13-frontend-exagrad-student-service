export interface ExamDataResponse {
  id: string;
  title: string;
  moduleCode: string;
  examDate: string;
  room: string;
  examType: string;
  semester: string;
  ects: number;
  maxPoints: number;
  duration: number;
  attemptNumber: number;
  fileUploadRequired: boolean;
  tools: string[];
  submissions: number;
}
