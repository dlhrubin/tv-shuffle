import React from 'react';

const Results = ({name, season, episode}) => (
    <section id="results" className="results">
        {episode && <p>Watch season <span>{season}</span>, episode <span>{episode.number}</span>{episode.name && <> (<span>{episode.name}</span>)</>} of <span>{name}</span></p>}
    </section>
)

export default Results;