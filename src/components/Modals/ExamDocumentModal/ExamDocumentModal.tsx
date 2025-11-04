import { Box, Divider } from '@mui/joy';
import { Modal } from '@agile-software/shared-components';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import useExamDocumentsApi from '@hooks/useExamDocumentsApi';
import { useTypedSelector } from '@stores/rootReducer';
import type { ExamDocumentResponse } from '@custom-types/examDocument';
import type { Assessment } from '@custom-types/assessment';
import { isAxiosError } from '@custom-types/errors';
import { clearDocuments } from '@stores/slices/examDocumentsSlice';
import UploadSection from '@components/UploadSection/UploadSection';
import StudentDocumentsList from '@components/StudentDocumentsList/StudentDocumentsList';
import LecturerFilesSection from '@components/LecturerFilesSection/LecturerFilesSection';
import ErrorBanner from '@components/ErrorBanner/ErrorBanner';
import AssessmentInfoCard from '@components/AssessmentInfoCard/AssessmentInfoCard';
import { useUser } from '@hooks/useUser';

type ExamDocumentModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  assessment: Assessment | null;
};

const ExamDocumentModal = ({
  open,
  setOpen,
  assessment,
}: ExamDocumentModalProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { getUserId } = useUser();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
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
    if (!assessment?.date) return false;

    const match = assessment.date.match(
      /(\d{2})\.(\d{2})\.(\d{4}),\s*(\d{2}):(\d{2})/
    );
    if (!match) return false;

    const [_, day, month, year, hours, minutes] = match.map(Number);
    const deadline = new Date(year, month - 1, day, hours, minutes, 0, 0);

    return new Date() > deadline;
  }, [assessment?.date]);

  const canDelete = !isDeadlinePassed();

  // Filter documents for current exam from Redux
  const examDocuments = documents.filter(
    (doc) => doc.examId === assessment?.id
  );

  // Fetch documents when modal opens
  useEffect(() => {
    if (open && assessment?.id) {
      getExamDocuments({ examId: assessment.id }).catch((err) => {
        console.error('Failed to fetch documents:', err);
      });
    }
  }, [open, assessment?.id]);

  // Clear documents when modal closes
  useEffect(() => {
    if (!open) {
      dispatch(clearDocuments());
    }
  }, [open, dispatch]);

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
    if (selectedFiles.length === 0 || !assessment?.id) return;
    if (isDeadlinePassed()) {
      setErrorMessage('Deadline has passed. Upload is no longer allowed.');
      return;
    }

    const studentId = getUserId();
    if (!studentId) {
      setErrorMessage('Student ID not available. Please try again.');
      return;
    }

    setUploading(true);
    setErrorMessage(null);
    const errors: string[] = [];

    // Upload all files sequentially
    for (const file of selectedFiles) {
      try {
        await uploadExamDocument(file, assessment.id, studentId);
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

    // Show errors if any occurred
    if (errors.length > 0) {
      setErrorMessage(errors.join('; '));
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
      modalDialogSX={{ width: '700px', maxWidth: '90vw' }}
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

        <Divider
          sx={{ my: 2, width: '100%', mt: isDeadlinePassed() ? 2 : 4 }}
        />

        <StudentDocumentsList
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
