import { Typography, Button } from '@mui/joy';
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
      <Typography level="title-md" sx={{ mb: 1 }}>
        {t('components.dokumentModal.sampleText')}
      </Typography>
      <Button variant="solid" color="primary" sx={{ mt: 2, float: 'right' }}>
        {t('components.dokumentModal.submissionButton')}
      </Button>
    </GenericModal>
  );
};

export default DocumentModal;
