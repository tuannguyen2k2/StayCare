"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { room } from "@/clientApi/room";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

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

export default function ModalDelete({
  open,
  setOpen,
  id,
  setId,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number | null;
  setId: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const handleClose = () => {
    setOpen(false);
    setId(null);
  };
  const router = useRouter();
  const handleDelete = async () => {
    const toastId = toast.loading("Đang gửi yêu cầu...", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    try {
      await room.deleteRoom(id!);
      router.refresh();
      handleClose();
      toast.update(toastId, {
        render: "Delete room successfully",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      toast.update(toastId, {
        render: "Delete room failed",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
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
          <Typography variant="h6" component="h2">
            Do you want to delete this room ?
          </Typography>
          <div className="flex justify-end gap-8 mt-12">
            <Button
              variant="outlined"
              className="bg-slate-500 text-black"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              className="text-black"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
