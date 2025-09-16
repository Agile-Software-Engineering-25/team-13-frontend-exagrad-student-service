import { Typography, Button, Box } from '@mui/joy';
import GenericModal from '@components/Modals/GenericModal';
import { useTranslation } from 'react-i18next';

type DocumentModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const DocumentModal = ({ open, setOpen }: DocumentModalProps) => {
  const { t } = useTranslation();

  return (
    <GenericModal
      header={t('components.dokumentModal.header')}
      open={open}
      setOpen={setOpen}
      modalDialogSX={{ minWidth: '700px' }}
    >
      <Box>
        <Box>
          <Typography level='title-md'>
            {t('components.dokumentModal.uploadFiles')}
          </Typography>
        </Box>
        <Box>
          <Typography level='title-md'>
            {t('components.dokumentModal.lecturerFiles')}
          </Typography>
        </Box>
      </Box>
      <Button variant="solid" color="primary" sx={{ mt: 2, float: 'right' }}>
        {t('components.dokumentModal.submissionButton')}
      </Button>
    </GenericModal>
  );
};

export default DocumentModal;
