import React, { useState } from 'react';
import axios from 'axios';
import config from '../../../config';

const Search = ({handleSetShow}) => {

    const [query, setQuery] = useState('');
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
                    axios.get("https://api.themoviedb.org/3/tv/".concat(show.id),
                    {
                        params: {
                            api_key: config.KEY,
                        }
                    }).then((res) => {
                        // No check for non-zero length results here b/c we're searching by ID number, so we already know this show is in the database
                        const showInfo = res.data;
                        // Map episode numbers to seasons
                        let episodeCounter = 0;
                        let episodeMap = [];
                        let seasons = [];
                        for (let i = 1; i <= showInfo.number_of_seasons; i++) {
                            const season = showInfo.seasons.filter(s => s.season_number === i)[0];
                            seasons.push(season.season_number);
                            episodeMap.push({
                                                first: episodeCounter + 1,
                                                last: episodeCounter + season.episode_count,
                                                season: season.season_number
                                            })
                            episodeCounter += season.episode_count;
                        }
                        handleSetShow({
                            name: show.name,
                            id: show.id,
                            poster: "http://image.tmdb.org/t/p/w500".concat(show.poster_path),
                            seasons,
                            episodeMap,
                        });
                    })
                } else {
                    setErrorMessage('Show title not found')
                }
            });
        }
    }

    return (
        <section id="search" className="search">
            <form onSubmit={handleSearchShow}>
                <label htmlFor="find-show">
                    Show
                </label>
                <div>
                    <div className="input-container">
                        <input id="find-show" type="search" autoComplete="off" value={query} onChange={(e) => {setQuery(e.target.value); setErrorMessage('')}}/>
                        <button type="submit"><i className="fas fa-search"/></button>
                    </div>
                    <span className="error">{errorMessage}</span>
                </div>
            </form>
            <form>
                <label htmlFor="select-season">
                    Season (optional)
                </label>
                <select id="select-season" />
            </form>
        </section>
    )
}

export default Search