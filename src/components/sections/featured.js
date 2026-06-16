import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { IconGitHub, IconExternal } from '@components/icons';

const StyledFeaturedSection = styled.section``;

const StyledProject = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;
  gap: 0;

  &:not(:last-of-type) {
    margin-bottom: 120px;
  }

  &:nth-of-type(odd) {
    .project-content { grid-column: 7 / -1; text-align: right; }
    .project-image   { grid-column: 1 / 8; }
    .project-tech-list { justify-content: flex-end; }
    .project-links   { justify-content: flex-end; }
  }

  &:nth-of-type(even) {
    .project-content { grid-column: 1 / 7; }
    .project-image   { grid-column: 6 / -1; grid-row: 1 / -1; }
  }

  @media (max-width: 768px) {
    display: block;

    .project-content {
      padding: 0;
      text-align: left !important;
    }
    .project-tech-list, .project-links { justify-content: flex-start !important; }
    .project-image { display: none; }
  }
`;

const StyledProjectContent = styled.div`
  position: relative;
  grid-row: 1 / -1;
  z-index: 2;

  .project-overline {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--accent);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 14px;
  }

  .project-title {
    font-family: var(--font-display);
    font-size: 28px;
    font-weight: 800;
    letter-spacing: -0.5px;
    color: var(--text);
    margin-bottom: 20px;
    display: block;
    text-decoration: none;
    transition: color 0.2s;

    &:hover { color: var(--accent); }
  }

  .project-description {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 22px;
    color: var(--muted);
    font-size: var(--fz-md);
    line-height: 1.75;
    font-weight: 300;
    margin-bottom: 22px;
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 22px;
    list-style: none;
    padding: 0;

    li {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--accent2);
      letter-spacing: 0.05em;
      background: rgba(87,255,212,0.06);
      border: 1px solid rgba(87,255,212,0.12);
      padding: 4px 12px;
      border-radius: 3px;
    }
  }

  .project-links {
    display: flex;
    gap: 16px;

    a {
      color: var(--muted);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      transition: all 0.2s;

      svg { width: 18px; height: 18px; }

      &:hover {
        color: var(--accent);
        transform: translateY(-2px);
      }
    }
  }
`;

const StyledProjectImage = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  grid-row: 1 / -1;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(13,13,15,0.5);
    transition: opacity 0.3s;
  }

  &:hover::after { opacity: 0.15; }

  .img-placeholder {
    aspect-ratio: 16/10;
    background: var(--bg3);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--muted2);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .gatsby-image-wrapper {
    aspect-ratio: 16/10;
    filter: grayscale(20%) contrast(1.05);
    transition: filter 0.4s;
    &:hover { filter: none; }
  }
`;

const Featured = () => {
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sr) return;
    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) =>
      sr.reveal(ref, srConfig(i * 100))
    );
  }, []);

  const data = useStaticQuery(graphql`
    query {
      featured: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/featured/" } }
        sort: { fields: [frontmatter___date], order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              date
              title
              cover {
                childImageSharp {
                  gatsbyImageData(width: 700, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                }
              }
              github
              external
              tech
            }
            html
          }
        }
      }
    }
  `);

  const featuredProjects = data.featured.edges.filter(({ node }) => node);

  return (
    <StyledFeaturedSection id="projects" ref={revealTitle}>
      <h2 className="numbered-heading">Some Things I've Built</h2>

      <div>
        {featuredProjects.map(({ node }, i) => {
          const { frontmatter, html } = node;
          const { title, tech, github, external, cover } = frontmatter;
          const image = cover ? getImage(cover) : null;

          return (
            <StyledProject key={i} ref={el => (revealProjects.current[i] = el)}>
              <StyledProjectImage className="project-image">
                {image ? (
                  <a href={external || github || '#'} target="_blank" rel="noreferrer">
                    <GatsbyImage image={image} alt={title} className="gatsby-image-wrapper" />
                  </a>
                ) : (
                  <div className="img-placeholder">Project Preview</div>
                )}
              </StyledProjectImage>

              <StyledProjectContent className="project-content">
                <p className="project-overline">Featured Project</p>
                <a href={external || github || '#'} className="project-title" target="_blank" rel="noreferrer">
                  {title}
                </a>
                <div className="project-description" dangerouslySetInnerHTML={{ __html: html }} />
                {tech && (
                  <ul className="project-tech-list">
                    {tech.map((t, j) => <li key={j}>{t}</li>)}
                  </ul>
                )}
                <div className="project-links">
                  {github && (
                    <a href={github} target="_blank" rel="noreferrer" aria-label="GitHub">
                      <IconGitHub /> GitHub
                    </a>
                  )}
                  {external && (
                    <a href={external} target="_blank" rel="noreferrer" aria-label="Live Demo">
                      <IconExternal /> Live Demo
                    </a>
                  )}
                </div>
              </StyledProjectContent>
            </StyledProject>
          );
        })}
      </div>
    </StyledFeaturedSection>
  );
};

export default Featured;
