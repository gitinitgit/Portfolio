import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 1000px;
`;

const StyledInner = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 80px;
  align-items: start;

  @media (max-width: 768px) {
    display: block;
  }
`;

const StyledText = styled.div`
  p {
    color: var(--muted);
    font-weight: 300;
    margin-bottom: 18px;
    line-height: 1.8;
    font-size: var(--fz-md);

    a { ${({ theme }) => theme.mixins.inlineLink}; }

    strong {
      color: var(--text);
      font-weight: 500;
    }
  }

  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    gap: 0 10px;
    padding: 0;
    margin: 28px 0 0;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      color: var(--muted);

      &::before {
        content: '▸';
        position: absolute;
        left: 0;
        color: var(--accent);
        font-size: 10px;
        line-height: 1.6;
      }
    }
  }
`;

const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    display: block;
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    border-radius: 12px;
    overflow: hidden;
    background: var(--bg3);
    border: 1px solid var(--border);
    transition: var(--transition);

    .img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: var(--transition);
    }

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 30px -15px var(--accent);
    }
  }

  .frame {
    position: absolute;
    inset: -10px;
    border: 1px solid var(--accent);
    border-radius: 14px;
    transform: translate(12px, 12px);
    z-index: -1;
    transition: transform 0.3s var(--easing);
  }

  &:hover .frame {
    transform: translate(6px, 6px);
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sr) return;
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'JavaScript (Node.js)',
    'Python (FastAPI/Flask)',
    'SQL / PostgreSQL',
    'Express.js',
    'REST APIs',
    'Git / Linux',
    'Data Structures & Algorithms',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <StyledInner>
        <StyledText>
          <p>
            Hello! I'm <strong>Shyam Yadav</strong> and I enjoy creating things that live on the internet.
          </p>
          <p>
            My interest in software development started when I began building projects from scratch and experimenting with code.
            Since then, I have worked on projects involving backend development, APIs, databases, and VR applications, including
            a <strong>BMW Battery Manufacturing Automation VR Simulation</strong> during my internship.
          </p>
          <p>
            Currently, I focus on backend development and building efficient applications. When I'm not coding, I explore new
            technologies, solve algorithmic problems, and work on side projects.
          </p>
          <p>
            Here are a few technologies I've been working with recently:
          </p>

          <ul className="skills-list">
            {skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.png"
              width={300}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Shyam Yadav"
            />
          </div>
          <div className="frame" />
        </StyledPic>
      </StyledInner>
    </StyledAboutSection>
  );
};

export default About;
