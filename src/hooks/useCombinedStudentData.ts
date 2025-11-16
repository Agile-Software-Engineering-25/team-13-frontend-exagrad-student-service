import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import useAxiosInstance from '@hooks/useAxiosInstance';
import { BACKEND_BASE_URL } from '@/config';
import type { CombinedDataResponse } from '@/@custom-types/combinedData';
import type { StudentData } from '@/@custom-types/studentData';
import { setCourses, setLoading, setError } from '@/stores/slices/coursesSlice';
import { setStudent } from '@/stores/slices/studentSlice';
import type { Exam } from '@/@custom-types/examData';
import { setFeedbacks } from '@/stores/slices/lecturerFeedbackSlice';
import type { LecturerFeedback } from '@/@custom-types/lecturerFeedback';

const useCombinedStudentData = () => {
  const axiosInstance = useAxiosInstance(BACKEND_BASE_URL);
  const dispatch = useDispatch();

  const fetchAndStoreCombinedData = useCallback(
    async (studentId: string): Promise<StudentData> => {
      dispatch(setLoading());
      try {
        const response = await axiosInstance.get<CombinedDataResponse>(
          `${studentId}`
        );
        const combinedData = response.data.data;

        // Dispatch courses and student to redux store
        dispatch(setCourses(combinedData.courses));
        dispatch(setStudent(combinedData.student));

        // Extract and dispatch feedbacks to redux store
        const feedbacks: LecturerFeedback[] = [];
        combinedData.courses.forEach((course) => {
          course.exams.forEach((exam: Exam) => {
            if (exam.feedback) {
              feedbacks.push(exam.feedback);
            }
          });
        });
        dispatch(setFeedbacks(feedbacks));

        // Return student data
        return combinedData.student;
      } catch (error) {
        dispatch(
          setError(
            error instanceof Error ? error.message : 'Failed to fetch data'
          )
        );
        throw error;
      }
    },
    [axiosInstance, dispatch]
  );

  return { fetchAndStoreCombinedData };
};

export default useCombinedStudentData;
