import { Roboto } from "next/font/google";
import { amber, teal } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// add custom variable loopNumber to Theme type
declare module "@mui/material/styles" {
  interface Theme {
    loopNumber: {
      even: string;
      odd: string;
    };
  }
  interface ThemeOptions {
    loopNumber?: {
      even?: string;
      odd?: string;
    };
  }
}

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  loopNumber: {
    even: amber[900],
    odd: teal.A700,
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
