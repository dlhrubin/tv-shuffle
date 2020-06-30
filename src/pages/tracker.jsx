import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import EpisodeTracker from '../components/episodeTracker';

const TrackerPage = () => (
  <Layout>
    <SEO title="Episode Tracker" />
    <EpisodeTracker />
  </Layout>
);

export default TrackerPage;
