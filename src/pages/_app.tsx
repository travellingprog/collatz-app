import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";

import AppLayout, { StaticProps } from "@/components/AppLayout";
import theme from "@/lib/theme";
import createEmotionCache from "@/lib/emotionCache";

export interface MyAppProps extends AppProps<StaticProps> {
  emotionCache?: EmotionCache;
}

// the need for a custom Emotion cache is explained in lib/emotionCache
const clientSideEmotionCache = createEmotionCache();

export default function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppLayout title={pageProps.title} description={pageProps.description}>
          <Component />
        </AppLayout>
      </ThemeProvider>
    </CacheProvider>
  );
}
