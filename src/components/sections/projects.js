import React, { useState, useEffect, useRef } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { IconFolder, IconGitHub, IconExternal } from '@components/icons';

const GRID_LIMIT = 6;

const StyledProjectsSection = styled.section`
  padding-top: 0;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 48px;

  h2 {
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    color: var(--accent);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 400;
    &::before { display: none; }
    &::after { display: none; }
  }

  a {
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    color: var(--accent);
    text-decoration: none;
    transition: gap 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
    &:hover { gap: 14px; }
  }
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
`;

const StyledCard = styled.div`
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s var(--easing), border-color 0.3s, box-shadow 0.3s;
  cursor: default;

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(200,255,87,0.2);
    box-shadow: 0 16px 48px rgba(0,0,0,0.4);
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24px;

    .folder { color: var(--accent); width: 36px; height: 36px; }

    .card-links {
      display: flex;
      gap: 12px;

      a {
        color: var(--muted2);
        text-decoration: none;
        transition: color 0.2s;
        width: 18px; height: 18px;

        svg { width: 18px; height: 18px; display: block; }
        &:hover { color: var(--accent); }
      }
    }
  }

  .card-title {
    font-family: var(--font-display);
    font-size: 19px;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 12px;
    letter-spacing: -0.3px;
    line-height: 1.2;
  }

  .card-desc {
    font-size: 14px;
    color: var(--muted);
    font-weight: 300;
    line-height: 1.7;
    flex: 1;
    margin-bottom: 24px;
  }

  .card-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    span {
      font-family: var(--font-mono);
      font-size: 10px;
      color: var(--muted2);
      letter-spacing: 0.05em;
      &:not(:last-child)::after { content: ' ·'; }
    }
  }
`;

const Projects = () => {
  const [showMore, setShowMore] = useState(false);
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sr) return;
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const data = useStaticQuery(graphql`
    query {
      projects: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/content/projects/" }
          frontmatter: { showInProjects: { ne: false } }
        }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              date
              title
              tech
              github
              external
              company
            }
            html
          }
        }
      }
    }
  `);

  const projects = data.projects.edges.filter(({ node }) => node);
  const firstSix = projects.slice(0, GRID_LIMIT);
  const projectsToShow = showMore ? projects : firstSix;

  return (
    <StyledProjectsSection ref={revealContainer}>
      <StyledHeader>
        <h2>Other Noteworthy Projects</h2>
        <Link to="/archive">view the archive →</Link>
      </StyledHeader>

      <StyledGrid>
        {projectsToShow.map(({ node }, i) => {
          const { frontmatter, html } = node;
          const { github, external, title, tech } = frontmatter;

          return (
            <StyledCard key={i}>
              <div className="card-top">
                <div className="folder"><IconFolder /></div>
                <div className="card-links">
                  {github && (
                    <a href={github} target="_blank" rel="noreferrer" aria-label="GitHub">
                      <IconGitHub />
                    </a>
                  )}
                  {external && (
                    <a href={external} target="_blank" rel="noreferrer" aria-label="Live">
                      <IconExternal />
                    </a>
                  )}
                </div>
              </div>
              <p className="card-title">{title}</p>
              <div className="card-desc" dangerouslySetInnerHTML={{ __html: html }} />
              {tech && (
                <div className="card-tech">
                  {tech.map((t, j) => <span key={j}>{t}</span>)}
                </div>
              )}
            </StyledCard>
          );
        })}
      </StyledGrid>

      {projects.length > GRID_LIMIT && (
        <button
          onClick={() => setShowMore(!showMore)}
          style={{
            display: 'block',
            margin: '48px auto 0',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--fz-sm)',
            color: 'var(--accent)',
            background: 'none',
            border: '1px solid var(--accent)',
            padding: '14px 28px',
            borderRadius: '3px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          Show {showMore ? 'Less' : 'More'}
        </button>
      )}
    </StyledProjectsSection>
  );
};

export default Projects;
