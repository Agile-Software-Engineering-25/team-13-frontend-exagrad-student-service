import { useState } from 'react';
import GenericModal from '@components/Modals/GenericModal';
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
      <GenericModal
        header={t('components.pubUploadModal.header')}
        open={open}
        setOpen={setOpen}
        disableEscape={false}
        modalDialogSX={{ minWidth: '700px' }}
      >
        <Box sx={{ mb: 2 }}>
          <Box >
            <FormControl>
              <FormLabel>{t('components.pubUploadModal.fileLabel')}</FormLabel>
            </FormControl>

            <FileDropzone 
              types={['PDF', 'PNG', 'JPG']}
              onFileChange={setFile}
            />

            <Button sx={{ mt: 2 }} onClick={() => { if (file) FileUploader(file); }} disabled={!file}>{t('components.pubUploadModal.uploadButton')}</Button>
          </Box>

        </Box>
      </GenericModal>
    </>
  );
};

export default PubUpload;
