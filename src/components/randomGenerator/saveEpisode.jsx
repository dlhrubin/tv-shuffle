import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { context } from '../provider';
import { getProfile } from '../../utils/auth';
import { createUser, updateUser } from '../../graphql/mutations';

const SaveEpisode = ({
  name, id, season, episode,
}) => {
  const [watched, setWatched] = useState(false);

  const userStatus = useContext(context);
  const user = getProfile();

  useEffect(() => {
    if (userStatus.userShows) {
      // Check if new episode has already been watched
      const show = userStatus.userShows.filter((s) => s.tmdb === id)[0];
      const alreadyWatched = !show ? false
        : !!show.episodes.filter((e) => e.name === episode.name
                                       && e.number === episode.number
                                       && e.season === season)[0];
        // Reset "Mark watched" button if user re-shuffles
      setWatched(alreadyWatched);
    }
  }, [episode.name, episode.number, season]);

  const handleAddEpisode = () => {
    // Update user's shows to add new episode
    const newEpisode = {
      name: episode.name,
      number: episode.number,
      season,
    };
    let showArray = [...userStatus.userShows];
    const show = showArray.filter((s) => s.tmdb === id)[0];
    if (show) {
      show.episodes.push(newEpisode);
      showArray = showArray.filter((s) => s.tmdb !== id);
      showArray.push(show);
    } else {
      showArray.push({
        name,
        tmdb: id,
        episodes: [newEpisode],
      });
    }
    // Update database
    const inDataBase = userStatus.userShows.length;
    axios.post(process.env.GATSBY_GRAPHQL_ENDPOINT,
      {
        operationName: inDataBase ? 'UpdateUser' : 'CreateUser',
        query: inDataBase ? updateUser : createUser,
        variables: {
          input: {
            id: user.sub,
            shows: showArray,
          },
        },
      },
      { headers: { Authorization: window.localStorage.getItem('idToken') } });
    userStatus.changeUserShows(showArray);
    if (!userStatus.gridsToUpdate.includes(id)) {
      userStatus.changeGridsToUpdate(userStatus.gridsToUpdate.concat(id));
    }
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
  id: PropTypes.number,
  season: PropTypes.number,
  episode: PropTypes.shape({
    name: PropTypes.string,
    number: PropTypes.number,
  }),
};

SaveEpisode.defaultProps = {
  name: '',
  id: 0,
  season: 0,
  episode: {
    name: '',
    number: 0,
  },
};

export default SaveEpisode;
