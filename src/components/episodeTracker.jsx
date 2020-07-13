import React, { useRef, useEffect, useContext } from 'react';
import { context } from './provider';
import axios from 'axios';
import { scaleLinear, select, selectAll } from 'd3';

const EpisodeTracker = () => {
  const gridContainer = useRef(null);
  const userStatus = useContext(context);

  useEffect(() => {
    if (!userStatus.gridData && userStatus.userShows?.length) {
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
      axios.all(requests).then(responses => {
        const gridData = []
        responses.forEach(res => {
          const seasons = res.data.seasons.filter((s) => s.season_number !== 0);
          const missingSeasons = seasons.length !== seasons.slice(-1)[0].season_number;
          // Include in vis only if there is no missing data
          if (res.data.number_of_episodes && !missingSeasons) {
            const showGrid = {
              name: res.data.name, 
              seasonCount: res.data.number_of_seasons, 
              episodeStatus: []
            };
            showGrid.maxEpisodeCount = Math.max(...seasons.map(s => s.episode_count));
            seasons.forEach(s => 
              showGrid.episodeStatus.push(...
                [...Array(showGrid.maxEpisodeCount).keys()]
                .map(num => ({
                  "season" : s.season_number,
                  "episode": num + 1,
                  "exists": num <= s.episode_count,
                  "watched": !!userStatus.userShows
                            .filter(show => show.name === res.data.name)[0].episodes
                            .filter(ep => ep.season === s.season_number && ep.number === num + 1)[0]
                }
              )))
            );
            gridData.push(showGrid)
          }
        })
        userStatus.changeGridData(gridData);
        drawGrid(gridData);
      })
    } else if (userStatus.userShows?.length) {
      drawGrid(userStatus.gridData);
    }
  }, [userStatus.userShows])

  const drawGrid = (gridData) => {
    gridData.forEach((data) => {
      const margin = {top: 30, right: 50, bottom: 50, left: 30};
      const squareSize = 20;
      const w = data.maxEpisodeCount * squareSize + margin.left + margin.right;
      const h = data.seasonCount * squareSize + margin.top + margin.bottom;
      
      const xScale = scaleLinear()
                      .domain([0, data.maxEpisodeCount])
                      .range([margin.left, w - margin.right]);
      
      const yScale = scaleLinear()
                      .domain([0, data.seasonCount])
                      .range([margin.top, h - margin.bottom])

      const squareType = (exists, watched) => watched ? "watched" : exists ? "unwatched" : "empty";

      const container = gridContainer.current;
      select(container)
        .style("width", w + "px")
        .style("height", h + "px")
      
      const svg = select(container).append("svg")
                    .attr("width", w)
                    .attr("height", h)
      
      svg.selectAll("rect")
        .data(data.episodeStatus)
        .enter()
        .append("rect")
        .attr("x", (d) => xScale(d.episode))
        .attr("y", (d) => yScale(d.season))
        .attr("class", (d) => squareType(d.exists, d.watched))
        .attr("width", squareSize)
        .attr("height", squareSize)
        .attr("stroke", "#ffffff");

    })
  }

  return (
    <section id="episode-tracker" className="episode-tracker">
      {userStatus.userShows?.length ? <h2>Episode Tracker</h2>
        : (
          <p>
            You're not tracking any shows yet! To start tracking episodes of shows as you watch,
            click the "Mark as watched?" button after shuffling.
          </p>
        )}
      {(userStatus.userShows?.length && userStatus.gridData) && <div ref={gridContainer}></div> }
    </section>
  );
};

export default EpisodeTracker;
