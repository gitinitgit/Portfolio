import React from 'react';
import styled from 'styled-components';
import { socialMedia } from '@config';
import { IconGitHub, IconLinkedIn, IconTwitter } from '@components/icons';

const StyledSocial = styled.div`
  position: fixed;
  bottom: 0;
  left: clamp(16px, 2.5vw, 40px);
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
    color: var(--muted2);
    text-decoration: none;
    transition: all 0.2s;
    width: 18px;
    height: 18px;

    &:hover {
      color: var(--accent);
      transform: translateY(-3px);
    }

    svg { width: 18px; height: 18px; display: block; }
  }
`;

const iconMap = { GitHub: IconGitHub, LinkedIn: IconLinkedIn, Twitter: IconTwitter };

const Social = () => (
  <StyledSocial>
    {socialMedia.map(({ name, url }) => {
      const Icon = iconMap[name];
      return Icon ? (
        <a key={name} href={url} aria-label={name} target="_blank" rel="noreferrer">
          <Icon />
        </a>
      ) : null;
    })}
  </StyledSocial>
);

export default Social;
