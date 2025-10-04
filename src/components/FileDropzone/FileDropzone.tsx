import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { Box, IconButton } from '@mui/joy';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

//kann weg?

type FileDropzoneProps = {
  types?: string[]; //default all file types
  multiple?: boolean; //default false
  showStatus?: boolean; // default: true
  onFileChange?: (file: File | null) => void;
};

const FilePreview = ({
  file,
  onDelete,
}: {
  file: File;
  onDelete: () => void;
}) => {
  return (
    <Box
      sx={{
        pl: 1,
        border: '2px solid',
        borderColor: 'neutral.outlinedBorder',
        borderRadius: 'xl',
        minHeight: 30,
        display: 'inline-flex',
        width: 'fit-content',
        alignItems: 'center',
      }}
    >
      {file.name}

      <IconButton
        size="sm"
        variant="plain"
        color="neutral"
        aria-label="Auswahl löschen"
        onClick={onDelete}
        sx={{
          '&:hover': {
            backgroundColor: 'transparent',
            '& svg': {
              color: 'gray', // X turns gray on hover
            },
          },
        }}
      >
        <CloseRoundedIcon />
      </IconButton>
    </Box>
  );
};

function FileDropzone({
  types,
  multiple,
  showStatus = true,
  onFileChange,
}: FileDropzoneProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (files: File | File[]) => {
    const first = Array.isArray(files) ? files[0] : (files ?? null);
    setFile(first ?? null);
    onFileChange?.(first ?? null);
  };

  const handleDelete = () => {
    setFile(null);
    onFileChange?.(null);
  };

  return (
    <>
      <FileUploader
        handleChange={handleChange}
        name="file"
        types={types}
        children={void 0}
        multiple={multiple}
      />

      {showStatus && (
        <Box sx={{ mt: 3, mb: 1 }}>
          {file ? (
            <FilePreview file={file} onDelete={handleDelete} />
          ) : (
            <Box sx={{ minHeight: 30, ml: 1 }}>Keine Datei ausgewählt</Box>
          )}
        </Box>
      )}
    </>
  );
}

export default FileDropzone;
