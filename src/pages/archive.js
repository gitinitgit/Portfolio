import React, { useRef, useEffect } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Layout } from '@components';
import { IconGitHub, IconExternal, IconFolder } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledMainContainer = styled.main`
  padding: 100px clamp(24px, 5vw, 72px);
  max-width: 1000px;
  margin: 0 auto;
`;

const StyledTableContainer = styled.div`
  margin: 100px -20px;

  @media (max-width: 768px) {
    margin: 50px -10px;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    .hide-on-mobile {
      @media (max-width: 768px) { display: none; }
    }

    tbody tr {
      &:hover,
      &:focus {
        td:first-child { padding-left: 20px; }
        background-color: var(--bg2);
        td { color: var(--text); }
      }

      td:first-child,
      td:last-child { white-space: nowrap; }
    }

    th, td {
      padding: 10px;
      text-align: left;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
    }

    th {
      color: var(--accent);
      font-size: var(--fz-xs);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      border-bottom: 1px solid var(--border-bright);
      padding: 10px 10px 16px;
    }

    td {
      color: var(--muted);
      padding: 12px 10px;
      border-bottom: 1px solid var(--border);
      transition: var(--transition);

      &.year { padding-right: 20px; color: var(--muted2); }

      &.title {
        font-size: var(--fz-md);
        color: var(--text);
        font-family: var(--font-sans);
        font-weight: 300;
      }

      &.company { font-size: var(--fz-xs); color: var(--muted2); }

      &.tech {
        span {
          display: inline-block;
          margin-right: 8px;
          color: var(--muted2);
        }
      }

      &.links {
        a {
          display: inline-block;
          width: 18px;
          height: 18px;
          margin-right: 10px;
          color: var(--muted2);
          text-decoration: none;
          transition: color 0.2s;
          svg { width: 18px; height: 18px; }
          &:hover { color: var(--accent); }
        }
      }
    }
  }
`;

const ArchivePage = () => {
  const revealTitle = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sr) return;
    sr.reveal(revealTitle.current, srConfig());
  }, []);

  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/projects/" } }
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

  const projects = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <Helmet title="Archive | Shyam Yadav" />
      <StyledMainContainer>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fz-sm)', color: 'var(--accent)' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'var(--accent)' }}>← Shyam Yadav</Link>
        </span>
        <h1 ref={revealTitle} style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 5vw, 60px)',
          fontWeight: 800,
          letterSpacing: '-1.5px',
          color: 'var(--text)',
          marginTop: '24px',
        }}>
          All Projects
        </h1>

        <StyledTableContainer>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Title</th>
                <th className="hide-on-mobile">Made at</th>
                <th className="hide-on-mobile">Built with</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(({ node }, i) => {
                const { date, github, external, title, tech, company } = node.frontmatter;
                return (
                  <tr key={i}>
                    <td className="year">{new Date(date).getFullYear()}</td>
                    <td className="title">{title}</td>
                    <td className="company hide-on-mobile">{company || '—'}</td>
                    <td className="tech hide-on-mobile">
                      {tech && tech.map((t, j) => <span key={j}>{t}</span>)}
                    </td>
                    <td className="links">
                      {github && <a href={github} target="_blank" rel="noreferrer" aria-label="GitHub"><IconGitHub /></a>}
                      {external && <a href={external} target="_blank" rel="noreferrer" aria-label="External"><IconExternal /></a>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </StyledTableContainer>
      </StyledMainContainer>
    </Layout>
  );
};

export default ArchivePage;
