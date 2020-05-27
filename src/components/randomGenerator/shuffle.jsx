import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '../../../config';

const getRandom = (total) => Math.floor(Math.random() * total) + 1;

const Shuffle = ({
  id, episodeMap, numEpisodes, userSeason, handleSetRandomSeason, handleSetEpisode,
}) => {
  const [selected, setSelected] = useState({ season: 0, seasonEpisode: 0 });

  const handleClick = () => {
    let { season, seasonEpisode } = selected;
    // Shuffle until a new episode is selected
    while (season === selected.season && seasonEpisode === selected.seasonEpisode) {
      // If user has selected a season, generate random episode within that season
      if (userSeason) {
        const seasonInfo = episodeMap.filter((map) => map.season === userSeason)[0];
        seasonEpisode = getRandom(seasonInfo.last - seasonInfo.first + 1);
        season = userSeason;
        // If no season selected, generate random season and episode
      } else {
        const showEpisode = getRandom(numEpisodes);
        const seasonInfo = episodeMap
          .filter((map) => map.first <= showEpisode && map.last >= showEpisode)[0];
        seasonEpisode = showEpisode - seasonInfo.first + 1;
        season = seasonInfo.season;
      }
    }
    setSelected({ season, seasonEpisode });
    // Get further episode info
    axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${season}/episode/${seasonEpisode}`,
      {
        params: {
          api_key: config.KEY,
        },
      }).then((res) => {
      const episodeName = res.data.name || '';
      handleSetEpisode({
        name: episodeName,
        number: seasonEpisode,
      });
      // Set random season here so episode number and season number will change simultaneously
      if (!userSeason) {
        handleSetRandomSeason(season);
      }
    }).catch(() => {
      // If no episode info found, re-shuffle
      handleClick();
    });
  };

  return (
    <section id="shuffle" className="shuffle">
      <span>Shuffle</span>
      <button type="button" disabled={!id} aria-label="Shuffle" onClick={handleClick}>
        <i className="fas fa-dice" />
      </button>
    </section>
  );
};

Shuffle.propTypes = {
  id: PropTypes.number.isRequired,
  episodeMap: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.number)).isRequired,
  numEpisodes: PropTypes.number.isRequired,
  userSeason: PropTypes.number.isRequired,
  handleSetRandomSeason: PropTypes.func.isRequired,
  handleSetEpisode: PropTypes.func.isRequired,
};

export default Shuffle;
