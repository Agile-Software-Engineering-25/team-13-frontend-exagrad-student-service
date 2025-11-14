import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import useAxiosInstance from '@hooks/useAxiosInstance';
import { BACKEND_BASE_URL } from '@/config';
import type { CombinedDataResponse } from '@/@custom-types/combinedData';
import type { StudentData } from '@/@custom-types/studentData';
import { setCourses } from '@/stores/slices/coursesSlice';
import type { Exam } from '@/@custom-types/examData';
import { setFeedbacks } from '@/stores/slices/lecturerFeedbackSlice';
import type { LecturerFeedback } from '@/@custom-types/lecturerFeedback';

const useCombinedStudentData = () => {
  const axiosInstance = useAxiosInstance(BACKEND_BASE_URL);
  const dispatch = useDispatch();

  const fetchAndStoreCombinedData = useCallback(
    async (studentId: string): Promise<StudentData> => {
      const response = await axiosInstance.get<CombinedDataResponse>(
        `${studentId}`
      );
      const combinedData = response.data.data;

      // Dispatch courses to redux store
      dispatch(setCourses(combinedData.courses));

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
    },
    [axiosInstance, dispatch]
  );

  return { fetchAndStoreCombinedData };
};

export default useCombinedStudentData;
