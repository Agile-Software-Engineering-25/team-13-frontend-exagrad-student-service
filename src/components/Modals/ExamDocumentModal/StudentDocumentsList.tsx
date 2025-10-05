import { Box, CircularProgress, Typography } from '@mui/joy';
import { FileChip } from '@agile-software/shared-components';
import { useTranslation } from 'react-i18next';
import type { ExamDocumentResponse } from '@custom-types/examDocument';

interface StudentDocumentsListProps {
  uploadedFiles: ExamDocumentResponse[];
  examDocuments: ExamDocumentResponse[];
  loading: boolean;
  uploading: boolean;
  canDelete: boolean;
  onDelete: (documentId: string) => void;
  onDownload: (doc: ExamDocumentResponse) => void;
}

export const StudentDocumentsList = ({
  uploadedFiles,
  examDocuments,
  loading,
  uploading,
  canDelete,
  onDelete,
  onDownload,
}: StudentDocumentsListProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Typography level="title-md" sx={{ mb: 1 }}>
        {t('components.dokumentModal.uploadedFiles')}
      </Typography>
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
          mt: 2,
        }}
      >
        {/* Uploaded files section */}

        {uploadedFiles.length > 0 && (
          <Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {uploadedFiles.map((doc, idx) => (
                <FileChip
                  key={doc.id || doc.fileName + idx}
                  filename={
                    doc.fileName ||
                    t(
                      'components.dokumentModal.unknownFile',
                      'Unbekannte Datei'
                    )
                  }
                  onDelete={canDelete ? () => onDelete(doc.id) : undefined}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Only show loading spinner if we're loading AND not currently uploading */}
        {loading &&
          !uploading &&
          examDocuments.length === 0 &&
          uploadedFiles.length === 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
              <CircularProgress size="sm" />
            </Box>
          )}

        {!loading &&
          examDocuments.length === 0 &&
          uploadedFiles.length === 0 && (
            <Box sx={{ py: 3, textAlign: 'center' }}>
              <Typography level="body-sm" color="neutral">
                {t(
                  'components.dokumentModal.noDocuments',
                  'Keine Dokumente hochgeladen'
                )}
              </Typography>
            </Box>
          )}

        {examDocuments.length > 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {examDocuments.map((doc) => (
              <FileChip
                key={doc.id}
                filename={
                  doc.fileName ||
                  t('components.dokumentModal.unknownFile', 'Unbekannte Datei')
                }
                onDelete={canDelete ? () => onDelete(doc.id) : undefined}
                onClick={() => onDownload(doc)}
              />
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};
