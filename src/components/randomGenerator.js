import React, { useState } from 'react';
import Search from './randomGenerator/search';
import Shuffle from './randomGenerator/shuffle';
import Results from './randomGenerator/results';

const RandomGenerator = () => {
    const [show, setShow] = useState(null);
    const [season, setSeason] = useState(null);
    const [episode, setEpisode] = useState(null);

    return (
        <>
            <Search handleSetShow={setShow}/>
            <Shuffle />
            <Results />
        </>
    )
}

export default RandomGenerator