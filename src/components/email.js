import React from 'react';
import styled from 'styled-components';
import { email } from '@config';

const StyledEmail = styled.div`
  position: fixed;
  bottom: 0;
  right: clamp(16px, 2.5vw, 40px);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  &::after {
    content: '';
    width: 1px;
    height: 80px;
    background: var(--muted2);
  }

  @media (max-width: 900px) { display: none; }

  a {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--muted2);
    letter-spacing: 0.15em;
    writing-mode: vertical-rl;
    text-decoration: none;
    transition: all 0.2s;

    &:hover {
      color: var(--accent);
      transform: translateY(-3px);
    }
  }
`;

const Email = () => (
  <StyledEmail>
    <a href={`mailto:${email}`}>{email}</a>
  </StyledEmail>
);

export default Email;
