import React, { useContext, useEffect } from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { getUser } from '../graphql/queries';
import axios from 'axios';
import { context } from '../components/provider';
import awsmobile from '../aws-exports';
import RandomGenerator from '../components/randomGenerator';
import { getProfile } from '../utils/auth';

const IndexPage = () => {

  const userStatus = useContext(context);

  useEffect(() => {
    const user = getProfile();
    if (user.name) {
      // Fetch user information
      if (!userStatus.userShows) {
        axios.post(awsmobile.aws_appsync_graphqlEndpoint,
          {
            operationName: "GetUser",
            query: getUser,
            variables: { "id": user.sub }
          },
          {headers: {
          'Authorization': window.localStorage.getItem('idToken')}
        }).then(res => {
          userStatus.changeUserShows(res.data.data.getUser?.shows || []);
        })
      }
    }
  }, [userStatus.userShows])

  return (
    <Layout>
      <SEO title="Home" />
      <RandomGenerator />
    </Layout>
  )
};

export default IndexPage;
