import type { StudentData } from '@/@custom-types/studentData';
import type { Course } from '@/@custom-types/examData';

export interface CombinedData {
  student: StudentData;
  courses: Course[];
}

export interface CombinedDataResponse {
  success: boolean;
  statusCode: number;
  status: string;
  message: string;
  timestamp: string;
  endpoint: string;
  data: CombinedData;
  error: {
    code: string;
    message: string;
    details: string;
    field: string;
  };
}
