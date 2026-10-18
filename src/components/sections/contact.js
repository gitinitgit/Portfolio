import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig, email, socialMedia } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { IconGitHub, IconLinkedIn, IconTwitter } from '@components/icons';

const StyledContactSection = styled.section`
  max-width: 700px;
  margin: 0 auto;
  text-align: center;

  &.numbered-heading-section h2::before { counter-increment: section; }

  .overline {
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    color: var(--accent);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 20px;
    display: block;
  }

  .title {
    font-family: var(--font-display);
    font-size: clamp(44px, 6vw, 72px);
    font-weight: 800;
    letter-spacing: -2px;
    line-height: 0.95;
    color: var(--text);
    margin-bottom: 24px;
  }

  .subtitle {
    color: var(--muted);
    font-size: var(--fz-lg);
    font-weight: 300;
    max-width: 500px;
    margin: 0 auto 48px;
    line-height: 1.75;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    font-size: var(--fz-md);
    padding: 1.25rem 2.5rem;
  }

  .social-row {
    display: flex;
    gap: 24px;
    justify-content: center;
    margin-top: 48px;
    padding-top: 48px;
    border-top: 1px solid var(--border);

    a {
      color: var(--muted2);
      text-decoration: none;
      transition: all 0.2s;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      letter-spacing: 0.05em;
      display: flex;
      align-items: center;
      gap: 8px;

      svg { width: 18px; height: 18px; }

      &:hover {
        color: var(--accent);
        transform: translateY(-2px);
      }
    }
  }
`;

const iconMap = { GitHub: IconGitHub, LinkedIn: IconLinkedIn, Twitter: IconTwitter };

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sr) return;
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <span className="overline">04. What's Next?</span>
      <h2 className="title">Get In Touch</h2>
      <p className="subtitle">
        I'm currently open to new opportunities. Whether you have a question, a project
        in mind, or just want to say hi — my inbox is always open.
      </p>
      <a className="email-link" href={`mailto:${email}`}>
        Say Hello ↗
      </a>

      <div className="social-row">
        {socialMedia.map(({ name, url }) => {
          const Icon = iconMap[name];
          return Icon ? (
            <a key={name} href={url} target="_blank" rel="noreferrer">
              <Icon /> {name}
            </a>
          ) : null;
        })}
      </div>
    </StyledContactSection>
  );
};

export default Contact;
