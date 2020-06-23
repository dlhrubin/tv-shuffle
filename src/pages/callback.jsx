import React from 'react';
import { handleAuthentication } from '../utils/auth';
import Layout from '../components/layout';
import SEO from '../components/seo';

const Callback = () => {
  handleAuthentication();
  return (
    <Layout>
      <SEO title="Callback" />
      <p>Loading...</p>
    </Layout>
  );
};
export default Callback;
