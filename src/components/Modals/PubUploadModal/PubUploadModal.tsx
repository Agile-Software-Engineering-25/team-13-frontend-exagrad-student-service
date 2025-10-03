import { useState } from 'react';
import { Modal } from '@agile-software/shared-components'
import { Box, Button } from '@mui/joy';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FileDropzone from '@/components/FileDropzone/FileDropzone';
import { useTranslation } from 'react-i18next';

type PubUploadModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const PubUpload = ({ open, setOpen }: PubUploadModalProps) => {
  const { t } = useTranslation();

  const FileUploader = (file: File) => {
    // Implement the upload logic here, e.g., send the file to a server
    alert(`Uploading file: ` + file.name);
  };

  const [file, setFile] = useState<File | null>(null);

  return (
    <>
      <Modal
        header={t('components.pubUploadModal.header')}
        open={open}
        setOpen={setOpen}
        disableEscape={false}
        modalDialogSX={{ minWidth: '700px' }}
      >
        <Box sx={{ mb: 2 }}>
          <Box>
            <FormControl>
              <FormLabel>{t('components.pubUploadModal.fileLabel')}</FormLabel>
            </FormControl>

            <FileDropzone
              types={['PDF', 'PNG', 'JPG']}
              onFileChange={setFile}
            />

            <Button
              sx={{ mt: 2 }}
              onClick={() => {
                if (file) FileUploader(file);
              }}
              disabled={!file}
            >
              {t('components.pubUploadModal.uploadButton')}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default PubUpload;
