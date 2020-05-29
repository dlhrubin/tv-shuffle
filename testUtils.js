import { fireEvent } from '@testing-library/react';
import axiosMock from 'axios';
import successSearch from './__fixtures__/successSearch';
import successShowInfo from './__fixtures__/successShowInfo';
import noPosterSearch from './__fixtures__/noPosterSearch';
import noPosterShowInfo from './__fixtures__/noPosterShowInfo';
import notFoundSearch from './__fixtures__/notFoundSearch';
import noDataSearch from './__fixtures__/noDataSearch';
import noDataShowInfo from './__fixtures__/noDataShowInfo';

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
