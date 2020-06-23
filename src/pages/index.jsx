import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

import RandomGenerator from '../components/randomGenerator';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <RandomGenerator />
  </Layout>
);

export default IndexPage;
