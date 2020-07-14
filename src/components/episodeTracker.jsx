import React, { useRef, useEffect, useContext } from 'react';
import { context } from './provider';
import axios from 'axios';
import { scaleLinear, select, selectAll, axisBottom, axisLeft } from 'd3';

const EpisodeTracker = () => {
  const gridContainer = useRef(null);
  const userStatus = useContext(context);

  useEffect(() => {
    if (userStatus.userShows?.length) {
      if (userStatus.gridsToUpdate.length) {
        let requests = []
        userStatus.gridsToUpdate.forEach(tmdb => {
          requests.push(
          // Fetch fresh show info to get updated number of seasons and episodes
          axios.get(`https://api.themoviedb.org/3/tv/${tmdb}`,
          {
            params: {
              api_key: process.env.GATSBY_API_KEY,
            },
          }));
        });
        axios.all(requests).then(responses => {
          const updatedGrids = []
          responses.forEach(res => {
            const seasons = res.data.seasons.filter((s) => s.season_number !== 0);
            const missingSeasons = seasons.length !== seasons.slice(-1)[0].season_number;
            // Include in vis only if there is no missing data
            if (res.data.number_of_episodes && !missingSeasons) {
              const showGrid = {
                id: res.data.id,
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
              updatedGrids.push(showGrid)
            }
          })
          // Combine updated grids with grids that were not updated
          const notUpdated = userStatus.gridData.filter(grid => !userStatus.gridsToUpdate.includes(grid.id));
          const gridData = [...updatedGrids, ...notUpdated];
          userStatus.changeGridData(gridData);
          userStatus.changeGridsToUpdate([]);
          drawGrid(gridData);
        })
      } else {
        drawGrid(userStatus.gridData);
      }
    }
  }, [userStatus.userShows])

  const drawGrid = (gridData) => {
    gridData.forEach((data) => {
      
      // Define constants
      const margin = {top: 30, right: 50, bottom: 50, left: 80};
      const squareSize = 20;
      const w = (data.maxEpisodeCount - 1) * squareSize + margin.left + margin.right;
      const h = (data.seasonCount - 1) * squareSize + margin.top + margin.bottom;
      
      // Set up axes
      const xScale = scaleLinear()
                      .domain([1, data.maxEpisodeCount])
                      .range([margin.left, w - margin.right]);
      
      const yScale = scaleLinear()
                      .domain([1, data.seasonCount])
                      .range([margin.top, h - margin.bottom])

      // Set up container
      const container = gridContainer.current;
      select(container)
        .style("width", w + "px")
        .style("height", h + "px")
      
      const svg = select(container).append("svg")
                    .attr("width", w)
                    .attr("height", h)
      
      // Add squares
      svg.selectAll("rect")
        .data(data.episodeStatus)
        .enter()
        .append("rect")
        .attr("x", (d) => xScale(d.episode))
        .attr("y", (d) => yScale(d.season))
        .attr("class", (d) => d.watched ? "watched" : d.exists ? "unwatched" : "empty")
        .attr("width", squareSize)
        .attr("height", squareSize)
        .attr("stroke", "#ffffff");

      
      // Add axes
      const xAxis = axisBottom(xScale)
                      .ticks(data.maxEpisodeCount)
                      .tickSize(0);

      svg.append("g")
         .attr("transform", 
               "translate(" + squareSize / 2 + "," + yScale(data.seasonCount + 1) + ")")
         .call(xAxis)
         .select('.domain').remove();

      const yAxis = axisLeft(yScale)
                      .ticks(data.seasonCount)
                      .tickFormat(x => "Season " + x)
                      .tickSize(0);

      svg.append("g")
         .attr("transform", "translate(" + xScale(1) + "," + squareSize / 2 + ")")
         .call(yAxis)
         .select('.domain').remove();

      // Add title
      svg.append("text")
         .attr("x", w / 2)
         .attr("y", margin.top / 2)
         .attr("text-anchor", "middle")
         .attr("dominant-baseline", "middle")
         .text(data.name)

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
      {(userStatus.userShows?.length && userStatus.gridData.length) && <div ref={gridContainer}></div> }
    </section>
  );
};

export default EpisodeTracker;
