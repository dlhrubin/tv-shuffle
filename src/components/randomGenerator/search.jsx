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
            // No check for non-zero length results here b/c we're searching by ID number, so we
            // already know this show is in the database
            const showInfo = showRes.data;
            // Check that show has at least 1 episode
            if (!showInfo.number_of_episodes) {
              setErrorMessage('No data available for this title');
            } else {
              // Map episode numbers to seasons
              let episodeCounter = 0;
              const episodeMap = [];
              const seasons = [];
              let missingData = false;
              for (let i = 1; i <= showInfo.number_of_seasons; i++) {
                const season = showInfo.seasons.filter((s) => s.season_number === i)[0];
                if (!season) {
                  missingData = true;
                  break;
                }
                seasons.push(season.season_number);
                episodeMap.push({
                  first: episodeCounter + 1,
                  last: episodeCounter + season.episode_count,
                  season: season.season_number,
                });
                episodeCounter += season.episode_count;
              }
              if (missingData || episodeCounter !== showInfo.number_of_episodes) {
                setErrorMessage('No data available for this title');
              } else {
                handleSetShow({
                  name: show.name,
                  id: show.id,
                  // Catch if a show doesn't have a poster
                  poster: ('poster_path' in show && show.poster_path)
                    ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : '',
                  numEpisodes: showInfo.number_of_episodes,
                  episodeMap,
                });
                setSeasonOptions(seasons);
              }
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
