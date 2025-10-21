import React, { useState } from 'react';
import { useLecturerFeedback } from '../hooks/useLecturerFeedbackAPI';
import type { LecturerFeedback, LecturerFeedbackFormData } from '../hooks/useLecturerFeedbackAPI';

export default function CompleteFeedbackComponent() {
  const lecturerId = "12345";
  const { data, loading, error, createFeedback, refetch } = useLecturerFeedback(lecturerId);

  const [formData, setFormData] = useState<LecturerFeedbackFormData>({
    exam_id: '',
    exam_submissions_id: '',
    feedback: {
      grade: '',
      total_points: '',
      comment: ''
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newFeedback: LecturerFeedback = {
      id: crypto.randomUUID(),
      lecturer_id: lecturerId,
      ...formData
    };
    await createFeedback(newFeedback);
    setFormData({
      exam_id: '',
      exam_submissions_id: '',
      feedback: { grade: '', total_points: '', comment: '' }
    });
    refetch();
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Feedback für Dozent {lecturerId}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Exam ID"
          value={formData.exam_id}
          onChange={(e) => setFormData({ ...formData, exam_id: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Submission ID"
          value={formData.exam_submissions_id}
          onChange={(e) => setFormData({ ...formData, exam_submissions_id: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Note (z.B. 1.3)"
          value={formData.feedback.grade}
          onChange={(e) =>
            setFormData({
              ...formData,
              feedback: { ...formData.feedback, grade: e.target.value }
            })
          }
          required
        />
        <input
          type="number"
          placeholder="Gesamtpunkte"
          value={formData.feedback.total_points}
          onChange={(e) =>
            setFormData({
              ...formData,
              feedback: { ...formData.feedback, total_points: e.target.value }
            })
          }
          required
        />
        <textarea
          placeholder="Kommentar..."
          value={formData.feedback.comment}
          onChange={(e) =>
            setFormData({
              ...formData,
              feedback: { ...formData.feedback, comment: e.target.value }
            })
          }
        ></textarea>

        <button type="submit" disabled={loading}>
          Feedback abschicken
        </button>
      </form>

      {loading && <p>Lädt...</p>}
      {error && <p style={{ color: 'red' }}>Fehler: {error}</p>}

      <div>
        <h3>Alle Feedbacks:</h3>
        {data && Array.isArray(data) && data.map((feedback: LecturerFeedback) => (
          <div key={feedback.id} style={{ borderBottom: '1px solid #ddd', marginBottom: '1rem' }}>
            <p><strong>Exam ID:</strong> {feedback.exam_id}</p>
            <p><strong>Submission ID:</strong> {feedback.exam_submissions_id}</p>
            <p><strong>Note:</strong> {feedback.feedback.grade}</p>
            <p><strong>Punkte:</strong> {feedback.feedback.total_points}</p>
            <p><strong>Kommentar:</strong> {feedback.feedback.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
