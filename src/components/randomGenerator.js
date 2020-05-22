import React, { useState } from 'react';
import Search from './randomGenerator/search';
import Shuffle from './randomGenerator/shuffle';
import PreviewImage from './randomGenerator/previewImage';
import Results from './randomGenerator/results';

const RandomGenerator = () => {
    const [show, setShow] = useState(null);
    const [season, setSeason] = useState(null);
    const [episode, setEpisode] = useState(null);

    return (
        <>
            <Search handleSetShow={setShow} handleSetSeason={setSeason}/>
            <Shuffle id={show?.id} episodeMap={show?.episodeMap} num_episodes={show?.num_episodes} season={season}/>
            <PreviewImage poster={show?.poster} name={show?.name}/>
            <Results name={show?.name} season={season}/>
        </>
    )
}

export default RandomGenerator