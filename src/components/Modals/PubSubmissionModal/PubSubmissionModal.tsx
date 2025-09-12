import { useState } from 'react';
import { Typography, Table, Button, Checkbox } from '@mui/joy';
import GenericModal from '@components/Modals/GenericModal';
import { useTranslation } from 'react-i18next';

type PubSubmissionModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const PubSubmissionModal = ({
  open,
  setOpen,
}: PubSubmissionModalProps) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleSelection = (code: string) => {
    setSelected((prev) => {
      const copy = new Set(prev);
      if (copy.has(code)) {
        copy.delete(code);
      } else {
        copy.add(code);
      }
      return copy;
    });
  };

  const handleRegister = () => {
    console.log('Angemeldet für:', Array.from(selected));
    setOpen(false);
  };

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
      <Button
        variant="solid"
        color="primary"
        sx={{ mt: 2, float: 'right' }}
        disabled={selected.size === 0}
        onClick={handleRegister}
      >
        {t('components.pubSubmissionModal.submissionButton')}
      </Button>
    </GenericModal>
  );
};

export default PubSubmissionModal;
