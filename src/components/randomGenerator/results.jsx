import React from 'react';
import PropTypes from 'prop-types';

const Results = ({ name, season, episode }) => (
  <section id="results" className="results">
    {episode.name && (
    <p>
      Watch season
      {' '}
      <span>{season}</span>
      , episode
      {' '}
      <span>{episode.number}</span>
      {episode.name && (
      <>
        {' '}
        (
        <span>{episode.name}</span>
        )
      </>
      )}
      {' '}
      of
      {' '}
      <span>{name}</span>
    </p>
    )}
  </section>
);

Results.propTypes = {
  name: PropTypes.string.isRequired,
  season: PropTypes.number.isRequired,
  episode: PropTypes.shape({
    name: PropTypes.string,
    number: PropTypes.number,
  }).isRequired,
};

export default Results;
