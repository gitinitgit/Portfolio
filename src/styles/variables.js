import { css } from 'styled-components';

const variables = css`
  :root {
    --bg:           #0d0d0f;
    --bg2:          #141418;
    --bg3:          #1c1c22;
    --border:       rgba(255, 255, 255, 0.07);
    --border-bright:rgba(255, 255, 255, 0.15);
    --accent:       #c8ff57;
    --accent2:      #57ffd4;
    --accent3:      #ff8c57;
    --text:         #f0efe8;
    --muted:        #888880;
    --muted2:       #5a5a55;

    --font-display: 'Syne', sans-serif;
    --font-mono:    'DM Mono', monospace;
    --font-sans:    'DM Sans', sans-serif;

    --fz-xxs:    11px;
    --fz-xs:     12px;
    --fz-sm:     13px;
    --fz-md:     15px;
    --fz-lg:     17px;
    --fz-xl:     20px;
    --fz-heading:28px;

    --border-radius: 4px;
    --nav-height: 72px;
    --nav-scroll-height: 60px;

    --tab-height: 42px;
    --tab-width:  160px;

    --easing:    cubic-bezier(0.16, 1, 0.3, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    --hamburger-width: 30px;
  }
`;

export default variables;
