import { Box, Typography } from '@mui/joy';
import { FileChip } from '@agile-software/shared-components';
import { useTranslation } from 'react-i18next';
import type { FileReference } from '@custom-types/lecturerFeedback';

interface LecturerFilesSectionProps {
  files: FileReference[];
  onDownload: (downloadUrl: string) => void;
}

const LecturerFilesSection = ({
  files,
  onDownload,
}: LecturerFilesSectionProps) => {
  const { t } = useTranslation();

  if (files.length === 0) {
    return (
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
            minHeight: '80px',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FAFAF9',
          }}
        >
          <Typography
            level="body-sm"
            sx={{ color: '#8A91A8', textAlign: 'center' }}
          >
            {t('components.dokumentModal.noLecturerFiles')}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
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
        {files.map((file, index) => (
          <FileChip
            key={index}
            filename={
              file.fileName || t('components.dokumentModal.unknownFile')
            }
            onClick={() => file.downloadUrl && onDownload(file.downloadUrl)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default LecturerFilesSection;
