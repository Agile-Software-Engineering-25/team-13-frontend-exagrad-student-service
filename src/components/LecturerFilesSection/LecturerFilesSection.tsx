import { Box, Typography } from '@mui/joy';
import { FileChip } from '@agile-software/shared-components';
import { useTranslation } from 'react-i18next';

interface LecturerFilesSectionProps {
  files: string[];
}

const LecturerFilesSection = ({ files }: LecturerFilesSectionProps) => {
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
        {/*  TODO: handle empty state */}
        {/*  TODO: add onClick for download if mock data is replaced */}
        {files.map((file, index) => (
          <FileChip
            key={index}
            filename={file || t('components.dokumentModal.unknownFile')}
          />
        ))}
      </Box>
    </Box>
  );
};

export default LecturerFilesSection;
