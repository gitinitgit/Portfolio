import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled, { css } from 'styled-components';
import { navLinks } from '@config';
import { loaderDelay } from '@utils';
import { useScrollDirection, usePrefersReducedMotion } from '@hooks';
import { IconLogo } from '@components/icons';
import Menu from './menu';

const StyledHeader = styled.header`
  ${({ theme }) => theme.mixins.flexBetween};
  position: fixed;
  top: 0;
  z-index: 100;
  padding: 0 clamp(24px, 5vw, 72px);
  width: 100%;
  height: var(--nav-height);
  background-color: rgba(13, 13, 15, 0.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
  transition: var(--transition);

  ${props =>
    props.scrollDirection === 'up' && !props.scrolledToTop && css`
      height: var(--nav-scroll-height);
      border-bottom-color: var(--border-bright);
    `}

  ${props =>
    props.scrollDirection === 'down' && !props.scrolledToTop && css`
      height: var(--nav-scroll-height);
      transform: translateY(calc(var(--nav-scroll-height) * -1));
    `}
`;

const StyledNav = styled.nav`
  ${({ theme }) => theme.mixins.flexBetween};
  width: 100%;

  .logo {
    width: 40px;
    height: 40px;
    color: var(--accent);
    text-decoration: none;
    &:hover { color: var(--accent); }
  }

  ol {
    ${({ theme }) => theme.mixins.flexBetween};
    list-style: none;
    gap: 36px;
    counter-reset: nav-item;

    @media (max-width: 768px) { display: none; }

    li a {
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      color: var(--muted);
      letter-spacing: 0.05em;
      text-decoration: none;
      transition: color 0.2s;
      counter-increment: nav-item;

      &::before {
        content: '0' counter(nav-item) '. ';
        color: var(--accent);
      }
      &:hover { color: var(--text); }
    }
  }

  .resume-link {
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    color: var(--accent);
    border: 1px solid var(--accent);
    padding: 8px 18px;
    border-radius: 3px;
    text-decoration: none;
    transition: all 0.2s;
    letter-spacing: 0.05em;
    margin-left: 20px;

    @media (max-width: 768px) { display: none; }

    &:hover { background: rgba(200, 255, 87, 0.08); color: var(--accent); }
  }
`;

const Nav = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const scrollDirection = useScrollDirection('down');
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleScroll = () => setScrolledToTop(window.pageYOffset < 50);

  useEffect(() => {
    if (prefersReducedMotion) { setIsMounted(true); return; }
    const timeout = setTimeout(() => setIsMounted(true), loaderDelay);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const timeout = prefersReducedMotion ? 0 : 300;
  const fadeClass = prefersReducedMotion ? '' : 'fade';
  const fadeDownClass = prefersReducedMotion ? '' : 'fadedown';

  return (
    <StyledHeader scrollDirection={scrollDirection} scrolledToTop={scrolledToTop}>
      <StyledNav>
        <TransitionGroup component={null}>
          {isMounted && (
            <CSSTransition classNames={fadeClass} timeout={timeout}>
              <Link to="/" aria-label="home" className="logo">
                <IconLogo />
              </Link>
            </CSSTransition>
          )}
        </TransitionGroup>

        <TransitionGroup component={null}>
          {isMounted && (
            <CSSTransition classNames={fadeDownClass} timeout={timeout}>
              <ol>
                {navLinks.map(({ url, name }) => (
                  <li key={name}>
                    <Link to={url}>{name}</Link>
                  </li>
                ))}
              </ol>
            </CSSTransition>
          )}
        </TransitionGroup>

        <TransitionGroup component={null}>
          {isMounted && (
            <CSSTransition classNames={fadeDownClass} timeout={timeout}>
              <a href="/resume.pdf" className="resume-link" target="_blank" rel="noopener noreferrer">
                Resume ↗
              </a>
            </CSSTransition>
          )}
        </TransitionGroup>

        <TransitionGroup component={null}>
          {isMounted && (
            <CSSTransition classNames={fadeClass} timeout={timeout}>
              <Menu isOpen={menuOpen} toggleMenu={() => setMenuOpen(!menuOpen)} />
            </CSSTransition>
          )}
        </TransitionGroup>
      </StyledNav>
    </StyledHeader>
  );
};

export default Nav;
