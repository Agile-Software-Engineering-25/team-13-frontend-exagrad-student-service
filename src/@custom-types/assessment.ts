import type { LecturerFeedback } from './lecturerFeedback';

export interface Assessment {
  id: string;
  moduleCode: string;
  assessmentTyp: string;
  weight: string;
  grade: string | 'N/A';
  date: string;
  requiresSubmission: boolean;
  room?: string;
  maxPoints?: number;
  duration?: number;
  tools?: string[];
  examId?: string;
  feedback?: LecturerFeedback;
}
