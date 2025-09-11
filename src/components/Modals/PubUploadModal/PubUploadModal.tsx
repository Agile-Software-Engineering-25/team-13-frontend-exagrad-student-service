import { useState } from 'react';
import GenericModal from '@components/Modals/GenericModal';
import { Typography, Select, Option, Box, Button, Sheet, Table } from '@mui/joy';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FileDropzone from '@/components/Upload/FileDropzone';
import { useTranslation } from 'react-i18next';

const MockFileData = {
  '1': [
    { id: 1, name: 'Prüfungsunfähigkeitsbescheinigung_1.pdf', size: 102400, uploadedAt: new Date() },
    { id: 2, name: 'Prüfungsunfähigkeitsbescheinigung_2.pdf', size: 204800, uploadedAt: new Date() },
  ]
}

type Upload = {
  id?: string | number;
  name: string;           // filename
  size: number;           // bytes
  uploadedAt: string | Date; // upload date
};

const formatBytes = (bytes: number) => {
  if (!Number.isFinite(bytes)) return '-';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let i = 0, n = bytes;
  while (n >= 1024 && i < units.length - 1) { n /= 1024; i++; }
  return `${n.toFixed(n < 10 && i > 0 ? 1 : 0)} ${units[i]}`;
};

const formatDate = (d: string | Date) =>
  new Date(d).toLocaleString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' });

type PubUploadModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const handleClick = () => {
  alert('Upload initiated!');
};

const PubUpload = ({ open, setOpen }: PubUploadModalProps) => {
  const { t } = useTranslation();

  return (
    <>
      <GenericModal
        header={t('components.pubUploadModal.header')}
        open={open}
        setOpen={setOpen}
        disableEscape={false}
        modalDialogSX={{ minWidth: '700px' }}
      >
        <Box sx={{ mb: 2 }}>
          <Box sx={{  }}>
            <FormControl>
              <FormLabel>{t('components.pubUploadModal.fileLabel')}</FormLabel>
            </FormControl>
            
              <Box
                sx={{
                  pl: 3,
                  pr: 3,
                  pb: 3,
                  border: '2px solid',
                  borderColor: 'neutral.outlinedBorder',
                  borderRadius: 'xl',
                  minHeight: 50,
                }}>
                  <FileDropzone />

              </Box>

            <Button sx={{ mt: 2 }} onClick={handleClick}>{t('components.pubUploadModal.uploadButton')}</Button>
          </Box>

        </Box>
      </GenericModal>
    </>
  );
};

export default PubUpload;
