import { useCallback } from 'react';
import useAxiosInstance from '@hooks/useAxiosInstance';
import { BACKEND_BASE_URL } from '@/config';

export type SendEmailRequest = {
  to: string[];
  subject: string;
  text: string;
  replyTo?: string;
};

export type SendEmailResponse = {
  success: boolean;
  message: string;
};

const useNotification = () => {
  const axiosInstance = useAxiosInstance(BACKEND_BASE_URL);

  // POST: Send Email
  const sendEmail = useCallback(
    async (data: SendEmailRequest): Promise<SendEmailResponse> => {
      const response = await axiosInstance.post('/notification/send', data, {
        validateStatus: (status) => status >= 200 && status < 300,
      });

      return response.data as SendEmailResponse;
    },
    [axiosInstance]
  );

  return { sendEmail };
};

export default useNotification;
