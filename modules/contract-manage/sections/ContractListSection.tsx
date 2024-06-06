"use client";

import Image from "@/common/components/image";
import { CommonConstants } from "@/utils/constants";
import { Download, Upload } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { FilePondFile } from "filepond";
import { useEffect, useState } from "react";
import { FilePond } from "react-filepond";

const ContractListSection = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [images, setImages] = useState<string[]>([]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      py={CommonConstants.spacing.verticalPadding}
    >
      {/* <Box display="flex" alignItems="center">
        <Button startIcon={<Download />}>Download</Button>
        <Button startIcon={<Upload />}>Upload signed contract</Button>
      </Box> */}

      <Box>
        <FilePond
          acceptedFileTypes={["application/pdf"]}
          files={files}
          onupdatefiles={(files: FilePondFile[]) =>
            setFiles(files.map((file) => file.file as File))
          }
          allowMultiple={false}
          instantUpload={false}
        />
      </Box>

      <Box>
        {images.map((image, index) => (
          <Box key={index} height={500} width={300} position="relative">
            <Image
              src={image}
              alt=""
              fill
              style={{
                objectFit: "contain",
                width: "100%",
                height: "100%",
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ContractListSection;
