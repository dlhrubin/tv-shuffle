import React from 'react';
import axios from 'axios';
import config from '../../../config';

const getRandom = (total) => {
    return Math.floor(Math.random() * total) + 1
}

const Shuffle = ({id, episodeMap, numEpisodes, userSeason, handleSetRandomSeason, handleSetEpisode}) => {
    const handleClick = () => {
        let seasonEpisode;
        let season;
        // If user has selected a season, generate random episode within that season
        if (userSeason) {
            const seasonInfo = episodeMap.filter(map => map.season === userSeason)[0];
            seasonEpisode = getRandom(seasonInfo.last - seasonInfo.first + 1);
            season = userSeason;
        // If no season selected, generate random season and episode
        } else {
            const showEpisode = getRandom(numEpisodes);
            const seasonInfo = episodeMap.filter(map => map.first <= showEpisode && map.last >= showEpisode)[0];
            seasonEpisode = showEpisode - seasonInfo.first + 1;
            season = seasonInfo.season;
        }
        // Get further episode info
        axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${season}/episode/${seasonEpisode}`,
            {
                params: {
                    api_key: config.KEY,
                }
        }).then(res => {
            const episodeName = res.data.name || null;
            handleSetEpisode({
                name: episodeName, 
                number: seasonEpisode
            });
            // Set random season here so episode number and season number will change simultaneously
            if (!userSeason) {
                handleSetRandomSeason(season);
            }

        }).catch(error => {
            // If no episode info found, re-shuffle
            handleClick();
        })
    }

    return (
        <section id="shuffle" className="shuffle">
            <span>Shuffle</span>
            <button disabled={id ? false : true} onClick={handleClick}><i className="fas fa-dice"></i></button>
        </section>
    )
}

export default Shuffle