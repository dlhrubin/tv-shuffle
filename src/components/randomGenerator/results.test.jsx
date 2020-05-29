import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Results from './results';

afterEach(cleanup);

describe('Results', () => {
  it('renders without crashing', () => {
    const { asFragment } = render(<Results />);
    expect(asFragment(<Results />)).toMatchSnapshot();
  });
});
