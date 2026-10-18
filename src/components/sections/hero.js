import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  min-height: calc(100vh - var(--nav-height));
  display: flex;
  align-items: center;
  padding: 0 clamp(24px, 5vw, 72px);
  position: relative;
  overflow: hidden;

  /* subtle dot-grid bg */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(var(--border) 1px, transparent 1px),
      linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
    pointer-events: none;
  }

  /* soft accent glow */
  &::after {
    content: '';
    position: absolute;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(200,255,87,0.04) 0%, transparent 70%);
    left: -100px; bottom: -100px;
    pointer-events: none;
  }
`;

const StyledContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 700px;
`;

const StyledEyebrow = styled.div`
  font-family: var(--font-mono);
  font-size: var(--fz-sm);
  color: var(--accent);
  letter-spacing: 0.1em;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 14px;

  &::before {
    content: '';
    width: 36px;
    height: 1px;
    background: var(--accent);
  }
`;

const StyledName = styled.h1`
  font-family: var(--font-display);
  font-size: clamp(52px, 7vw, 88px);
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -2px;
  color: var(--text);
  margin-bottom: 14px;
`;

const StyledTitle = styled.h2`
  font-family: var(--font-display);
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -1.5px;
  color: var(--muted);
  margin-bottom: 36px;
`;

const StyledDesc = styled.p`
  font-size: var(--fz-lg);
  color: var(--muted);
  max-width: 500px;
  line-height: 1.8;
  margin-bottom: 52px;
  font-weight: 300;

  a {
    color: var(--accent2);
    border-bottom: 1px solid rgba(87,255,212,0.3);
    text-decoration: none;
    &:hover { border-bottom-color: var(--accent2); }
  }
`;

const StyledCTAs = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;

  .btn-primary {
    ${({ theme }) => theme.mixins.bigButton};
  }

  .btn-ghost {
    ${({ theme }) => theme.mixins.button};
    font-size: var(--fz-sm);
    padding: 1.1rem 1.75rem;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) { setIsMounted(true); return; }
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const items = [
    <StyledEyebrow>Hi, my name is</StyledEyebrow>,
    <StyledName>Shyam Yadav.</StyledName>,
    <StyledTitle>Building<br />web applications.</StyledTitle>,
    <StyledDesc>
      I'm a software engineer specializing in building exceptional digital experiences.
      Currently focused on building backend systems, APIs, and web applications through freelance projects on{' '}
      <a href="https://www.upwork.com/freelancers/~01cb88fb0a57ce2491" rel="noreferrer">Upwork</a>.
    </StyledDesc>,
    <StyledCTAs>
      <a href="#projects" className="btn-primary">View my work</a>
      <a href="#contact" className="btn-ghost">Get in touch</a>
    </StyledCTAs>,
  ];

  return (
    <StyledHeroSection id="hero">
      <StyledContent>
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={prefersReducedMotion ? 0 : 500}>
                <div style={{ transitionDelay: `${prefersReducedMotion ? 0 : i * 100}ms` }}>
                  {item}
                </div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      </StyledContent>
    </StyledHeroSection>
  );
};

export default Hero;
