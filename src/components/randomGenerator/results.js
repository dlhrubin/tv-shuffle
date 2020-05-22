import React from 'react';

const Results = ({name, season}) => (
    <section id="results" className="results">
        {season && <p>Watch season <span>{season}</span>, episode <span>?</span> of the show <span>{name}</span></p>}
    </section>
)

export default Results;