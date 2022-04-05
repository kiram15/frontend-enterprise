import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import SearchHeader, { filtersColTestId, searchBoxColTestId } from '../SearchHeader';
import { STYLE_VARIANTS } from '../data/constants';

import { renderWithSearchContext } from './utils';

// Mocking this connected component so as not to have to mock the algolia Api
jest.mock('../SearchBox', () => ({
  __esModule: true,
  default: () => <div>SEARCH</div>,
}));

jest.mock('../SearchFilters', () => ({
  __esModule: true,
  default: () => <div>Filter</div>,
}));

const defaultIndexProp = {
  search: jest.fn(() => Promise.resolve({ hits: [], nbHits: 0 })),
};

const enterpriseConfig = { slug: 'test-enterprise' };
describe('SearchHeader', () => {
  test('displays a SearchBox', () => {
    renderWithSearchContext(<SearchHeader index={defaultIndexProp} enterpriseConfig={enterpriseConfig} />);
    expect(screen.getByText('SEARCH')).toBeInTheDocument();
  });
  test('has the inverse variant by default -- search box', () => {
    renderWithSearchContext(<SearchHeader index={defaultIndexProp} enterpriseConfig={enterpriseConfig} />);
    expect(screen.getByTestId(searchBoxColTestId).className).not.toContain('fe__searchbox-col--default');
  });
  test('adds class names for default variant -- search box', () => {
    renderWithSearchContext(<SearchHeader index={defaultIndexProp} variant={STYLE_VARIANTS.default} enterpriseConfig={enterpriseConfig} />);
    expect(screen.getByTestId(searchBoxColTestId).className).toContain('fe__searchbox-col--default');
  });
  test('has the inverse variant by default -- filters', () => {
    renderWithSearchContext(<SearchHeader index={defaultIndexProp} enterpriseConfig={enterpriseConfig} />);
    expect(screen.getByTestId(filtersColTestId).className).not.toContain('fe__searchbox-col--default');
  });
  test('adds class names for default variant -- filters', () => {
    renderWithSearchContext(<SearchHeader variant={STYLE_VARIANTS.default} index={defaultIndexProp} enterpriseConfig={enterpriseConfig} />);
    expect(screen.getByTestId(filtersColTestId).className).toContain('fe__searchbox-col--default');
  });
});
