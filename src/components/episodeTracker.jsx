import React, { useEffect, useContext } from 'react';
import { context } from './provider';
import { getProfile } from '../utils/auth';
import axios from 'axios';

const EpisodeTracker = () => {
  
  const userStatus = useContext(context);

  useEffect(() => {
    if (!userStatus.showInfo) {
      console.log('making axios calls');
      userStatus.userShows.forEach(show => {
        axios.get('https://api.themoviedb.org/3/search/tv?',
        {
          params: {
            api_key: process.env.GATSBY_API_KEY,
            query: show.name,
          },
        }).then((res) => {
          const { results } = res.data;
          console.log(results);
        })
      userStatus.changeShowInfo(['test'])
      })
    }
  })

  return (
    <section id="episode-tracker">
      {userStatus.userShows.length ? <h2>Episode Tracker</h2>
        : (
          <p>
            You're not tracking any shows yet! To start tracking episodes of shows as you watch,
            click the "Mark as watched?" button after shuffling.
          </p>
        )}
    </section>
  );
};

export default EpisodeTracker;
