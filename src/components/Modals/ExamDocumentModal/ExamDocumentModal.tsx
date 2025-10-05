import { Box, Divider } from '@mui/joy';
import { Modal } from '@agile-software/shared-components';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useCallback } from 'react';
import useExamDocumentsApi from '@hooks/useExamDocumentsApi';
import { useTypedSelector } from '@stores/rootReducer';
import type { ExamDocumentResponse } from '@custom-types/examDocument';
import { isAxiosError } from '@custom-types/errors';
import { UploadSection } from '@components/UploadSection';
import { StudentDocumentsList } from '@components/StudentDocumentsList';
import LecturerFilesSection from '@components/LecturerFilesSection/LecturerFilesSection';
import ErrorBanner from '@components/ErrorBanner/ErrorBanner';
import AssessmentInfoCard from '@components/AssessmentInfoCard/AssessmentInfoCard';

type Assessment = {
  assessmentTyp: string;
  weight: string;
  grade: string | 'N/A';
  date: string;
  requiresSubmission: boolean;
  examId?: string;
  deadline?: string;
};

type ExamDocumentModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  assessment: Assessment | null;
};

const MOCK_STUDENT_ID = 'student-123'; // TODO: Replace with actual student ID from auth/context

const ExamDocumentModal = ({
  open,
  setOpen,
  assessment,
}: ExamDocumentModalProps) => {
  const { t } = useTranslation();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<ExamDocumentResponse[]>(
    []
  );
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [dropzoneKey, setDropzoneKey] = useState(0);

  const {
    uploadExamDocument,
    getExamDocuments,
    deleteExamDocument,
    downloadExamDocument,
  } = useExamDocumentsApi();

  const { documents } = useTypedSelector((state) => state.examDocuments.data);
  const loadingState = useTypedSelector((state) => state.examDocuments.state);

  const isDeadlinePassed = useCallback(() => {
    if (!assessment?.deadline) return false;
    return new Date() > new Date(assessment.deadline);
  }, [assessment]);

  const canDelete = !isDeadlinePassed();

  // Filter documents for this exam, excluding ones already in uploadedFiles
  const examDocuments = documents.filter(
    (doc) =>
      doc.examId === assessment?.examId &&
      !uploadedFiles.some((uploaded) => uploaded.id === doc.id)
  );

  // Track uploaded files in this session (not persisted)
  useEffect(() => {
    if (open) setUploadedFiles([]);
  }, [open]);

  useEffect(() => {
    if (open && assessment?.examId) {
      getExamDocuments({ examId: assessment.examId }).catch((err) => {
        console.error('Failed to fetch documents:', err);
      });
    }
  }, [open, assessment?.examId, getExamDocuments]);

  // Accepts File or File[] from Dropzone
  const handleFileChange = (files: File | File[]) => {
    setErrorMessage(null);

    // Convert to array: handle File, File[], or FileList
    let filesToAdd: File[];
    if (files instanceof File) {
      filesToAdd = [files];
    } else if (files instanceof FileList) {
      filesToAdd = Array.from(files);
    } else {
      filesToAdd = files;
    }

    // Filter out invalid files and duplicates
    const validNewFiles = filesToAdd.filter((file) => {
      // Check if file exists and has a name
      if (!file || !(file instanceof File) || !file.name) {
        return false;
      }
      // Check for duplicates
      return !selectedFiles.some((f) => f.name === file.name);
    });

    if (validNewFiles.length > 0) {
      setSelectedFiles((prev) => [...prev, ...validNewFiles]);
    }
  };

  const handleRemoveFile = (fileToRemove: File) => {
    setSelectedFiles((prev) => prev.filter((file) => file !== fileToRemove));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0 || !assessment?.examId) return;
    if (isDeadlinePassed()) {
      setErrorMessage('Deadline has passed. Upload is no longer allowed.');
      return;
    }
    setUploading(true);
    setErrorMessage(null);
    const uploaded: ExamDocumentResponse[] = [];
    const errors: string[] = [];

    // Upload all files sequentially
    for (const file of selectedFiles) {
      try {
        const result = await uploadExamDocument(
          file,
          assessment.examId,
          MOCK_STUDENT_ID
        );
        if (result) uploaded.push(result);
      } catch (error: unknown) {
        let errorMsg = 'Upload failed';
        if (isAxiosError(error)) {
          errorMsg =
            error.response?.data?.error?.message ??
            error.message ??
            'Upload failed';
        }
        errors.push(`${file.name}: ${errorMsg}`);
      }
    }

    // Only update state after all uploads complete
    if (errors.length > 0) {
      setErrorMessage(errors.join('; '));
    }

    if (uploaded.length > 0) {
      setUploadedFiles((prev) => [...prev, ...uploaded]);
      // Refresh documents from backend to ensure consistency
      await getExamDocuments({ examId: assessment.examId }).catch(() => {
        // Ignore errors - we have the uploaded files already
      });
    }

    // Clear all selected files after upload attempt (both successful and failed)
    setSelectedFiles([]);
    setDropzoneKey((prev) => prev + 1); // Reset Dropzone component
    setUploading(false);
  };

  const handleDelete = async (documentId: string) => {
    if (!canDelete) {
      setErrorMessage('Deadline has passed. Deletion is no longer allowed.');
      return;
    }

    setErrorMessage(null);
    try {
      await deleteExamDocument(documentId);
      // Remove from session uploaded files list as well
      setUploadedFiles((prev) => prev.filter((doc) => doc.id !== documentId));
    } catch (error: unknown) {
      let errorMsg = 'Delete failed';
      if (isAxiosError(error)) {
        errorMsg =
          error.response?.data?.error?.message ??
          error.message ??
          'Delete failed';
      }
      setErrorMessage(errorMsg);
    }
  };

  const handleDownload = async (doc: ExamDocumentResponse) => {
    setErrorMessage(null);
    try {
      await downloadExamDocument(doc.downloadUrl, doc.fileName);
    } catch (error: unknown) {
      let errorMsg = 'Download failed';
      if (isAxiosError(error)) {
        errorMsg =
          error.response?.data?.error?.message ??
          error.message ??
          'Download failed';
      }
      setErrorMessage(errorMsg);
    }
  };

  const lecturerFiles = ['MockDozentenDatei.pdf', 'Mock.pdf'];

  return (
    <Modal
      header={t('components.dokumentModal.header')}
      open={open}
      setOpen={setOpen}
    >
      <Box>
        <AssessmentInfoCard assessment={assessment} />

        {errorMessage && <ErrorBanner message={errorMessage} type="error" />}

        {isDeadlinePassed() && (
          <ErrorBanner
            message={t('components.dokumentModal.deadlineWarning')}
            type="warning"
          />
        )}

        <UploadSection
          key={dropzoneKey}
          selectedFiles={selectedFiles}
          uploading={uploading}
          isDeadlinePassed={isDeadlinePassed()}
          onFileChange={handleFileChange}
          onRemoveFile={handleRemoveFile}
          onUpload={handleUpload}
        />

        <Divider sx={{ my: 2, width: '100%', mt: 4 }} />

        <StudentDocumentsList
          uploadedFiles={uploadedFiles}
          examDocuments={examDocuments}
          loading={loadingState === 'loading'}
          uploading={uploading}
          canDelete={canDelete}
          onDelete={handleDelete}
          onDownload={handleDownload}
        />
      </Box>

      <Divider sx={{ my: 2, width: '100%', mt: 4 }} />

      <LecturerFilesSection files={lecturerFiles} />
    </Modal>
  );
};

export default ExamDocumentModal;
