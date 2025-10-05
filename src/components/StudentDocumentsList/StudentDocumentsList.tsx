import { Box, CircularProgress, Typography } from '@mui/joy';
import { FileChip } from '@agile-software/shared-components';
import { useTranslation } from 'react-i18next';
import type { ExamDocumentResponse } from '@custom-types/examDocument';

interface StudentDocumentsListProps {
  examDocuments: ExamDocumentResponse[];
  loading: boolean;
  uploading: boolean;
  canDelete: boolean;
  onDelete: (documentId: string) => void;
  onDownload: (doc: ExamDocumentResponse) => void;
}

export const StudentDocumentsList = ({
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
        {/* Show loading spinner while loading */}
        {loading && !uploading && examDocuments.length === 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
            <CircularProgress size="sm" />
          </Box>
        )}

        {/* Show empty state when not loading and no documents */}
        {!loading && examDocuments.length === 0 && (
          <Box sx={{ py: 3, textAlign: 'center' }}>
            <Typography level="body-sm" color="neutral">
              {t(
                'components.dokumentModal.noDocuments',
                'Keine Dokumente hochgeladen'
              )}
            </Typography>
          </Box>
        )}

        {/* Show document list */}
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
