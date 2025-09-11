import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "PDF" ];

function FileDropzone() {
  const [file, setFile] = useState<File | null>(null);  

const handleChange = (files: File | File[]) => {
    const first = Array.isArray(files) ? files[0] : files ?? null;
  setFile(first ?? null);
};

  return (
    <FileUploader 
        handleChange={handleChange} 
        name="file" 
        types={fileTypes} 
        children={void 0}
    />
  );
}

export default FileDropzone;