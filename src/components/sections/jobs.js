import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledJobsSection = styled.section`
  max-width: 900px;
`;

const StyledLayout = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 0 40px;
  align-items: start;

  @media (max-width: 768px) {
    display: block;
  }
`;

const StyledTabList = styled.div`
  position: sticky;
  top: calc(var(--nav-height) + 24px);
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--border);

  @media (max-width: 768px) {
    position: static;
    flex-direction: row;
    overflow-x: auto;
    border-left: none;
    border-bottom: 1px solid var(--border);
    margin-bottom: 32px;
  }
`;

const StyledTabButton = styled.button`
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  letter-spacing: 0.05em;
  color: ${({ isActive }) => (isActive ? 'var(--accent)' : 'var(--muted2)')};
  padding: 14px 20px;
  cursor: pointer;
  border-left: 2px solid ${({ isActive }) => (isActive ? 'var(--accent)' : 'transparent')};
  margin-left: -1px;
  background: ${({ isActive }) => isActive ? 'rgba(200,255,87,0.04)' : 'none'};
  border-right: none; border-top: none; border-bottom: none;
  text-align: left;
  white-space: nowrap;
  transition: all 0.2s;

  &:hover {
    color: var(--accent);
    background: rgba(200,255,87,0.03);
  }

  @media (max-width: 768px) {
    border-left: none;
    border-bottom: 2px solid ${({ isActive }) => (isActive ? 'var(--accent)' : 'transparent')};
    margin-left: 0;
    margin-bottom: -1px;
  }
`;

const StyledTabContent = styled.div`
  .job-title {
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.5px;
    color: var(--text);
    margin-bottom: 6px;

    .company { color: var(--accent); }
  }

  .job-range {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--muted2);
    letter-spacing: 0.08em;
    margin-bottom: 28px;
    display: flex;
    align-items: center;
    gap: 10px;

    &::before { content: ''; width: 20px; height: 1px; background: var(--muted2); }
  }

  ul {
    ${({ theme }) => theme.mixins.fancyList};
  }
`;

const Jobs = () => {
  const [activeTabId, setActiveTabId] = useState(0);
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sr) return;
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const data = useStaticQuery(graphql`
    query {
      jobs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/jobs/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              company
              location
              range
              url
            }
            html
          }
        }
      }
    }
  `);

  const jobsData = data.jobs.edges;

  return (
    <StyledJobsSection id="experience" ref={revealContainer}>
      <h2 className="numbered-heading">Where I've Worked</h2>

      <StyledLayout>
        <StyledTabList>
          {jobsData.map(({ node: { frontmatter: { company } } }, i) => (
            <StyledTabButton
              key={i}
              isActive={activeTabId === i}
              onClick={() => setActiveTabId(i)}
            >
              {company}
            </StyledTabButton>
          ))}
        </StyledTabList>

        <StyledTabContent>
          {jobsData.map(({ node: { frontmatter: { title, company, url, range }, html } }, i) =>
            activeTabId === i ? (
              <div key={i}>
                <p className="job-title">
                  {title}{' '}
                  <span className="company">
                    @{' '}
                    <a href={url} target="_blank" rel="noreferrer">
                      {company}
                    </a>
                  </span>
                </p>
                <p className="job-range">{range}</p>
                <div dangerouslySetInnerHTML={{ __html: html }} />
              </div>
            ) : null
          )}
        </StyledTabContent>
      </StyledLayout>
    </StyledJobsSection>
  );
};

export default Jobs;
