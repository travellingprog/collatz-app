import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import theme, { roboto } from "@/lib/theme";

type RootLayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  description: "Create your own Collatz Loop with your desired behavior",
  title: {
    template: "%s | Collatz Loops",
    default: "Collatz Loops",
  },
};

export const viewport = {
  initialScale: 1,
  themeColor: theme.palette.primary.main,
  width: "device-width",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
