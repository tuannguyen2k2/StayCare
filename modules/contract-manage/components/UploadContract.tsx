import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ContractListSection from "@/modules/contract-manage/sections/ContractListSection";
import Image from "next/image";
import { FilePond } from "react-filepond";
import { FilePondFile } from "filepond";
import { CommonConstants } from "@/utils/constants";
import { IContractUpload } from "@/interfaces/contract.interface";
import { contract } from "@/clientApi/contract";
import { toast } from "react-toastify";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UploadContract({
  open,
  setOpen,
  id,
  setId,
}: {
  id: number | null;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const handleClose = () => {
    setOpen(false);
    setId(null);
  };
  const [files, setFiles] = React.useState<File[]>([]);
  const [images, setImages] = React.useState<string[]>([]);
  const handleUpload = async () => {
    const body: IContractUpload = {
      contract_id: id as number,
      file_pdf: files[0],
    };
    try {
      const res = await contract.uploadContract(body);
      console.log("res", res);

      toast.success("Upload hợp đồng thành công");
      setFiles([]);
      handleClose();
    } catch (error) {
      toast.error("Upload hợp đồng thất bại");
      handleClose();
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Bạn có muốn upload hợp đồng không?
          </Typography>
          <div className="my-6">
            <Box
              display="flex"
              flexDirection="column"
              //   py={CommonConstants.spacing.verticalPadding}
            >
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
          </div>
          <div className="flex my-6 justify-between">
            <Button variant="contained" onClick={handleUpload}>
              Đồng ý
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Hủy
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
