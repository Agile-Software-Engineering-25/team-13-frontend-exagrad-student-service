import { useCallback } from 'react';
import useAxiosInstance from '@hooks/useAxiosInstance';
import { BACKEND_BASE_URL } from '@/config';
import type { StudentDataResponse } from '@/@custom-types/studentData';

const useStudentDataApi = () => {
  const axiosInstance = useAxiosInstance(BACKEND_BASE_URL);

  // GET Data of Student
  const getStudent = useCallback(
    async (studentId: string): Promise<StudentDataResponse[]> => {
      console.log('HI' + studentId);
      const response = await axiosInstance.get(`/students/${studentId}`);
      return response.data.data as StudentDataResponse[];
    },
    [axiosInstance]
  );

  return { getStudent };
};

export default useStudentDataApi;
