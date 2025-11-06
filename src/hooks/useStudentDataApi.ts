import { useCallback } from 'react';
import useAxiosInstance from '@hooks/useAxiosInstance';
import { BACKEND_BASE_URL } from '@/config';
import type { StudentDataResponse } from '@/@custom-types/studentData';
import useUser from './useUser';

const useStudentDataApi = () => {
  const axiosInstance = useAxiosInstance(BACKEND_BASE_URL);
  const { getUserId } = useUser();

  // GET Data of Student 
  const getStudent = useCallback(async (): Promise<StudentDataResponse[]> => {
    const studentId = getUserId();
    console.log("HI" + studentId);
    const response = await axiosInstance.get(`/students/${studentId}`);
    return response.data as StudentDataResponse[];
    },
    [axiosInstance, getUserId]
  );

  return { getStudent };
};

export default useStudentDataApi;
