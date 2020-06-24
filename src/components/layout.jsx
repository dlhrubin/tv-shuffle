/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { logout, getProfile } from '../utils/auth';

import '../css/layout.scss';
import Header from './header';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const user = getProfile();

  return (
    <div className="app">
      <nav>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div>
          {user.name && <Link to="/tracker/">Tracker</Link>}
          <Link to="/account/" className={user.name ? 'avatar' : ''}>
            {user.name ? (user.given_name || user.nickname)[0].toUpperCase() : 'Log in'}
            {' '}
          </Link>
          {user.name
          && (<a href="#logout" onClick={(e) => { logout(); e.preventDefault(); }}> Log Out </a>)}
        </div>
      </nav>
      <main>{children}</main>
      <footer>
        ©
        {' '}
        {new Date().getFullYear()}
        {' '}
        Danielle Rubin
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
