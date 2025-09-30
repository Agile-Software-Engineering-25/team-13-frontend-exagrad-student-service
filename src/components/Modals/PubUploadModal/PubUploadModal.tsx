import { useState } from 'react';
import GenericModal from '@components/Modals/GenericModal';
import { Box, Button, Input, Typography } from '@mui/joy';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FileDropzone from '@/components/FileDropzone/FileDropzone';
import { useTranslation } from 'react-i18next';
import usePubDocuments from '@/hooks/usePubDocuments';
import type { PubDocumentRequest } from '@custom-types/pubDocument';

const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/; // DD.MM.YYYY

type PubUploadModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  studentId: string;
};

const PubUpload = ({ open, setOpen, studentId }: PubUploadModalProps) => {
  const { t } = useTranslation();
  const { uploadPubDocument } = usePubDocuments();

  const [file, setFile] = useState<File | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dateErrors, setDateErrors] = useState<{ start?: string; end?: string; range?: string }>({});
  const [loading, setLoading] = useState(false);

  const validateDateField = (value: string, field: 'start' | 'end') => {
    if (!dateRegex.test(value)) {
      setDateErrors((prev) => ({ ...prev, [field]: t('components.pubUploadModal.dateError') }));
    } else {
      setDateErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateDates = () => {
    const dateErrors: { start?: string; end?: string; range?: string } = {};

    if (!dateRegex.test(startDate)) dateErrors.start = t('components.pubUploadModal.dateError');
    if (!dateRegex.test(endDate)) dateErrors.end = t('components.pubUploadModal.dateError');

    if (dateRegex.test(startDate) && dateRegex.test(endDate)) {
      const [sd, sm, sy] = startDate.split('.').map(Number);
      const [ed, em, ey] = endDate.split('.').map(Number);
      const start = new Date(sy, sm - 1, sd);
      const end = new Date(ey, em - 1, ed);
      if (start > end) dateErrors.range = t('components.pubUploadModal.rangeError');
    }
    setDateErrors(dateErrors);
    return Object.keys(dateErrors).length === 0;
  };

  
  const handleUpload = async () => {
    if (!validateDates() || !file) return;

    setLoading(true);
    try {
      const [sd, sm, sy] = startDate.split('.').map(Number);
      const [ed, em, ey] = endDate.split('.').map(Number);

      const metadata: PubDocumentRequest = {
        studentId,
        startDate: `${sy}-${String(sm).padStart(2, '0')}-${String(sd).padStart(2, '0')}`,
        endDate: `${ey}-${String(em).padStart(2, '0')}-${String(ed).padStart(2, '0')}`,
      };

      await uploadPubDocument(file, metadata);

      setFile(null);
      setStartDate('');
      setEndDate('');
      setDateErrors({});
      setOpen(false);
    } catch (err: any) {
      console.error(err);
      alert(t('components.pubUploadModal.uploadError') + err ); // Optional: nicer UI Snackbar
    } finally {
      setLoading(false);
    }
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
            {dateErrors.start && (
              <Typography level="body-sm" color="danger">
                {dateErrors.start}
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
            {dateErrors.end && (
              <Typography level="body-sm" color="danger">
                {dateErrors.end}
              </Typography>
            )}
          </FormControl>
        </Box>

        {dateErrors.range && (
          <Typography level="body-sm" color="danger" sx={{ mb: 2 }}>
            {dateErrors.range}
          </Typography>
        )}

        <FormControl>
          <FormLabel>{t('components.pubUploadModal.fileLabel')}</FormLabel>
        </FormControl>

        <FileDropzone types={['PDF', 'PNG', 'JPG']} onFileChange={setFile} />

        <Button sx={{ mt: 2 }} onClick={handleUpload} disabled={!file || loading}>
          {loading ? t('components.pubUploadModal.uploading') : t('components.pubUploadModal.uploadButton')}
        </Button>
      </Box>
    </GenericModal>
  );
};

export default PubUpload;
