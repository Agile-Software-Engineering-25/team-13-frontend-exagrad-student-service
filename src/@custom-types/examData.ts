import type { LecturerFeedback } from './lecturerFeedback';

export interface Exam {
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
  feedback?: LecturerFeedback;
}

export interface Course {
  courseName: string;
  courseCode: string;
  lecturer: string;
  semester: number;
  creditPoints: number;
  exams: Exam[];
}
