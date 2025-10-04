import { useState } from 'react';
import { Typography, Table, Button, Checkbox } from '@mui/joy';
import GenericModal from '@components/Modals/GenericModal';
import { useTranslation } from 'react-i18next';

//sollte weg weil sollte doch der Link nur sein oder??

type RetakeExam = {
  code: string;
  lecturer: string;
  date: string;
};

type RetakeRegistrationModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

// Mockdaten für Demo
const mockRetakes: RetakeExam[] = [
  { code: 'Kurz1', lecturer: 'Herr/Frau Dr. Dozent/in', date: '10.03.2025' },
  { code: 'Kurz2', lecturer: 'Herr/Frau Dr. Dozent/in', date: '15.03.2025' },
  { code: 'Kurz3', lecturer: 'Herr/Frau Dr. Dozent/in', date: '20.03.2025' },
  { code: 'Kurz4', lecturer: 'Herr/Frau Dr. Dozent/in', date: '25.03.2025' },
  { code: 'Kurz5', lecturer: 'Herr/Frau Dr. Dozent/in', date: '30.03.2025' },
];

const RetakeRegistrationModal = ({
  open,
  setOpen,
}: RetakeRegistrationModalProps) => {
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
      header={t('components.retakeRegistrationModal.header')}
      open={open}
      setOpen={setOpen}
      modalDialogSX={{ minWidth: '700px' }}
    >
      <Typography level="title-md" sx={{ mb: 1 }}>
        {t('components.retakeRegistrationModal.requiredRetakes')}
      </Typography>

      <Table>
        <thead>
          <tr>
            <th>{t('components.retakeRegistrationModal.table.code')}</th>
            <th>{t('components.retakeRegistrationModal.table.lecturer')}</th>
            <th>{t('components.retakeRegistrationModal.table.date')}</th>
            <th>{t('components.retakeRegistrationModal.table.register')}</th>
          </tr>
        </thead>
        <tbody>
          {mockRetakes.map((exam, idx) => (
            <tr key={idx}>
              <td>{exam.code}</td>
              <td>{exam.lecturer}</td>
              <td>{exam.date}</td>
              <td>
                <Checkbox
                  checked={selected.has(exam.code)}
                  onChange={() => toggleSelection(exam.code)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button
        variant="solid"
        color="primary"
        sx={{ mt: 2, float: 'right' }}
        disabled={selected.size === 0}
        onClick={handleRegister}
      >
        {t('components.retakeRegistrationModal.registerButton')}
      </Button>
    </GenericModal>
  );
};

export default RetakeRegistrationModal;
