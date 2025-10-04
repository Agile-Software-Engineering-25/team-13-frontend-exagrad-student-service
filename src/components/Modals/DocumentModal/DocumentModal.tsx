import { Typography, Button, Box, IconButton, Sheet, Divider } from '@mui/joy';
import { Modal, Dropzone, FileChip } from '@agile-software/shared-components';
import { useTranslation } from 'react-i18next';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import { useState } from 'react';

type DocumentModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const DocumentModal = ({ open, setOpen }: DocumentModalProps) => {
  const { t } = useTranslation();

  const files = [
    'ThisIsAGreatFileNameExampleAsWellIsItNotYesItIs.pdf',
    'ThisIsAGreatFileNameExample.pdf',
  ];

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
    <Modal
      header={t('components.dokumentModal.header')}
      open={open}
      setOpen={setOpen}
      modalDialogSX={{ minWidth: '700px' }}
    >
      <Box>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'flex-start',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Typography level="title-md">
              {t('components.dokumentModal.uploadFiles')}
            </Typography>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              p: 2,
              //Farbe
              border: '1px solid #C2CAD5',
              borderRadius: 'lg',
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              width: '100%',
            }}
          >
            <Dropzone
              //Wenn was hochgeladen wird kommt hier white screen, no clue why
              multiple
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
        <Divider sx={{ my: 2, width: '100%', mt: 4 }} />
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'flex-start',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Typography level="title-md">
              {t('components.dokumentModal.lecturerFiles')}
            </Typography>
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
            {files.map((file, index) => (
              //Still needs to be changed to FileChip but dont know how rn
              <Sheet
                key={index}
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
                  <IconButton size="sm" color="neutral" variant="plain">
                    <FileDownloadRoundedIcon />
                  </IconButton>
                  <Typography
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '90%',
                    }}
                  >
                    {file}
                  </Typography>
                </Box>
                <PictureAsPdfIcon color="error" />
              </Sheet>
            ))}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default DocumentModal;
