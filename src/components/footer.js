import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  text-align: center;
  padding: 32px 24px;
  border-top: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--muted2);
  letter-spacing: 0.05em;

  a {
    color: var(--accent);
    text-decoration: none;
    &:hover { text-decoration: underline; }
  }
`;

const Footer = () => (
  <StyledFooter>
    <p>
      Built by{' '}
      <a href="https://github.com/gitinitgit" target="_blank" rel="noreferrer">
        Shyam Yadav
      </a>{' '}
      {/* &middot; Inspired by{' '}
      <a href="https://brittanychiang.com" target="_blank" rel="noreferrer">
        Brittany Chiang
      </a> */}
    </p>
  </StyledFooter>
);

export default Footer;
