import { useEffect, useState } from 'react';
import { Modal } from '@agile-software/shared-components';
import { Box, Button, Input, Typography } from '@mui/joy';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import { Dropzone, FileChip } from '@agile-software/shared-components';
import { useTranslation } from 'react-i18next';
import usePubDocuments from '@/hooks/usePubDocuments';
import type {
  PubDocumentRequest,
  PubDocumentResponse,
} from '@custom-types/pubDocument';

type PubUploadModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  studentId: string;
};

const dateFormatRegex = /^\d{2}\.\d{2}\.\d{4}$/;

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
  const [dropzoneKey, setDropzoneKey] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleFileSelect = (files: File | File[]) => {
    const selectedFile = Array.isArray(files) ? files[0] : files;
    setFile(selectedFile);
  };
  const handleSelectedFileDelete = () => {
    setFile(null);

  };

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

  const checkDatesValidity = () => {
    const errors: typeof dateErrors = {};

    if (!isValidDate(startDate))
      errors.start = t('components.pubUploadModal.dateError');
    if (!isValidDate(endDate))
      errors.end = t('components.pubUploadModal.dateError');

    if (isValidDate(startDate) && isValidDate(endDate)) {
      const [dd, mm, yyyy] = startDate.split('.').map(Number);
      const [ed, em, ey] = endDate.split('.').map(Number);

      const start = new Date(yyyy, mm - 1, dd);
      const end = new Date(ey, em - 1, ed);

      if (start > end) errors.range = t('components.pubUploadModal.rangeError');
    }

    return errors;
  };

  const validateDateField = (value: string, field: 'start' | 'end') => {
    const newErrors = { ...dateErrors };

    if (!isValidDate(value)) {
      newErrors[field] = t('components.pubUploadModal.dateError');
    } else {
      delete newErrors[field];
    }

    if (isValidDate(startDate) && isValidDate(endDate)) {
      const start = field === 'start' ? value : startDate;
      const end = field === 'end' ? value : endDate;

      const [sd, sm, sy] = start.split('.').map(Number);
      const [ed, em, ey] = end.split('.').map(Number);

      const startDateObj = new Date(sy, sm - 1, sd);
      const endDateObj = new Date(ey, em - 1, ed);

      if (startDateObj > endDateObj) {
        newErrors.range = t('components.pubUploadModal.rangeError');
      } else {
        delete newErrors.range;
      }
    }

    setDateErrors(newErrors);
  };

  const handleUpload = async () => {
    const errors = checkDatesValidity();
    if (!file || Object.keys(errors).length > 0) {
      setDateErrors(errors);
      return;
    }

    setShowConfirmModal(true);
  };

  const confirmUpload = async () => {
    if (!file) return;

    setShowConfirmModal(false);
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
      setDocuments(await getPubDocuments(studentId));
      setFile(null);
      setStartDate('');
      setEndDate('');
      setDateErrors({});
      setDropzoneKey((prev) => prev + 1);
    } catch (err: unknown) {
      console.error(err);
      alert(t('components.pubUploadModal.uploadError') + err);
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
    if (!open) return;
    getPubDocuments(studentId)
      .then(setDocuments)
      .catch((err) => {
        console.error(err);
        setDocuments([]);
      });
  }, [open, studentId, getPubDocuments]);

  const isFormValid = !!file && Object.keys(checkDatesValidity()).length === 0;

  const formatDateToGerman = (dateString: string) => {
    const d = new Date(dateString);
    return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
  };


  return (
    <>
      <Modal
        header={t('components.pubUploadModal.header')}
        open={open}
        setOpen={handleClose}
        disableEscape={false}
        modalDialogSX={{ minWidth: '700px' }}
      >
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{
              flexGrow: 1,
              p: 2,
              border: '1px solid #C2CAD5',
              borderRadius: 'lg',
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              mb: 3,
            }}
          >
            <Typography level="title-sm">
              {t('components.pubUploadModal.uploadPub')}
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
                <Dropzone
                  key={dropzoneKey}
                  types={['PDF', 'PNG', 'JPG']}
                  onFileSelect={handleFileSelect}
                />
                {file && (
                  <Box sx={{ mt: 1 }}>
                    <FileChip
                    filename={file.name} 
                    showFileExtension={true}
                    onDelete={handleSelectedFileDelete}
                    />
                  </Box>
                )}
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
            }}
          >
            <Typography level="title-sm">
              {t('components.pubUploadModal.uploadedPubs')}
            </Typography>

            {documents.length === 0 ? (
              <Typography level="body-sm" color="neutral">
                {t('components.pubUploadModal.nothingUploadedYet')}
              </Typography>
            ) : (
              documents
                .slice()
                .sort(
                  (a, b) =>
                    new Date(b.startDate).getTime() -
                    new Date(a.startDate).getTime()
                )
                .map((doc) => (
                  <FileChip
                    key={doc.id}
                    filename={`${formatDateToGerman(doc.startDate)} - ${formatDateToGerman(doc.endDate)} ${doc.fileName}`}
                      containerSX={{ width: '100%' }}
 />
                ))
            )}
          </Box>
          
        </Box>
      </Modal>

      <Modal
        header={t('components.pubUploadModal.confirmHeader')}
        open={showConfirmModal}
        setOpen={setShowConfirmModal}
        disableEscape={false}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography level="body-md">
            {t('components.pubUploadModal.confirmMessage')}
          </Typography>
          <Typography sx={{ textAlign: 'center' }}>
            {t('components.pubUploadModal.timePeriod')}
            {startDate} - {endDate}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => setShowConfirmModal(false)}
            >
              {t('components.pubUploadModal.cancel')}
            </Button>
            <Button onClick={confirmUpload}>
              {t('components.pubUploadModal.confirmUpload')}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default PubUpload;
