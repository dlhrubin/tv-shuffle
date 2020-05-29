import React from 'react';
import { render, cleanup, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { successfulCall, notFoundCall, noDataCall, randomNoSeason } from '../../testUtils';
import RandomGenerator from './randomGenerator';

afterEach(cleanup);

const checkDisabled = (getByTestId) => {
  expect(getByTestId('dropdown')).toBeDisabled();
  expect(getByTestId('shuffle-button')).toBeDisabled();
};

describe('RandomGenerator', () => {
  it('renders without crashing', () => {
    const { asFragment } = render(<RandomGenerator />);
    expect(asFragment(<RandomGenerator />)).toMatchSnapshot();
  });
  it('resets when user types in search box again', async () => {
    const { getByTestId, queryByTestId } = render(<RandomGenerator />);
    successfulCall(getByTestId);
    await waitFor(() => {
      expect(getByTestId('dropdown')).toBeEnabled();
    });
    randomNoSeason(getByTestId);
    await waitFor(() => {
      expect(queryByTestId('results-output')).toBeTruthy();
    });
    fireEvent.change(getByTestId('search-bar'), { target: {value: 'changing the query'}});
    checkDisabled(getByTestId);
    expect(queryByTestId('default-icon')).toBeTruthy();
    expect(queryByTestId('poster-image')).toBeNull();
    expect(queryByTestId('results-output')).toBeFalsy();
  });
  describe('Season dropdown menu and shuffle button', () => {
    it('are disabled on load', () => {
      const { getByTestId } = render(<RandomGenerator />);
      checkDisabled(getByTestId);
    });
    it('stay disabled when search bar returns "Show not found" error', async () => {
      const { getByTestId } = render(<RandomGenerator />);
      notFoundCall(getByTestId);
      await waitFor(() => {
        checkDisabled(getByTestId);
      });
    });
    it('stay disabled when search bar returns "No data" error', async () => {
      const { getByTestId } = render(<RandomGenerator />);
      noDataCall(getByTestId);
      await waitFor(() => {
        checkDisabled(getByTestId);
      });
    });
  });
});
