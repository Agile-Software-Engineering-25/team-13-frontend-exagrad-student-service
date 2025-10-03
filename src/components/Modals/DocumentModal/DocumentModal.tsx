import {
  Typography,
  Box,
  IconButton,
  Sheet,
  Divider,
  Button,
  CircularProgress,
} from '@mui/joy';
import GenericModal from '@components/Modals/GenericModal';
import { useTranslation } from 'react-i18next';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import FileDropzone from '@/components/FileDropzone/FileDropzone';
import { useState, useEffect, useCallback } from 'react';
import useExamDocumentsApi from '@hooks/useExamDocumentsApi';
import { useTypedSelector } from '@stores/rootReducer';
import type { ExamDocumentResponse } from '@custom-types/examDocument';

type Assessment = {
  assessmentTyp: string;
  weight: string;
  grade: string | 'N/A';
  date: string;
  requiresSubmission: boolean;
  examId?: string;
  deadline?: string;
};

type DocumentModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  assessment: Assessment | null;
};

const MOCK_STUDENT_ID = 'student-123'; // Replace with actual student ID from auth/context

const DocumentModal = ({ open, setOpen, assessment }: DocumentModalProps) => {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const examDocuments = documents.filter(
    (doc) => doc.examId === assessment?.examId
  );

  useEffect(() => {
    if (open && assessment?.examId) {
      getExamDocuments({ examId: assessment.examId }).catch((err) => {
        console.error('Failed to fetch documents:', err);
      });
    }
  }, [open, assessment?.examId, getExamDocuments]);

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
    setErrorMessage(null);
  };

  const handleUpload = async () => {
    if (!selectedFile || !assessment?.examId) return;

    if (isDeadlinePassed()) {
      setErrorMessage('Deadline has passed. Upload is no longer allowed.');
      return;
    }

    setUploading(true);
    setErrorMessage(null);
    try {
      await uploadExamDocument(
        selectedFile,
        assessment.examId,
        MOCK_STUDENT_ID
      );
      setSelectedFile(null);
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.error?.message || error.message || 'Upload failed'
      );
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (documentId: string) => {
    if (!canDelete) {
      setErrorMessage('Deadline has passed. Deletion is no longer allowed.');
      return;
    }

    setErrorMessage(null);
    try {
      await deleteExamDocument(documentId);
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.error?.message || error.message || 'Delete failed'
      );
    }
  };

  const handleDownload = async (doc: ExamDocumentResponse) => {
    setErrorMessage(null);
    try {
      await downloadExamDocument(doc.downloadUrl, doc.fileName);
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.error?.message ||
          error.message ||
          'Download failed'
      );
    }
  };

  const lecturerFiles = [
    'ThisIsAGreatFileNameExampleAsWellIsItNotYesItIs.pdf',
    'ThisIsAGreatFileNameExample.pdf',
  ];

  return (
    <GenericModal
      header={t('components.dokumentModal.header')}
      open={open}
      setOpen={setOpen}
      modalDialogSX={{ minWidth: '700px' }}
    >
      <Box>
        {errorMessage && (
          <Box
            sx={{
              p: 2,
              mb: 2,
              backgroundColor: 'danger.softBg',
              borderRadius: 'md',
            }}
          >
            <Typography level="body-sm" color="danger">
              {errorMessage}
            </Typography>
          </Box>
        )}

        {isDeadlinePassed() && (
          <Box
            sx={{
              p: 2,
              mb: 2,
              backgroundColor: 'warning.softBg',
              borderRadius: 'md',
            }}
          >
            <Typography level="body-sm" color="warning">
              Deadline has passed. Upload and deletion are no longer available.
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'flex-start',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Typography level="title-md">
              {t('components.dokumentModal.uploadFiles')}
            </Typography>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              p: 2,
              border: '1px solid #C2CAD5',
              borderRadius: 'lg',
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              width: '100%',
            }}
          >
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Box sx={{ flexGrow: 1 }}>
                <FileDropzone
                  onFileChange={handleFileChange}
                  showStatus={false}
                />
              </Box>
              <Button
                onClick={handleUpload}
                disabled={!selectedFile || uploading || isDeadlinePassed()}
                loading={uploading}
                variant="solid"
                color="primary"
              >
                Upload
              </Button>
            </Box>

            {selectedFile && (
              <Typography level="body-sm" sx={{ ml: 1 }}>
                Selected: {selectedFile.name}
              </Typography>
            )}

            {loadingState === 'loading' && !uploading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                <CircularProgress size="sm" />
              </Box>
            )}

            {examDocuments.map((doc) => (
              <Sheet
                key={doc.id}
                variant="outlined"
                sx={{
                  borderRadius: 50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: 1.5,
                  py: 0.5,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton
                    size="sm"
                    color="neutral"
                    variant="plain"
                    onClick={() => handleDelete(doc.id)}
                    disabled={!canDelete}
                    title={
                      canDelete
                        ? 'Delete document'
                        : 'Cannot delete after deadline'
                    }
                  >
                    <CloseRoundedIcon />
                  </IconButton>
                  <Typography
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '90%',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleDownload(doc)}
                  >
                    {doc.fileName}
                  </Typography>
                </Box>
                <PictureAsPdfIcon color="error" />
              </Sheet>
            ))}
          </Box>
        </Box>
        <Divider sx={{ my: 2, width: '100%', mt: 4 }} />
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'flex-start',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Typography level="title-md">
              {t('components.dokumentModal.lecturerFiles')}
            </Typography>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              p: 2,
              border: '1px solid #C2CAD5',
              borderRadius: 'lg',
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              width: '100%',
            }}
          >
            {lecturerFiles.map((file, index) => (
              <Sheet
                key={index}
                variant="outlined"
                sx={{
                  borderRadius: 50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: 1.5,
                  py: 0.5,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton size="sm" color="neutral" variant="plain">
                    <FileDownloadRoundedIcon />
                  </IconButton>
                  <Typography
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '90%',
                    }}
                  >
                    {file}
                  </Typography>
                </Box>
                <PictureAsPdfIcon color="error" />
              </Sheet>
            ))}
          </Box>
        </Box>
      </Box>
    </GenericModal>
  );
};

export default DocumentModal;
