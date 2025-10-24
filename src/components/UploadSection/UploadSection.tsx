import { Box, Button, Typography } from '@mui/joy';
import { FileChip, Dropzone } from '@agile-software/shared-components';
import { useTranslation } from 'react-i18next';

interface UploadSectionProps {
  selectedFiles: File[];
  uploading: boolean;
  isDeadlinePassed: boolean;
  onFileChange: (files: File | File[]) => void;
  onRemoveFile: (file: File) => void;
  onUpload: () => void;
}

const UploadSection = ({
  selectedFiles,
  uploading,
  isDeadlinePassed,
  onFileChange,
  onRemoveFile,
  onUpload,
}: UploadSectionProps) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'flex-start',
        flexDirection: 'column',
      }}
    >
      {!isDeadlinePassed && (
        <>
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
          <Dropzone multiple onFileSelect={onFileChange} />

          {/* Show FileChips for selected files */}
          {selectedFiles.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
              {selectedFiles.map((file, idx) => (
                <FileChip
                  key={`${file.name}-${idx}`}
                  filename={file.name}
                  onDelete={() => onRemoveFile(file)}
                />
              ))}
            </Box>
          )}

          <Button
            onClick={onUpload}
            disabled={selectedFiles.length === 0 || uploading}
            loading={uploading}
            variant="solid"
            color="primary"
            fullWidth
            sx={{ mt: 1 }}
          >
            {t('components.dokumentModal.uploadButton', 'Upload')}{' '}
            {selectedFiles.length > 0 ? `(${selectedFiles.length})` : ''}
          </Button>
        </Box>
        </>
      )}
    </Box>
  );
};

export default UploadSection;
