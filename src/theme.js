// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#0d47a1" },   // Deep Blue
    secondary: { main: "#ff6f00" }, // Amber Orange
    error: { main: "#d32f2f" },     // Professional Red
    background: { default: "#f5f5f5" }
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h4: { fontWeight: 600 },
    body1: { fontSize: "1rem" }
  }
});

export default theme;
