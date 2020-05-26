import React, { useState } from 'react';
import Search from './randomGenerator/search';
import Shuffle from './randomGenerator/shuffle';
import PreviewImage from './randomGenerator/previewImage';
import Results from './randomGenerator/results';

const RandomGenerator = () => {
    const [show, setShow] = useState(null);
    const [userSeason, setUserSeason] = useState(null);
    const [randomSeason, setRandomSeason] = useState(null);
    const [episode, setEpisode] = useState(null);

    return (
        <>
            <Search handleSetShow={setShow} handleSetUserSeason={setUserSeason} handleSetEpisode={setEpisode}/>
            <Shuffle 
                id={show?.id} 
                episodeMap={show?.episodeMap} 
                numEpisodes={show?.numEpisodes} 
                userSeason={userSeason} 
                handleSetRandomSeason={setRandomSeason}
                handleSetEpisode={setEpisode}
            />
            <PreviewImage poster={show?.poster} name={show?.name}/>
            <Results name={show?.name} season={userSeason || randomSeason} episode={episode}/>
        </>
    )
}

export default RandomGenerator