import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Search = ({ handleSetShow, handleSetUserSeason, handleSetEpisode }) => {
  const [query, setQuery] = useState('');
  const [seasonOptions, setSeasonOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearchShow = (e) => {
    e.preventDefault();
    if (query) {
      // Search for show title
      axios.get('https://api.themoviedb.org/3/search/tv?',
        {
          params: {
            api_key: process.env.GATSBY_API_KEY,
            query,
          },
        }).then((res) => {
        const { results } = res.data;
        // Check that results contain at least one show name
        if (results.length) {
          const show = results[0];
          setQuery(show.name);
          // Fetch season/episode info using show ID
          axios.get(`https://api.themoviedb.org/3/tv/${show.id}`,
            {
              params: {
                api_key: process.env.GATSBY_API_KEY,
              },
            }).then((showRes) => {
            const showInfo = showRes.data;
            const seasonsInfo = showInfo.seasons.filter((s) => s.season_number !== 0);
            const missingSeasons = seasonsInfo.length !== seasonsInfo.slice(-1)[0].season_number;
            // Check for at least 1 episode and no missing seasons
            if (!showInfo.number_of_episodes || missingSeasons) {
              setErrorMessage('No data available for this title');
            } else {
              // Map episode numbers to seasons
              let episodeCounter = 0;
              const episodeMap = [];
              seasonsInfo.forEach((season) => {
                episodeMap.push({
                  first: episodeCounter + 1,
                  last: episodeCounter + season.episode_count,
                  season: season.season_number,
                });
                episodeCounter += season.episode_count;
              });
              handleSetShow({
                name: show.name,
                id: show.id,
                // Catch if a show doesn't have a poster
                poster: ('poster_path' in show && show.poster_path)
                  ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : '',
                numEpisodes: showInfo.number_of_episodes,
                episodeMap,
              });
              setSeasonOptions(seasonsInfo.map((s) => s.season_number));
            }
          });
        } else {
          setErrorMessage('Show title not found');
        }
      });
    }
  };

  const handleReset = () => {
    setErrorMessage('');
    setSeasonOptions([]);
    handleSetShow({
      name: '',
      id: 0,
      poster: '',
      numEpisodes: 0,
      episodeMap: [],
    });
    handleSetUserSeason(0);
    handleSetEpisode({
      name: '',
      number: 0,
    });
  };

  return (
    <section id="search" className="search">
      <form data-testid="search-form" onSubmit={handleSearchShow}>
        <label htmlFor="find-show">
          <span>Show</span>
          <div>
            <div className="input-container">
              <input
                id="find-show"
                data-testid="search-bar"
                type="search"
                autoComplete="off"
                value={query}
                onChange={(e) => { setQuery(e.target.value); handleReset(); }}
              />
              <button type="submit" aria-label="Search"><i className="fas fa-search" /></button>
            </div>
            <span data-testid="error-message" className="error">{errorMessage}</span>
          </div>
        </label>
      </form>
      <form>
        <label htmlFor="select-season">
          <span>Season (optional)</span>
          <select
            id="select-season"
            data-testid="dropdown"
            disabled={!seasonOptions.length}
            onChange={(e) => {
              handleSetUserSeason(parseInt(e.target.value, 10));
              handleSetEpisode({ name: '', number: 0 });
            }}
          >
            {seasonOptions.length && <option value={0}>All</option>}
            {seasonOptions.length && seasonOptions
              .map((s) => <option value={s} key={s}>{s}</option>)}
          </select>
        </label>
      </form>
    </section>
  );
};

Search.propTypes = {
  handleSetShow: PropTypes.func,
  handleSetUserSeason: PropTypes.func,
  handleSetEpisode: PropTypes.func,
};

Search.defaultProps = {
  handleSetShow: () => {},
  handleSetUserSeason: () => {},
  handleSetEpisode: () => {},
};

export default Search;
