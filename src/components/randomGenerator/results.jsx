import React from 'react';
import PropTypes from 'prop-types';

const Results = ({ name, season, episode }) => (
  <section id="results" className="results">
    {episode.name && (
    <p data-testid="results-output">
      Watch season
      {' '}
      <span data-testid="displayed-season">{season}</span>
      , episode
      {' '}
      <span data-testid="displayed-episode">{episode.number}</span>
      {episode.name && (
      <>
        {' '}
        (
        <span data-testid="displayed-name">{episode.name}</span>
        )
      </>
      )}
      {' '}
      of
      {' '}
      <span data-testid="displayed-show">{name}</span>
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
