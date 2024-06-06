"use client";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#F7961D",
      light: "#fab454",
      dark: "#ec7a19",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#14274A",
      light: "#14274A",
      dark: "#005A7A",
      contrastText: "#ffffff",
    },
  },
  typography: {
    fontFamily: "inherit",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          boxShadow: "none",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "0.5rem",
        },
      },
    },
  },
});
