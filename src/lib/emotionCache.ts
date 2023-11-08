/**
 * The content of this file was copied from the official MaterialUI + NextJS Pages example
 * https://github.com/mui/material-ui/blob/e8773b238283c8174be427cca756a238e7e3545a/examples/material-ui-nextjs-pages-router-ts/src/createEmotionCache.ts
 *
 * It is essentially here to avoid issues with SSG rendering and
 * to avoid creating <style> tags inside the <body>.
 *
 * Those issues are discussed here:
 * https://github.com/mui/material-ui/issues/26561
 */
import createCache from "@emotion/cache";

const isBrowser = typeof document !== "undefined";

// On the client side, Create a meta tag at the top of the <head> and set it as insertionPoint.
// This assures that MUI styles are loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
export default function createEmotionCache() {
  let insertionPoint;

  if (isBrowser) {
    const emotionInsertionPoint = document.querySelector<HTMLMetaElement>(
      'meta[name="emotion-insertion-point"]',
    );
    insertionPoint = emotionInsertionPoint ?? undefined;
  }

  return createCache({ key: "mui-style", insertionPoint });
}
