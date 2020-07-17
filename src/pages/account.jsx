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

  const user = getProfile();

  return (
    <Layout>
      <SEO title="Account" />
      {!isAuthenticated()
        ? <p style={{ fontSize: '1.25em', fontWeight: 'bold' }}>Redirecting to login...</p>
        : (
          <p>
            Hello,
            {' '}
            {user?.given_name ? user?.given_name : user?.nickname}
            !
          </p>
        )}
    </Layout>
  );
};

export default AccountPage;
