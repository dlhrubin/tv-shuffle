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
  name: PropTypes.string,
  season: PropTypes.number,
  episode: PropTypes.shape({
    name: PropTypes.string,
    number: PropTypes.number,
  }),
};

Results.defaultProps = {
  name: '',
  season: 0,
  episode: {
    name: '',
    number: 0,
  },
};

export default Results;
