import { css } from 'styled-components';

const mixins = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  link: css`
    display: inline-block;
    text-decoration: none;
    color: inherit;
    position: relative;
    transition: var(--transition);
    &:hover,
    &:focus-visible {
      color: var(--accent);
      outline: 0;
    }
  `,

  inlineLink: css`
    display: inline-block;
    position: relative;
    color: var(--accent2);
    transition: var(--transition);
    &:after {
      content: '';
      display: block;
      width: 0;
      height: 1px;
      position: relative;
      bottom: 0.37em;
      background-color: var(--accent2);
      opacity: 0.5;
      transition: var(--transition);
    }
    &:hover:after { width: 100%; }
  `,

  button: css`
    color: var(--accent);
    background-color: transparent;
    border: 1px solid var(--accent);
    border-radius: var(--border-radius);
    font-size: var(--fz-xs);
    font-family: var(--font-mono);
    line-height: 1;
    text-decoration: none;
    padding: 1.25rem 1.75rem;
    transition: var(--transition);
    cursor: pointer;
    &:hover,
    &:focus-visible {
      outline: none;
      box-shadow: 4px 4px 0 0 var(--accent);
      transform: translate(-4px, -4px);
    }
  `,

  bigButton: css`
    color: var(--bg);
    background-color: var(--accent);
    border: none;
    border-radius: var(--border-radius);
    font-size: var(--fz-sm);
    font-family: var(--font-mono);
    font-weight: 500;
    line-height: 1;
    text-decoration: none;
    padding: 1.1rem 1.75rem;
    transition: var(--transition);
    cursor: pointer;
    &:hover,
    &:focus-visible {
      outline: none;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(200, 255, 87, 0.25);
    }
  `,

  boxShadow: css`
    box-shadow: 0 10px 30px -15px rgba(0,0,0,0.5);
    transition: var(--transition);
    &:hover,
    &:focus-visible {
      box-shadow: 0 20px 30px -15px rgba(0,0,0,0.6);
    }
  `,

  fancyList: css`
    padding: 0;
    margin: 0;
    list-style: none;
    li {
      position: relative;
      padding-left: 22px;
      margin-bottom: 10px;
      color: var(--muted);
      font-weight: 300;
      line-height: 1.7;
      &:before {
        content: '▸';
        position: absolute;
        left: 0;
        color: var(--accent);
        font-size: 10px;
        top: 5px;
      }
    }
  `,

  resetList: css`
    list-style: none;
    padding: 0;
    margin: 0;
  `,
};

export default mixins;
