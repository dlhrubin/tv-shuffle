import React from 'react';
import { render, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { successfulCall, notFoundCall, noDataCall } from '../../../testUtils';
import Search from './search';

afterEach(cleanup);

describe('Search', () => {
  it('renders without crashing', () => {
    const { asFragment } = render(<Search />);
    expect(asFragment(<Search />)).toMatchSnapshot();
  });
  describe('TV show search bar', () => {
    it('queries API with user-entered search query', async () => {
      const { getByTestId } = render(<Search />);
      successfulCall(getByTestId);
      await waitFor(() => {
        expect(getByTestId('search-bar').value).toEqual('How I Met Your Mother');
      });
    });
    it('returns an error if show title not found', async () => {
      const { getByTestId } = render(<Search />);
      expect(getByTestId('error-message')).toHaveTextContent('');
      notFoundCall(getByTestId);
      await waitFor(() => {
        expect(getByTestId('search-bar').value).toEqual('abcd');
        expect(getByTestId('error-message')).toHaveTextContent('Show title not found');
      });
    });
    it('returns an error if no data available for a show', async () => {
      const { getByTestId } = render(<Search />);
      noDataCall(getByTestId);
      await waitFor(() => {
        expect(getByTestId('search-bar').value).toEqual('Days of Our Lives');
        expect(getByTestId('error-message')).toHaveTextContent('No data available for this title');
      });
    });
  });
  describe('Season dropdown menu', () => {
    it('is enabled and populates with options when search bar returns result', async () => {
      const { container, getByTestId, getByText } = render(<Search />);
      successfulCall(getByTestId);
      await waitFor(() => {
        expect(getByTestId('dropdown')).toBeEnabled();
        // Check for option elements
        expect(container).toContainElement(getByText('All'));
        for (let i = 1; i <= 9; i++) {
          expect(container).toContainElement(getByText(i.toString()));
        }
      });
    });
  });
});
