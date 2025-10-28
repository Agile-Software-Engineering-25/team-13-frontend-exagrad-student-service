import { useState, useEffect } from 'react';
import axios from 'axios';

export interface LecturerFeedback {
    uuid: string;
    gradedAt: Date;
    examUuid: string;
    lecturerUuid: string;
    studentUuid: string;
    submissionUuid: string;
    comment: string;
    fileReference: [
      {
        fileUuid: string;
        filename: string;
        downloadLink: string;
      }
      ];
    points: number;
    grade: number;
    publishStatus: string;
}

export type LecturerFeedbackFormData = Omit<LecturerFeedback, 'id' | 'lecturer_id'>;

interface UseLecturerFeedbackResult {
  data: LecturerFeedback[];
  loading: boolean;
  error: string | null;
  createFeedback: (feedback: LecturerFeedback) => Promise<void>;
  refetch: () => Promise<void>;
}


export function useLecturerFeedback(studentId: string): UseLecturerFeedbackResult {
  const [data, setData] = useState<LecturerFeedback[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<LecturerFeedback[]>(`/api/lecturer-feedback/${studentId}`);
      setData(response.data);
    } catch (err: any) {
      console.error('❌ Fehler beim Laden der Feedbacks:', err);
      setError(err.message || 'Fehler beim Laden der Feedbacks');
    } finally {
      setLoading(false);
    }
  };

  const createFeedback = async (feedback: LecturerFeedback) => {
    try {
      setLoading(true);
      setError(null);
      await axios.post(`/lecturer-feedback`, feedback, {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err: any) {
      console.error('❌ Fehler beim Erstellen des Feedbacks:', err);
      setError(err.message || 'Fehler beim Erstellen des Feedbacks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (studentId) fetchFeedback();
  }, [studentId]);

  return { data, loading, error, createFeedback, refetch: fetchFeedback };
}
