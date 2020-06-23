import React from 'react';
import { login, isAuthenticated, getProfile } from '../utils/auth';
import Layout from '../components/layout';
import SEO from '../components/seo';

const AccountPage = () => {
  if (!isAuthenticated()) {
    login();
    return <p>Redirecting to login...</p>;
  }

  const user = getProfile();

  return (
    <Layout>
      <SEO title="Account" />
      <p>
        Hello,
        {user.name}
        !
      </p>
    </Layout>
  );
};

export default AccountPage;
