import React from 'react';
import {
  render, cleanup, waitFor, fireEvent, getByTestId,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {
  successfulCall, randomWithinSeason, randomNoSeason, randomAllSeasons,
} from '../../../testUtils';
import Results from './results';
import RandomGenerator from '../randomGenerator';

afterEach(cleanup);

const shuffle = async (shuffleFunc, getByTestId, queryByTestId, seed) => {
  successfulCall(getByTestId);
  await waitFor(() => {
    expect(getByTestId('dropdown')).toBeEnabled();
  });
  shuffleFunc(getByTestId, seed);
  await waitFor(() => {
    expect(queryByTestId('results-output')).toBeTruthy();
  });
}

describe('Results', () => {
  it('renders without crashing', () => {
    const { asFragment } = render(<Results />);
    expect(asFragment(<Results />)).toMatchSnapshot();
  });
  it('is hidden on load', () => {
    const { queryByTestId } = render(<RandomGenerator />);
    expect(queryByTestId('results-output')).toBeFalsy();
  })
  it('shuffles episodes and queries API to fetch name of randomly selected episode', async () => {
    const { getByTestId, queryByTestId } = render(<RandomGenerator />);
    await shuffle(randomNoSeason, getByTestId, queryByTestId);
    // Check that random season/episode was picked
    expect(getByTestId('displayed-season')).toHaveTextContent('5');
    expect(getByTestId('displayed-episode')).toHaveTextContent('17');
    // Check by episode name and show name that correct episode was queried
    expect(getByTestId('displayed-name')).toHaveTextContent('Of Course');
    expect(getByTestId('displayed-show')).toHaveTextContent('How I Met Your Mother');
  });
  it('if option "All" is selected, displays an episode from any season on shuffling', async () => {
    const { getByTestId, queryByTestId } = render(<RandomGenerator />);
    // Test that selecting "All" option is the same as not selecting any option
    await shuffle(randomAllSeasons, getByTestId, queryByTestId, 0.5);
    expect(getByTestId('displayed-season')).toHaveTextContent('5');
    expect(getByTestId('displayed-episode')).toHaveTextContent('17');
    // Test that another value of "random" will return a different season on shuffle
    await shuffle(randomAllSeasons, getByTestId, queryByTestId, 0.8);
    expect(getByTestId('displayed-season')).toHaveTextContent('8');
    expect(getByTestId('displayed-episode')).toHaveTextContent('7');
  });
  it('if season is selected, displays an episode in that season on shuffling', async () => {
    const { getByTestId, queryByTestId } = render(<RandomGenerator />);
    await shuffle(randomWithinSeason, getByTestId, queryByTestId);
    expect(getByTestId('displayed-season')).toHaveTextContent('2');
    expect(getByTestId('displayed-episode')).toHaveTextContent('12');
  });
  it('disappears when season option is changed', async () => {
    const { getByTestId, queryByTestId } = render(<RandomGenerator />);
    await shuffle(randomNoSeason, getByTestId, queryByTestId);
    fireEvent.change(getByTestId('dropdown'), { target: { value: '2' } });
    expect(queryByTestId('results-output')).toBeFalsy();
  });
});
