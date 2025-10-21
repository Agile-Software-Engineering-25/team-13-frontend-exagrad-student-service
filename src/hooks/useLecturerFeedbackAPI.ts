import { useState, useEffect } from 'react';
import axios from 'axios';

export interface LecturerFeedback {
  id: string;                       // UUID für dieses Feedback
  exam_id: string;                  // ID der Klausur
  exam_submissions_id: string;      // ID der abgegebenen Lösung
  lecturer_id: string;              // ID des Dozenten
  feedback: {
    grade: string;                  // Note
    total_points: string;           // vergebene Punkte
    comment: string;                // Kommentar des Dozenten
  };
}

export type LecturerFeedbackFormData = Omit<LecturerFeedback, 'id' | 'lecturer_id'>;

interface UseLecturerFeedbackResult {
  data: LecturerFeedback[];
  loading: boolean;
  error: string | null;
  createFeedback: (feedback: LecturerFeedback) => Promise<void>;
  refetch: () => Promise<void>;
}


export function useLecturerFeedback(lecturerId: string): UseLecturerFeedbackResult {
  const [data, setData] = useState<LecturerFeedback[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<LecturerFeedback[]>(`/api/lecturer-feedback/${lecturerId}`);
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
      await axios.post(`/api/lecturer-feedback`, feedback, {
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
    if (lecturerId) fetchFeedback();
  }, [lecturerId]);

  return { data, loading, error, createFeedback, refetch: fetchFeedback };
}
