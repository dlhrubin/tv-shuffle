import React, { useEffect, useContext } from 'react';
import { login, isAuthenticated, getProfile } from '../utils/auth';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { context } from '../components/provider';

const AccountPage = () => {

  useEffect(() => {
    if (!isAuthenticated()) {
      login();
    }
  })

  return (
    <context.Consumer>
      {context => (
      <Layout>
        <SEO title="Account" />
        {!isAuthenticated()
          ? <p style={{ fontSize: '1.25em', fontWeight: 'bold' }}>Redirecting to login...</p>
          : (
            <p>
              Hello,
              {' '}
              {context.user?.given_name ? context.user?.given_name : context.user?.nickname}
              !
            </p>
          )}
      </Layout>
      )}
    </context.Consumer>
  );
};

export default AccountPage;
