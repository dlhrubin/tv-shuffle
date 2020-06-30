import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { context } from '../provider';

const SaveEpisode = ({ name, season, episode }) => {
  const [watched, setWatched] = useState(false);
  const [storedEpisode, setStoredEpisode] = useState(episode);
  const [storedSeason, setStoredSeason] = useState(season);

  const userStatus = useContext(context);

  useEffect(() => {
    // Reset "Mark watched" button if user re-shuffles
    const mustReset = !episode.name
                          || episode.name !== storedEpisode.name
                          || episode.number !== storedEpisode.number
                          || season !== storedSeason;
    if (mustReset) {
      setWatched(false);
      setStoredEpisode(episode);
      setStoredSeason(season);
    }
  });

  const handleAddEpisode = () => {
    setWatched(true);
  };

  return (
    <button className="save-btn" type="button" onClick={handleAddEpisode} style={{ visibility: episode.name ? 'visible' : '' }} disabled={watched}>
      <i className={watched ? 'fas fa-bookmark' : 'far fa-bookmark'} />
      <span>{watched ? 'Just watched!' : 'Mark as watched?'}</span>
    </button>
  );
};

SaveEpisode.propTypes = {
  name: PropTypes.string,
  season: PropTypes.number,
  episode: PropTypes.shape({
    name: PropTypes.string,
    number: PropTypes.number,
  }),
};

SaveEpisode.defaultProps = {
  name: '',
  season: 0,
  episode: {
    name: '',
    number: 0,
  },
};

export default SaveEpisode;
