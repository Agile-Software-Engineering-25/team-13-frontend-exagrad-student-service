import { Typography, Button } from '@mui/joy';
import GenericModal from '@components/Modals/GenericModal';
import { useTranslation } from 'react-i18next';

type PubSubmissionModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const PubSubmissionModal = ({ open, setOpen }: PubSubmissionModalProps) => {
  const { t } = useTranslation();

  return (
    <GenericModal
      header={t('components.pubSubmissionModal.header')}
      open={open}
      setOpen={setOpen}
      modalDialogSX={{ minWidth: '700px' }}
    >
      <Typography level="title-md" sx={{ mb: 1 }}>
        {t('components.pubSubmissionModal.sampleText')}
      </Typography>
      <Button variant="solid" color="primary" sx={{ mt: 2, float: 'right' }}>
        {t('components.pubSubmissionModal.submissionButton')}
      </Button>
    </GenericModal>
  );
};

export default PubSubmissionModal;
