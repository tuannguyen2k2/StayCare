import { Button, ButtonProps } from "@mui/material";

interface DotButtonProps extends ButtonProps {
  seleted?: boolean;
}

const DotButton = ({ seleted, ...props }: DotButtonProps) => {
  return (
    <Button
      variant={seleted ? "contained" : "outlined"}
      sx={{
        height: 20,
        width: 20,
        minWidth: 0,
        p: 0,
        borderRadius: "50%",
        border: 3,
        color: "white",
        bgcolor: seleted ? "white" : "transparent",
        "&:hover": {
          borderColor: "white",
          color: "white",
          bgcolor: seleted ? "white" : "rgba(0, 0, 0, 0.3)",
        },
      }}
      {...props}
    />
  );
};

export default DotButton;
