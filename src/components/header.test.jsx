import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Header from './header';

afterEach(cleanup);

describe('Header', () => {
  it('renders without crashing', () => {
    const { asFragment } = render(<Header />);
    expect(asFragment(<Header />)).toMatchSnapshot();
  });
});
