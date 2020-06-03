import React from 'react';
import { render, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { successfulCall } from '../../../testUtils';
import Shuffle from './shuffle';
import RandomGenerator from '../randomGenerator';

afterEach(cleanup);

describe('Shuffle', () => {
  it('renders without crashing', () => {
    const { asFragment } = render(<Shuffle />);
    expect(asFragment(<Shuffle />)).toMatchSnapshot();
  });
  it('is enabled when search bar returns result', async () => {
    const { getByTestId } = render(<RandomGenerator />);
    successfulCall(getByTestId);
    await waitFor(() => {
      expect(getByTestId('shuffle-button')).toBeEnabled();
    });
  });
});
