import { useState } from 'react';
import { Modal, Dropzone, FileChip } from '@agile-software/shared-components'
import { Box, Button, Typography } from '@mui/joy';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
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

  const [file, setFile] = useState<File[]>([]);

  const handleFileSelect = (files: File | File[]) => {
    if (Array.isArray(files)) {
      setFile(files);
    } else {
      setFile([files]);
    }
  };

  const handleFileDelete = (fileToDelete: File) => {
    setFile(prev => prev.filter(file => file !== fileToDelete));
  };

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

            <Dropzone
              types={['PDF', 'PNG', 'JPG']}
              onFileSelect={handleFileSelect}
            />

            {file.length > 0 && (
              <Box sx={{ mt:3 }}>
                <Typography level="h4" sx={{ mb: 2 }}>
                  Selected Files ({file.length})
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {file.map((file, index) => (
                    <FileChip
                      key={`${file.name}-${index}`}
                      filename={file.name}
                      onDelete={() => handleFileDelete(file)}
                    />
                  ))}
                </Box>
                
                <Button
                  sx={{ mt: 2 }}
                  onClick={() => {
                    if (file.length > 0) {
                      file.forEach(FileUploader);
                    }
                  }}
                  disabled={file.length === 0}
                >
                  {t('components.pubUploadModal.uploadButton')}
                </Button>
              </Box>
            )}
            
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default PubUpload;
