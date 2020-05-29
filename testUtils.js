import { fireEvent } from '@testing-library/react';
import axiosMock from 'axios';
import successSearch from './__fixtures__/successSearch';
import successShowInfo from './__fixtures__/successShowInfo';
import noPosterSearch from './__fixtures__/noPosterSearch';
import noPosterShowInfo from './__fixtures__/noPosterShowInfo';
import notFoundSearch from './__fixtures__/notFoundSearch';
import noDataSearch from './__fixtures__/noDataSearch';
import noDataShowInfo from './__fixtures__/noDataShowInfo';
import randomSeason2 from './__fixtures__/randomSeason2';
import randomSeasonAllSeed1 from './__fixtures__/randomSeasonAllSeed1';
import randomSeasonAllSeed2 from './__fixtures__/randomSeasonAllSeed2';

jest.mock('axios');

// Mock successful API call (returns show)
export const successfulCall = (getByTestId) => {
  fireEvent.change(getByTestId('search-bar'), { target: { value: 'how i met' } });
  axiosMock.get.mockResolvedValueOnce(successSearch);
  axiosMock.get.mockResolvedValueOnce(successShowInfo);
  fireEvent.submit(getByTestId('search-form'));
};

// Mock successful API call (returns show but no poster)
export const noPosterCall = (getByTestId) => {
  fireEvent.change(getByTestId('search-bar'), { target: { value: 'days of de' } });
  axiosMock.get.mockResolvedValueOnce(noPosterSearch);
  axiosMock.get.mockResolvedValueOnce(noPosterShowInfo);
  fireEvent.submit(getByTestId('search-form'));
};

// Mock unsuccessful API call (show title not found)
export const notFoundCall = (getByTestId) => {
  fireEvent.change(getByTestId('search-bar'), { target: { value: 'abcd' } });
  axiosMock.get.mockResolvedValueOnce(notFoundSearch);
  fireEvent.submit(getByTestId('search-form'));
};

// Mock unsuccessful API call (insufficient data found for show)
export const noDataCall = (getByTestId) => {
  fireEvent.change(getByTestId('search-bar'), { target: { value: 'days of' } });
  axiosMock.get.mockResolvedValueOnce(noDataSearch);
  axiosMock.get.mockResolvedValueOnce(noDataShowInfo);
  fireEvent.submit(getByTestId('search-form'));
};

// Mock season-specific shuffle and API call
export const randomWithinSeason = (getByTestId) => {
  // Mock Math.random() to set seed
  global.Math.random = () => 0.5;
  fireEvent.change(getByTestId('dropdown'), { target: { value: '2' } });
  axiosMock.get.mockResolvedValueOnce(randomSeason2);
  fireEvent.click(getByTestId('shuffle-button'));
};

// Mock all seasons shuffle and API call (selecting no option)
export const randomNoSeason = (getByTestId) => {
  // Mock Math.random() to set seed
  global.Math.random = () => 0.5;
  axiosMock.get.mockResolvedValueOnce(randomSeasonAllSeed1);
  fireEvent.click(getByTestId('shuffle-button'));
};

// Mock all seasons shuffle and API call (selecting "All" option)
export const randomAllSeasons = (getByTestId, seed) => {
  // Mock Math.random() to set seed
  global.Math.random = () => seed;
  fireEvent.change(getByTestId('dropdown'), { target: { value: '2' } });
  fireEvent.change(getByTestId('dropdown'), { target: { value: '0' } });
  axiosMock.get.mockResolvedValueOnce(seed === 0.5 ? randomSeasonAllSeed1: randomSeasonAllSeed2);
  fireEvent.click(getByTestId('shuffle-button'));
};
