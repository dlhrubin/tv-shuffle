import React, { useState } from 'react';
import Search from './randomGenerator/search';
import Shuffle from './randomGenerator/shuffle';
import PreviewImage from './randomGenerator/previewImage';
import Results from './randomGenerator/results';

const RandomGenerator = () => {
  const [show, setShow] = useState({
    name: '',
    id: 0,
    poster: '',
    numEpisodes: 0,
    episodeMap: [],
  });
  const [userSeason, setUserSeason] = useState(0);
  const [randomSeason, setRandomSeason] = useState(0);
  const [episode, setEpisode] = useState({
    name: '',
    number: 0,
  });

  return (
    <>
      <Search
        handleSetShow={setShow}
        handleSetUserSeason={setUserSeason}
        handleSetEpisode={setEpisode}
      />
      <Shuffle
        id={show.id}
        episodeMap={show.episodeMap}
        numEpisodes={show.numEpisodes}
        userSeason={userSeason}
        handleSetRandomSeason={setRandomSeason}
        handleSetEpisode={setEpisode}
      />
      <PreviewImage poster={show.poster} name={show.name} />
      <Results name={show.name} season={userSeason || randomSeason} episode={episode} />
    </>
  );
};

export default RandomGenerator;
