import React from 'react';
import { graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';

const StyledPostContainer = styled.main`
  padding: 100px clamp(24px, 5vw, 72px);
  max-width: 760px;
  margin: 0 auto;
`;

const StyledPostHeader = styled.header`
  margin-bottom: 48px;

  .post-back {
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    color: var(--accent);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 32px;

    &:hover { gap: 14px; }
  }

  h1 {
    font-family: var(--font-display);
    font-size: clamp(28px, 4vw, 48px);
    font-weight: 800;
    letter-spacing: -1px;
    color: var(--text);
    margin-bottom: 16px;
  }

  .post-meta {
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    color: var(--muted2);
    letter-spacing: 0.05em;
  }
`;

const StyledPostContent = styled.div`
  h2, h3, h4 {
    font-family: var(--font-display);
    color: var(--text);
    margin: 40px 0 16px;
    font-weight: 700;
  }

  p { color: var(--muted); margin-bottom: 18px; font-weight: 300; line-height: 1.8; }

  a { color: var(--accent2); text-decoration: none; border-bottom: 1px solid rgba(87,255,212,0.3); }

  code {
    font-family: var(--font-mono);
    font-size: 13px;
    background: var(--bg3);
    padding: 2px 6px;
    border-radius: 3px;
    color: var(--accent2);
  }

  pre {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 24px;
    overflow-x: auto;
    margin: 24px 0;

    code { background: none; padding: 0; color: var(--text); }
  }

  ul, ol {
    color: var(--muted);
    margin: 16px 0 24px;
    padding-left: 24px;
    font-weight: 300;
    line-height: 1.8;
  }
`;

const PostTemplate = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark;
  const { title, date, description } = frontmatter;

  return (
    <Layout>
      <Helmet title={`${title} | Shyam Yadav`} />
      <StyledPostContainer>
        <StyledPostHeader>
          <Link className="post-back" to="/">← Back</Link>
          <h1>{title}</h1>
          <p className="post-meta">{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </StyledPostHeader>
        <StyledPostContent dangerouslySetInnerHTML={{ __html: html }} />
      </StyledPostContainer>
    </Layout>
  );
};

export default PostTemplate;

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        slug
        description
      }
    }
  }
`;
