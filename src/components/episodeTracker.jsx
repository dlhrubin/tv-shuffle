import React, { useEffect, useContext } from 'react';
import { context } from './provider';
import { getProfile } from '../utils/auth';

const EpisodeTracker = () => {
  const userStatus = useContext(context);

  return (
    <p>Episode tracker</p>
  );
};

export default EpisodeTracker;
