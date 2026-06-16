import { createGlobalStyle } from 'styled-components';
import fonts from './fonts';
import variables from './variables';
import TransitionStyles from './TransitionStyles';

const GlobalStyle = createGlobalStyle`
  ${fonts};
  ${variables};

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  html {
    box-sizing: border-box;
    width: 100%;
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: var(--muted2) var(--bg);
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background-color: var(--muted2); border-radius: 2px; }

  ::selection { background-color: rgba(200,255,87,0.15); color: var(--text); }

  :focus { outline: 2px dashed var(--accent); outline-offset: 3px; }
  :focus:not(:focus-visible) { outline: none; outline-offset: 0px; }
  :focus-visible { outline: 2px dashed var(--accent); outline-offset: 3px; }

  body {
    margin: 0;
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: var(--bg);
    color: var(--text);
    font-family: var(--font-sans);
    font-size: var(--fz-lg);
    line-height: 1.7;
    font-weight: 300;

    @media (max-width: 480px) { font-size: var(--fz-md); }

    &.hidden { overflow: hidden; }

    &.blur {
      overflow: hidden;
      header { background-color: transparent; }
      #content > * {
        filter: blur(5px) brightness(0.7);
        transition: var(--transition);
        pointer-events: none;
        user-select: none;
      }
    }
  }

  main {
    margin: 0 auto;
    width: 100%;
    max-width: 1600px;
    min-height: 100vh;
    padding-top: var(--nav-height);
    counter-reset: section;
  }

  section {
    margin: 0 auto;
    padding: 100px clamp(24px, 5vw, 72px);
    max-width: 1100px;

    @media (max-width: 768px) { padding: 80px clamp(20px, 4vw, 48px); }
    @media (max-width: 480px) { padding: 60px 20px; }
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0 0 10px 0;
    font-weight: 700;
    color: var(--text);
    line-height: 1.1;
    font-family: var(--font-display);
  }

  img, svg { width: 100%; max-width: 100%; vertical-align: middle; }

  svg { fill: currentColor; &.feather { fill: none; } }

  a {
    display: inline-block;
    text-decoration: none;
    color: inherit;
    position: relative;
    transition: var(--transition);
    &:hover, &:focus { color: var(--accent); }
    &.inline-link { ${({ theme }) => theme.mixins.inlineLink}; }
  }

  button { cursor: pointer; border: 0; border-radius: 0; background: none; }

  p {
    margin: 0 0 15px 0;
    color: var(--muted);
    &:last-child, &:last-of-type { margin: 0; }
    & > a { ${({ theme }) => theme.mixins.inlineLink}; }
  }

  .numbered-heading {
    display: flex;
    align-items: center;
    gap: 16px;
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    color: var(--accent);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 48px;
    font-weight: 400;

    &::before {
      counter-increment: section;
      content: '0' counter(section);
      color: var(--muted2);
      font-size: 11px;
    }

    &::after {
      content: '';
      flex: 1;
      height: 1px;
      background: var(--border-bright);
      max-width: 240px;
    }
  }

  .big-heading {
    font-family: var(--font-display);
    font-size: clamp(52px, 6vw, 84px);
    font-weight: 800;
    line-height: 0.95;
    letter-spacing: -2px;
  }

  .skip-to-content {
    ${({ theme }) => theme.mixins.button};
    position: absolute;
    top: auto;
    left: -999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
    z-index: -99;
    &:hover, &:focus {
      top: 0; left: 0;
      width: auto; height: auto;
      overflow: auto; z-index: 99;
    }
  }

  ${TransitionStyles};
`;

export default GlobalStyle;
