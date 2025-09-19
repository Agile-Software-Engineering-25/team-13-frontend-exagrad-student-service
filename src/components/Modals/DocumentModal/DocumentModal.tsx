import { Typography, Box, IconButton, Sheet, Divider } from '@mui/joy';
import GenericModal from '@components/Modals/GenericModal';
import { useTranslation } from 'react-i18next';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import FileDropzone from '@/components/FileDropzone/FileDropzone';

type DocumentModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const DocumentModal = ({ open, setOpen }: DocumentModalProps) => {
  const { t } = useTranslation();

  const files = [
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
            <FileDropzone/>
            {files.map((file, index) => (
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
                    <CloseRoundedIcon />
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
            {files.map((file, index) => (
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
