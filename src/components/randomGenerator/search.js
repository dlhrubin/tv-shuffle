import React, { useState } from 'react';
import axios from 'axios';
import config from '../../../config';

const Search = ({handleSetShow, handleSetUserSeason, handleSetEpisode}) => {

    const [query, setQuery] = useState('');
    const [seasonOptions, setSeasonOptions] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSearchShow = (e) => {
        e.preventDefault();
        if (query) {
            // Search for show title
            axios.get('https://api.themoviedb.org/3/search/tv?',
                {
                    params: {
                        api_key: config.KEY,
                        query,
                    }
                }
            ).then((res) => {
                const results = res.data.results;
                // Check that results contain at least one show name
                if (results.length) {
                    const show = results[0];
                    setQuery(show.name);
                    // Fetch season/episode info using show ID
                    axios.get(`https://api.themoviedb.org/3/tv/${show.id}`,
                    {
                        params: {
                            api_key: config.KEY,
                        }
                    }).then((res) => {
                        // No check for non-zero length results here b/c we're searching by ID number, so we already know this show is in the database
                        const showInfo = res.data;
                        // Check that show has at least 1 episode
                        if (!showInfo.number_of_episodes) {
                            setErrorMessage('No data available for this title')
                        } else {
                            // Map episode numbers to seasons
                            let episodeCounter = 0;
                            let episodeMap = [];
                            let seasons = [];
                            let missingData = false;
                            for (let i = 1; i <= showInfo.number_of_seasons; i++) {
                                const season = showInfo.seasons.filter(s => s.season_number === i)[0];
                                if (!season) {
                                    missingData = true;
                                    break;
                                }
                                seasons.push(season.season_number);
                                episodeMap.push({
                                                    first: episodeCounter + 1,
                                                    last: episodeCounter + season.episode_count,
                                                    season: season.season_number
                                                })
                                episodeCounter += season.episode_count;
                            }
                            if (missingData || episodeCounter !== showInfo.number_of_episodes) {
                                setErrorMessage('No data available for this title')
                            } else {
                                handleSetShow({
                                    name: show.name,
                                    id: show.id,
                                    // Catch if a show doesn't have a poster
                                    poster: (show.hasOwnProperty('poster_path') && show.poster_path) ? `http://image.tmdb.org/t/p/w500${show.poster_path}` : null,
                                    numEpisodes: showInfo.number_of_episodes,
                                    episodeMap,
                                });
                                setSeasonOptions(seasons);
                            }
                        }
                    })
                } else {
                    setErrorMessage('Show title not found')
                }
            });
        }
    }

    const handleReset = () => {
        setErrorMessage(''); 
        setSeasonOptions(null); 
        handleSetShow(null); 
        handleSetUserSeason(null); 
        handleSetEpisode(null);
    }

    return (
        <section id="search" className="search">
            <form onSubmit={handleSearchShow}>
                <label htmlFor="find-show">
                    Show
                </label>
                <div>
                    <div className="input-container">
                        <input id="find-show" type="search" autoComplete="off" value={query} onChange={(e) => {setQuery(e.target.value); handleReset()}}/>
                        <button type="submit"><i className="fas fa-search"/></button>
                    </div>
                    <span className="error">{errorMessage}</span>
                </div>
            </form>
            <form>
                <label htmlFor="select-season">
                    Season (optional)
                </label>
                <select id="select-season" disabled={seasonOptions ? false : true} onChange={(e) => {handleSetUserSeason(e.target.value ? parseInt(e.target.value) : null); handleSetEpisode(null)}}>
                    {seasonOptions && <option value={null}>All</option>}
                    {seasonOptions && seasonOptions.map(s => <option value={s} key={s}>{s}</option>)}
                </select>
            </form>
        </section>
    )
}

export default Search