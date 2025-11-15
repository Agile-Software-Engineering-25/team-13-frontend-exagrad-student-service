export interface FileReference {
  fileName: string;
  downloadUrl: string | null;
}

export interface LecturerFeedback {
  uuid: string;
  gradedAt: string;
  examUuid: string;
  lecturerUuid: string;
  studentUuid: string;
  submissionUuid: string;
  comment: string;
  fileReference: FileReference[];
  points: number;
  grade: number;
  publishStatus: string | null;
}
