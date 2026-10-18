import React from 'react';
import PropTypes from 'prop-types';
import Nav from './nav';
import Social from './social';
import Email from './email';
import Footer from './footer';

const Layout = ({ children }) => (
  <>
    <a className="skip-to-content" href="#content">Skip to Content</a>
    <Nav />
    <Social />
    <Email />
    <div id="content">
      {children}
      <Footer />
    </div>
  </>
);

Layout.propTypes = { children: PropTypes.node.isRequired };
export default Layout;
