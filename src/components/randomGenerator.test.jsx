import React from 'react';
import { render, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { successfulCall, notFoundCall, noDataCall } from '../../testUtils';
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
