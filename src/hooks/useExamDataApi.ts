import { useCallback } from 'react';
import useAxiosInstance from '@hooks/useAxiosInstance';
import { BACKEND_BASE_URL } from '@/config';
import type { ExamDataResponse } from '@/@custom-types/examData';

const useExamDataApi = () => {
  const axiosInstance = useAxiosInstance(BACKEND_BASE_URL);

  // GET Data of all Exams
  const getAllExams = useCallback(async (): Promise<ExamDataResponse[]> => {
    const response = await axiosInstance.get('/data/exams', {});
    return response.data as ExamDataResponse[];
  }, [axiosInstance]);

  return { getAllExams };
};

export default useExamDataApi;
