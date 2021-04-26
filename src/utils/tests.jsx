import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import SearchData from '../course-search/SearchContext';

export function renderWithRouter(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {},
) {
  // eslint-disable-next-line react/prop-types
  const Wrapper = ({ children }) => (
    <Router history={history}>{children}</Router>
  );
  return {
    ...render(ui, { wrapper: Wrapper }),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  };
}

export const renderWithSearchContext = (children) => renderWithRouter(
  <SearchData>
    {children}
  </SearchData>,
);

export const renderWithSearchContextAndTracking = (children, trackingName) => renderWithRouter(
  <SearchData trackingName={trackingName}>
    {children}
  </SearchData>,
);
