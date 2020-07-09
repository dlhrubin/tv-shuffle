import React, { useEffect, useContext } from 'react';
import { context } from './provider';
import { getProfile } from '../utils/auth';

const EpisodeTracker = () => {
  const userStatus = useContext(context);

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
