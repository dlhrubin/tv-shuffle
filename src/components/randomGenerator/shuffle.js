import React, { useState } from 'react';

const getRandom = (total) => {
    return Math.floor(Math.random() * total) + 1
}

const Shuffle = ({id, episodeMap, numEpisodes, userSeason, handleSetRandomSeason}) => {
    const handleClick = () => {
        let seasonEpisode;
        // If user has selected a season, generate random episode within that season
        if (userSeason) {
            const seasonInfo = episodeMap.filter(map => map.season === userSeason)[0];
            seasonEpisode = getRandom(seasonInfo.last - seasonInfo.first + 1);
        // If no season selected, generate random season and episode
        } else {
            const showEpisode = getRandom(numEpisodes);
            const seasonInfo = episodeMap.filter(map => map.first <= showEpisode && map.last >= showEpisode)[0];
            handleSetRandomSeason(seasonInfo.season);
            seasonEpisode = showEpisode - seasonInfo.first + 1;
            
        }
    }

    return (
        <section id="shuffle" className="shuffle">
            <span>Shuffle</span>
            <button onClick={handleClick}><i className="fas fa-dice"></i></button>
        </section>
    )
}

export default Shuffle