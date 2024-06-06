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

export default function ModalLock({
  open,
  setOpen,
  id,
  setId,
  status,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number | null;
  setId: React.Dispatch<React.SetStateAction<number | null>>;
  status: string;
}) {
  const handleClose = () => {
    setOpen(false);
    setId(null);
  };
  const router = useRouter();
  const handleLock = async () => {
    const toastId = toast.loading("Đang gửi yêu cầu...", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    try {
      await room.updateLock(id!, status === "lock" ? false : true);
      router.refresh();
      handleClose();
      toast.update(toastId, {
        render: "Update Lock successfully",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      setId(null);
    } catch (error) {
      toast.update(toastId, {
        render: "Update Lock failed",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      setId(null);
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
            {status === "lock"
              ? "Do you want to unlock this room ?"
              : "Do you want to lock this room ?"}
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
              onClick={handleLock}
            >
              {status === "lock" ? "Unlock" : "Lock"}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
