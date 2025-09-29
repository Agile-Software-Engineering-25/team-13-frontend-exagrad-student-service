import { useState } from 'react';
import GenericModal from '@components/Modals/GenericModal';
import { Box, Button, Input, Typography } from '@mui/joy';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FileDropzone from '@/components/FileDropzone/FileDropzone';
import { useTranslation } from 'react-i18next';

const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/; // DD.MM.YYYY

type PubUploadModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const PubUpload = ({ open, setOpen }: PubUploadModalProps) => {
  const { t } = useTranslation();

  const FileUploader = (file: File) => {
    alert(`Uploading file: ` + file.name);
  };

  const [file, setFile] = useState<File | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errors, setErrors] = useState<{ start?: string; end?: string; range?: string }>({});

  const validateDateField = (value: string, field: 'start' | 'end') => {
    if (!dateRegex.test(value)) {
      setErrors((prev) => ({ ...prev, [field]: t('components.pubUploadModal.dateError') }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateDates = () => {
    const newErrors: { start?: string; end?: string; range?: string } = {};

    if (!dateRegex.test(startDate)) {
      newErrors.start = t('components.pubUploadModal.dateError');
    }
    if (!dateRegex.test(endDate)) {
      newErrors.end = t('components.pubUploadModal.dateError');
    }

    if (dateRegex.test(startDate) && dateRegex.test(endDate)) {
      const [sd, sm, sy] = startDate.split('.').map(Number);
      const [ed, em, ey] = endDate.split('.').map(Number);
      const start = new Date(sy, sm - 1, sd);
      const end = new Date(ey, em - 1, ed);
      if (start > end) {
        newErrors.range = t('components.pubUploadModal.rangeError');
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpload = () => {
    if (!validateDates()) return;
    if (file) FileUploader(file);
  };

  return (
    <GenericModal
      header={t('components.pubUploadModal.header')}
      open={open}
      setOpen={setOpen}
      disableEscape={false}
      modalDialogSX={{ minWidth: '700px' }}
    >
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography level="body-md">{t('components.pubUploadModal.from')}</Typography>
          <FormControl sx={{ flex: 1 }}>
            <Input
              placeholder={t('components.pubUploadModal.dateFormat')}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              onBlur={() => validateDateField(startDate, 'start')}
            />
            {errors.start && (
              <Typography level="body-sm" color="danger">
                {errors.start}
              </Typography>
            )}
          </FormControl>

          <Typography level="body-md">{t('components.pubUploadModal.to')}</Typography>

          <FormControl sx={{ flex: 1 }}>
            <Input
              placeholder={t('components.pubUploadModal.dateFormat')}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              onBlur={() => validateDateField(endDate, 'end')}
            />
            {errors.end && (
              <Typography level="body-sm" color="danger">
                {errors.end}
              </Typography>
            )}
          </FormControl>
        </Box>

        {errors.range && (
          <Typography level="body-sm" color="danger" sx={{ mb: 2 }}>
            {errors.range}
          </Typography>
        )}

        <FormControl>
          <FormLabel>{t('components.pubUploadModal.fileLabel')}</FormLabel>
        </FormControl>

        <FileDropzone types={['PDF', 'PNG', 'JPG']} onFileChange={setFile} />

        <Button sx={{ mt: 2 }} onClick={handleUpload} disabled={!file}>
          {t('components.pubUploadModal.uploadButton')}
        </Button>
      </Box>
    </GenericModal>
  );
};

export default PubUpload;
