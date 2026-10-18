import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './src/styles/theme';
import GlobalStyle from './src/styles/GlobalStyle';

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {element}
  </ThemeProvider>
);

// Inject font preload links + critical inline CSS to prevent FOUC
export const onRenderBody = ({ setHeadComponents, setBodyAttributes }) => {
  setHeadComponents([
    // Preconnect to Google Fonts for faster DNS + TLS
    <link
      key="preconnect-google-fonts"
      rel="preconnect"
      href="https://fonts.googleapis.com"
    />,
    <link
      key="preconnect-google-fonts-static"
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />,
    // Load Google Fonts as a proper stylesheet link (not @import inside JS)
    <link
      key="google-fonts"
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;1,9..40,300&display=swap"
    />,
    // Critical inline CSS: ensures the page has correct bg/colors even before
    // styled-components hydrates. This kills the white flash completely.
    <style
      key="critical-css"
      dangerouslySetInnerHTML={{
        __html: `
          :root {
            --bg: #0d0d0f;
            --bg2: #141418;
            --bg3: #1c1c22;
            --border: rgba(255,255,255,0.07);
            --border-bright: rgba(255,255,255,0.15);
            --accent: #c8ff57;
            --accent2: #57ffd4;
            --accent3: #ff8c57;
            --text: #f0efe8;
            --muted: #888880;
            --muted2: #5a5a55;
            --font-display: 'Syne', sans-serif;
            --font-mono: 'DM Mono', monospace;
            --font-sans: 'DM Sans', sans-serif;
            --nav-height: 72px;
          }
          html {
            background-color: #0d0d0f;
          }
          body {
            margin: 0;
            background-color: var(--bg);
            color: var(--text);
            font-family: var(--font-sans);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        `,
      }}
    />,
  ]);
};
