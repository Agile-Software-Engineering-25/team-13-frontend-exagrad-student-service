import { useCallback } from 'react';
import useAxiosInstance from '@hooks/useAxiosInstance';
import { BACKEND_BASE_URL } from '@/config';
import type {
  PubDocumentRequest,
  PubDocumentResponse,
} from '@custom-types/pubDocument';

const usePubDocuments = () => {
  const axiosInstance = useAxiosInstance(BACKEND_BASE_URL);

  // GET PUB Documents by studentId
  const getPubDocuments = useCallback(
    async (studentId: string): Promise<PubDocumentResponse[]> => {
      const response = await axiosInstance.get('/documents/pub', {
        params: { studentId },
      });
      return response.data as PubDocumentResponse[];
    },
    [axiosInstance]
  );

  // POST PUB Document (file + metadata)
  const uploadPubDocument = useCallback(
    async (
      file: File,
      metadata: PubDocumentRequest
    ): Promise<PubDocumentResponse> => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append(
        'metadata',
        new Blob([JSON.stringify(metadata)], { type: 'application/json' })
      );

      const response = await axiosInstance.post('/documents/pub', formData, {
        validateStatus: (status) => status >= 200 && status < 300,
      });

      return response.data as PubDocumentResponse;
    },
    [axiosInstance]
  );

  return { getPubDocuments, uploadPubDocument };
};

export default usePubDocuments;
