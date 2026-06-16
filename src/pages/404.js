import React from 'react';
import { Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';

const StyledMainContainer = styled.main`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  min-height: 100vh;
  text-align: center;
  padding: 0 24px;

  h1 {
    font-family: var(--font-display);
    font-size: clamp(80px, 15vw, 160px);
    font-weight: 800;
    color: var(--accent);
    letter-spacing: -4px;
    line-height: 1;
    margin-bottom: 16px;
  }

  h2 {
    font-family: var(--font-display);
    font-size: clamp(24px, 4vw, 36px);
    font-weight: 700;
    color: var(--text);
    margin-bottom: 24px;
  }

  p {
    color: var(--muted);
    margin-bottom: 48px;
    max-width: 480px;
  }

  a {
    ${({ theme }) => theme.mixins.button};
  }
`;

const NotFoundPage = () => (
  <Layout>
    <Helmet title="404: Page Not Found" />
    <StyledMainContainer>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/">Go Home</Link>
    </StyledMainContainer>
  </Layout>
);

export default NotFoundPage;
