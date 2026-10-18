import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { navLinks } from '@config';
import { useOnClickOutside } from '@hooks';

const StyledMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }

  .hamburger {
    display: flex;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    padding: 8px;
    background: none;
    border: none;
    z-index: 200;
    position: relative;

    span {
      display: block;
      width: 24px;
      height: 2px;
      background: ${({ isOpen }) => (isOpen ? 'var(--accent)' : 'var(--muted)')};
      transition: var(--transition);
      transform-origin: left;

      &:first-child { transform: ${({ isOpen }) => isOpen ? 'rotate(45deg) translateY(-1px)' : 'none'}; }
      &:nth-child(2) { opacity: ${({ isOpen }) => isOpen ? 0 : 1}; }
      &:last-child { transform: ${({ isOpen }) => isOpen ? 'rotate(-45deg) translateY(1px)' : 'none'}; }
    }
  }

  .menu-overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(75vw, 320px);
    background: var(--bg2);
    border-left: 1px solid var(--border);
    z-index: 150;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0;
    transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
    transition: transform 0.3s var(--easing);

    ol {
      list-style: none;
      text-align: center;
      counter-reset: nav-item;

      li {
        margin: 0;
        counter-increment: nav-item;

        a {
          display: block;
          padding: 18px 32px;
          font-family: var(--font-mono);
          font-size: var(--fz-md);
          color: var(--text);
          text-decoration: none;

          &::before {
            display: block;
            content: '0' counter(nav-item);
            color: var(--accent);
            font-size: var(--fz-xs);
            margin-bottom: 4px;
          }

          &:hover { color: var(--accent); }
        }
      }
    }

    .resume-link {
      display: block;
      margin-top: 24px;
      font-family: var(--font-mono);
      font-size: var(--fz-sm);
      color: var(--accent);
      border: 1px solid var(--accent);
      padding: 14px 32px;
      border-radius: 3px;
      text-decoration: none;

      &:hover { background: rgba(200, 255, 87, 0.08); }
    }
  }
`;

const Menu = ({ isOpen, toggleMenu }) => {
  const wrapperRef = useRef(null);
  useOnClickOutside(wrapperRef, () => isOpen && toggleMenu());

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <StyledMenu isOpen={isOpen} ref={wrapperRef}>
      <button className="hamburger" onClick={toggleMenu} aria-label="Menu">
        <span /><span /><span />
      </button>

      <div className="menu-overlay">
        <ol>
          {navLinks.map(({ url, name }) => (
            <li key={name}>
              <Link to={url} onClick={toggleMenu}>{name}</Link>
            </li>
          ))}
        </ol>
        <a href="/resume.pdf" className="resume-link" target="_blank" rel="noopener noreferrer">
          Resume ↗
        </a>
      </div>
    </StyledMenu>
  );
};

Menu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default Menu;
