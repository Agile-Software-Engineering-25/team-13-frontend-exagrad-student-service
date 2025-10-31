export interface ExamResponse {
  id: string;
  moduleCode: string;
  examDate: string;
  room: string;
  examType: string;
  maxPoints: number;
  duration: number;
  fileUploadRequired: boolean;
  tools: string[];
  weightPerCent: number;
}

export interface CourseResponse {
  courseName: string;
  courseCode: string;
  lecturer: string;
  semester: number;
  creditPoints: number;
  exams: ExamResponse[];
}
