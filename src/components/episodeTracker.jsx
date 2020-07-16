import React, { useState, useRef, useEffect, useContext } from 'react';
import { context } from './provider';
import axios from 'axios';
import { scaleLinear, select, selectAll, axisTop, axisLeft } from 'd3';

const EpisodeTracker = () => {
  const gridContainer = useRef(null);
  const userStatus = useContext(context);
  const [selectedShow, setSelectedShow] = useState(userStatus.gridData.map(grid => grid.id));

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
                  .map(num => {
                    const matchingEpisode = userStatus.userShows
                        .filter(show => show.name === res.data.name)[0].episodes
                        .filter(ep => ep.season === s.season_number && ep.number === num + 1)[0];
                    return {
                    "season" : s.season_number,
                    "episode": num + 1,
                    "exists": num <= s.episode_count,
                    "name": matchingEpisode?.name,
                    "watched": !!matchingEpisode
                    }
                  }
                ))
              );
              updatedGrids.push(showGrid)
            }
          })
          // Combine updated grids with grids that were not updated
          const notUpdated = userStatus.gridData
                              .filter(grid => !userStatus.gridsToUpdate.includes(grid.id));
          const gridData = [...updatedGrids, ...notUpdated];
          // Sort grids alphabetically by name of show
          gridData.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
          userStatus.changeGridData(gridData);
          userStatus.changeGridsToUpdate([]);
          setSelectedShow(gridData.map(grid => grid.id))
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
      const margin = {top: 30, right: 50, bottom: 50, left: 50};
      const squareSize = 25;
      const w = (data.seasonCount - 1) * squareSize + margin.left + margin.right;
      const h = (data.maxEpisodeCount - 1) * squareSize + margin.top + margin.bottom;
      
      // Set up axes
      const xScale = scaleLinear()
                      .domain([1, data.seasonCount])
                      .range([margin.left, w - margin.right]);
      
      const yScale = scaleLinear()
                      .domain([1, data.maxEpisodeCount])
                      .range([margin.top, h - margin.bottom])

      // Set up container
      const container = select(gridContainer.current).select("#grid-" + data.id);
      
      const svg = container.append("svg")
                    .attr("viewBox", "0 0 " + w + " " + h)
                    .style("max-width", w);
      
      // Add squares
      svg.selectAll("rect")
        .data(data.episodeStatus)
        .enter()
        .append("rect")
        .attr("x", (d) => xScale(d.season))
        .attr("y", (d) => yScale(d.episode))
        .attr("class", (d) => d.watched ? "watched" : d.exists ? "unwatched" : "empty")
        .attr("width", squareSize)
        .attr("height", squareSize)
        .attr("stroke", "#ffffff");

      // Add tooltip
      const tooltip = container.append("div")
                               .attr("class", "tooltip")
                               .style("opacity", 0);

      svg.selectAll(".watched")
         .on("mouseover", (d) => {
           tooltip.transition()
                  .duration(50)
                  .style("opacity", 0.8);
           tooltip.html("<p>" + d.name + "</p>")
                  .style("left", (xScale(d.season) - squareSize) + "px")
                  .style("top", (yScale(d.episode) + squareSize) + "px")
         })
         .on("mouseout", (d) => {
           tooltip.transition()
                  .duration(100)
                  .style("opacity", 0)
                  .style("left", 0)
                  .style("top", 0)
         })
      
      // Add axes
      const setTicks = (count) => [...Array(count).keys()].map(x => x + 1)

      const xAxis = axisTop(xScale)
                      .tickValues(setTicks(data.seasonCount))
                      .tickFormat(x => "S" + x)
                      .tickSize(0);

      svg.append("g")
         .attr("transform", 
               "translate(" + squareSize / 2 + "," + yScale(1) + ")")
         .call(xAxis)
         .select('.domain').remove();

      const yAxis = axisLeft(yScale)
                      .tickValues(setTicks(data.maxEpisodeCount))
                      .tickFormat(x => "E" + x)
                      .tickSize(0);

      svg.append("g")
         .attr("transform", "translate(" + xScale(1) + "," + squareSize / 2 + ")")
         .call(yAxis)
         .select('.domain').remove();

      // Add title
      svg.append("text")
         .attr("x", margin.left + squareSize / 2 + (w - margin.left - margin.right) / 2)
         .attr("y", margin.top / 4)
         .attr("text-anchor", "middle")
         .attr("dominant-baseline", "middle")
         .text(data.name)

    })
  }

  const handleSelect = (e) => {
    const selected = e.target.value === "all" ? userStatus.gridData.map(grid => grid.id) : [parseInt(e.target.value, 10)];
    setSelectedShow(selected);
  }

  const showGrid = !!(userStatus.userShows?.length && userStatus.gridData.length);

  return (
    <section id="episode-tracker" className="episode-tracker">
      {userStatus.userShows?.length ? <h2>Episode Tracker</h2>
        : (
          <p>
            You're not tracking any shows yet! To start tracking episodes of shows as you watch,
            click the "Mark as watched?" button after shuffling.
          </p>
        )}
      {showGrid && 
        <form>
          <label htmlFor="select-show">
            <span>Show</span>
            <select id="select-show" onChange={(e) => handleSelect(e)}>
              <option value="all">All</option>
              {userStatus.gridData.map(grid => <option value={grid.id} key={grid.id}>{grid.name}</option>)}
            </select>
          </label>
        </form>
      }
      {showGrid && 
        <div ref={gridContainer} className="grid-container">
          {userStatus.gridData.map(grid => 
          <div className="grid" id={"grid-" + grid.id} key={grid.id} style={{"display": selectedShow.includes(grid.id) ? "" : "none"}}>
          </div>
          )}
        </div>
      }
    </section>
  );
};

export default EpisodeTracker;
