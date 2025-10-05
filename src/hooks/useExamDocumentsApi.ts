import useAxiosInstance from '@hooks/useAxiosInstance';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@stores/index';
import {
  setDocuments,
  addDocument,
  removeDocument,
  setLoading,
  setError,
} from '@stores/slices/examDocumentsSlice';
import type {
  ExamDocumentRequest,
  ExamDocumentResponse,
  ApiResponseWrapper,
} from '@custom-types/examDocument';
import { isAxiosError } from '@custom-types/examDocument';
import { EXAM_DOCUMENTS_BASE_URL } from '@/config';

const useExamDocumentsApi = () => {
  const axiosInstance = useAxiosInstance(EXAM_DOCUMENTS_BASE_URL);
  const dispatch = useDispatch<AppDispatch>();

  const extractErrorMessage = (
    error: unknown,
    defaultMessage: string
  ): string => {
    if (isAxiosError(error)) {
      return (
        error.response?.data?.error?.message ?? error.message ?? defaultMessage
      );
    }
    return defaultMessage;
  };

  const uploadExamDocument = useCallback(
    async (file: File, examId: string, studentId: string) => {
      dispatch(setLoading());
      try {
        const formData = new FormData();
        formData.append('file', file);

        // Create a Blob for the JSON metadata to ensure proper content-type
        const metadataBlob = new Blob(
          [JSON.stringify({ examId, studentId } as ExamDocumentRequest)],
          { type: 'application/json' }
        );
        formData.append('metadata', metadataBlob);

        const response = await axiosInstance.post<
          ApiResponseWrapper<ExamDocumentResponse>
        >('/documents/exams', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data.success && response.data.data) {
          dispatch(addDocument(response.data.data));
          return response.data.data;
        } else {
          throw new Error(response.data.error?.message || 'Upload failed');
        }
      } catch (error: unknown) {
        const errorMessage = extractErrorMessage(error, 'Upload failed');
        dispatch(setError(errorMessage));
        throw error;
      }
    },
    [axiosInstance, dispatch]
  );

  const getExamDocuments = useCallback(
    async (params: { studentId?: string; examId?: string }) => {
      dispatch(setLoading());
      try {
        const response = await axiosInstance.get<
          ApiResponseWrapper<ExamDocumentResponse[]>
        >('/documents/exams', { params });

        if (response.data.success && response.data.data) {
          dispatch(setDocuments(response.data.data));
          return response.data.data;
        } else {
          throw new Error(
            response.data.error?.message || 'Failed to fetch documents'
          );
        }
      } catch (error: unknown) {
        const errorMessage = extractErrorMessage(
          error,
          'Failed to fetch documents'
        );
        dispatch(setError(errorMessage));
        throw error;
      }
    },
    [axiosInstance, dispatch]
  );

  const deleteExamDocument = useCallback(
    async (documentId: string) => {
      dispatch(setLoading());
      try {
        const response = await axiosInstance.delete(
          `/documents/exams/${documentId}`
        );

        // 204 No Content returns no data
        if (response.status === 204) {
          dispatch(removeDocument(documentId));
          return true;
        }

        return false;
      } catch (error: unknown) {
        const errorMessage = extractErrorMessage(error, 'Delete failed');
        dispatch(setError(errorMessage));
        throw error;
      }
    },
    [axiosInstance, dispatch]
  );

  const downloadExamDocument = useCallback(
    async (downloadUrl: string, fileName: string) => {
      try {
        const response = await axiosInstance.get(downloadUrl, {
          responseType: 'blob',
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      } catch (error: unknown) {
        const errorMessage = extractErrorMessage(error, 'Download failed');
        dispatch(setError(errorMessage));
        throw error;
      }
    },
    [axiosInstance, dispatch]
  );

  return {
    uploadExamDocument,
    getExamDocuments,
    deleteExamDocument,
    downloadExamDocument,
  };
};

export default useExamDocumentsApi;
