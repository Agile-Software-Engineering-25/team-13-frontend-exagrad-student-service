import { useEffect, useState } from 'react';
import GenericModal from '@components/Modals/GenericModal';
import { Box, Button, Input, Sheet, Typography } from '@mui/joy';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FileDropzone from '@/components/FileDropzone/FileDropzone';
import { useTranslation } from 'react-i18next';
import usePubDocuments from '@/hooks/usePubDocuments';
import type {
  PubDocumentRequest,
  PubDocumentResponse,
} from '@custom-types/pubDocument';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

type PubUploadModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  studentId: string;
};

const PubUpload = ({ open, setOpen, studentId }: PubUploadModalProps) => {
  const { t } = useTranslation();
  const { uploadPubDocument, getPubDocuments } = usePubDocuments();

  const [file, setFile] = useState<File | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dateErrors, setDateErrors] = useState<{
    start?: string;
    end?: string;
    range?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState<PubDocumentResponse[]>([]);
  const dateFormatRegex = /^\d{2}\.\d{2}\.\d{4}$/;

  const isValidDate = (dateStr: string) => {
    if (!dateFormatRegex.test(dateStr)) return false;
    const [dd, mm, yyyy] = dateStr.split('.').map(Number);
    const date = new Date(yyyy, mm - 1, dd);
    return (
      date.getFullYear() === yyyy &&
      date.getMonth() === mm - 1 &&
      date.getDate() === dd
    );
  };

  const validateDateField = (value: string, field: 'start' | 'end') => {
    if (!isValidDate(value)) {
      setDateErrors((prev) => ({
        ...prev,
        [field]: t('components.pubUploadModal.dateError'),
      }));
    } else {
      setDateErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateDates = () => {
    const dateErrors: { start?: string; end?: string; range?: string } = {};
    if (!isValidDate(startDate))
      dateErrors.start = t('components.pubUploadModal.dateError');
    if (!isValidDate(endDate))
      dateErrors.end = t('components.pubUploadModal.dateError');
    if (isValidDate(startDate) && isValidDate(endDate)) {
      const [sd, sm, sy] = startDate.split('.').map(Number);
      const [ed, em, ey] = endDate.split('.').map(Number);
      const start = new Date(sy, sm - 1, sd);
      const end = new Date(ey, em - 1, ed);
      if (start > end)
        dateErrors.range = t('components.pubUploadModal.rangeError');
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
      const docs = await getPubDocuments(studentId);
      setDocuments(docs);
      setFile(null);
      setStartDate('');
      setEndDate('');
      setDateErrors({});
    } catch (err: any) {
      console.error(err);
      alert(t('components.pubUploadModal.uploadError') + err); // Optional: nicer UI Snackbar
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setStartDate('');
    setEndDate('');
    setDateErrors({});
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      (async () => {
        try {
          const docs = await getPubDocuments(studentId);
          setDocuments(docs);
        } catch (err) {
          console.error(err);
          setDocuments([]);
        }
      })();
    }
  }, [open, studentId, getPubDocuments]);

  const isFormValid =
    !!file && startDate.trim() !== '' && endDate.trim() !== '';

  const formatDateToGerman = (dateString: string) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <GenericModal
      header={t('components.pubUploadModal.header')}
      open={open}
      setOpen={handleClose}
      disableEscape={false}
      modalDialogSX={{ minWidth: '700px' }}
    >
      <Box sx={{ mb: 2}}>
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
            mb: 3
          }}
        >
          <Typography level="title-sm">
            {t('components.pubUploadModal.uploadedPubs')}
          </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography level="body-md">
            {t('components.pubUploadModal.from')}
          </Typography>
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

          <Typography level="body-md">
            {t('components.pubUploadModal.to')}
          </Typography>

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
        <Box
  sx={{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 0,
  }}
>
  <Box sx={{ flex: 1, minWidth: 0 }}>
    <FileDropzone types={['PDF', 'PNG', 'JPG']} onFileChange={setFile} />
  </Box>
  <Button
    onClick={handleUpload}
    disabled={!isFormValid || loading}
    sx={{ whiteSpace: 'nowrap' }}
  >
    {loading
      ? t('components.pubUploadModal.uploading')
      : t('components.pubUploadModal.uploadButton')}
  </Button>
</Box>
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
          <Typography level="title-sm">
            {t('components.pubUploadModal.uploadedPubs')}
          </Typography>

          {Array.isArray(documents) && documents.length === 0 ? (
            <Typography level="body-sm" color="neutral">
              {t('components.pubUploadModal.nothingUploadedYet')}
            </Typography>
          ) : (
            [...documents]
              .sort(
                (a, b) =>
                  new Date(b.startDate).getTime() -
                  new Date(a.startDate).getTime()
              )
              .map((doc) => (
                <Sheet
                  key={doc.id}
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
                    <Typography level="title-sm">
                      {formatDateToGerman(doc.startDate)} -{' '}
                      {formatDateToGerman(doc.endDate)}
                    </Typography>
                    <Typography
                      sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '90%',
                      }}
                    >
                      {doc.fileName}
                    </Typography>
                  </Box>
                  <PictureAsPdfIcon color="error" />
                </Sheet>
              ))
          )}
        </Box>
      </Box>
    </GenericModal>
  );
};

export default PubUpload;
