import React, { useState, useEffect, useContext } from 'react';
import { context } from './provider';
import { getProfile } from '../utils/auth';
import axios from 'axios';

const EpisodeTracker = () => {
  const userStatus = useContext(context);

  useEffect(() => {
    if (!userStatus.showInfo && userStatus.userShows?.length) {
      let requests = []
      userStatus.userShows.forEach(show => {
        requests.push(
        // Fetch fresh show info to get updated number of seasons and episodes
        axios.get(`https://api.themoviedb.org/3/tv/${show.tmdb}`,
        {
          params: {
            api_key: process.env.GATSBY_API_KEY,
          },
        }));
      });
      axios.all(requests).then(axios.spread((...responses) => {
        const gridData = []
        responses.forEach(res => {
          const seasons = res.data.seasons.filter((s) => s.season_number !== 0);
          const missingSeasons = seasons.length !== seasons.slice(-1)[0].season_number;
          // Include in vis only if there is no missing data
          if (res.data.number_of_episodes && !missingSeasons) {
            const showGrid = {name: res.data.name};
            seasons.forEach(s => {
              console.log()
            })
            showGrid.data = seasons.map(s => 
              ({"season" : s.season_number, 
                "episodes": [...Array(s.episode_count).keys()]
                .map(num => ({
                  "number": num + 1,
                  "watched": !!userStatus.userShows
                            .filter(show => show.name === res.data.name)[0].episodes
                            .filter(ep => ep.season === s.season_number && ep.number === num + 1)[0]
                }
              ))}));
            gridData.push(showGrid)
          }
          
        })
        userStatus.changeShowInfo(gridData);
      }))
    }
  })

  return (
    <section id="episode-tracker">
      {userStatus.userShows?.length ? <h2>Episode Tracker</h2>
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
