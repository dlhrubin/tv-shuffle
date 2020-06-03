import React from 'react';
import { render, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { successfulCall, noPosterCall } from '../../../testUtils';
import PreviewImage from './previewImage';
import RandomGenerator from '../randomGenerator';

afterEach(cleanup);

describe('PreviewImage', () => {
  it('renders without crashing', () => {
    const { asFragment } = render(<PreviewImage />);
    expect(asFragment(<PreviewImage />)).toMatchSnapshot();
  });
  it('displays default popcorn icon on load', () => {
    const { queryByTestId } = render(<PreviewImage />);
    expect(queryByTestId('default-icon')).toBeTruthy();
    expect(queryByTestId('poster-image')).toBeNull();
  });
  it('displays show poster when search bar returns show with poster ', async () => {
    const { queryByTestId, getByTestId } = render(<RandomGenerator />);
    successfulCall(getByTestId);
    await waitFor(() => {
      expect(queryByTestId('poster-image')).toBeTruthy();
    });
    expect(queryByTestId('poster-image').src)
      .toEqual('http://image.tmdb.org/t/p/w500/b34jPzmB0wZy7EjUZoleXOl2RRI.jpg');
    expect(queryByTestId('default-icon')).toBeNull();
  });
  it('displays default popcorn icon when search bar returns show with no poster', async () => {
    const { queryByText, queryByTestId, getByTestId } = render(<RandomGenerator />);
    noPosterCall(getByTestId);
    await waitFor(() => {
      expect(queryByTestId('default-icon')).toBeTruthy();
      expect(queryByTestId('poster-image')).toBeNull();
    });
    // Check that other elements respond to returned result
    expect(getByTestId('search-bar').value).toEqual('Days of Delight');
    expect(getByTestId('dropdown')).toBeEnabled();
    expect(queryByText('All')).toBeTruthy();
    expect(queryByText('1')).toBeTruthy();
    expect(getByTestId('shuffle-button')).toBeEnabled();
  });
});
