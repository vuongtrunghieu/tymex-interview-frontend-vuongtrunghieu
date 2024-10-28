import { FiltersGroup } from '@/app/marketplace/FiltersGroup';
import { render, screen } from '@testing-library/react';

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.mock('nuqs', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    // @ts-ignore
    ...actual,
    useQueryStates: vi.fn().mockReturnValue([
      {
        sortByPriceOrder: 'price',
      },
      vi.fn(),
    ]),
  };
});

vi.mock('nuqs/server', () => {
  return {
    createSearchParamsCache: vi.fn().mockReturnValue({
      parseFloat: vi.fn(),
    }),
  };
});

vi.mock('@/app/marketplace/search-params', () => {
  return {
    searchParamParsers: vi.fn(),
    LIMIT_DEFAULT: vi.fn(),
    MAX_PRICE_RANGE: vi.fn(),
    MIN_PRICE_RANGE: vi.fn(),
    PAGE_DEFAULT: vi.fn(),
  };
});

describe('FiltersGroup', () => {
  it('should render the component successfully', () => {
    render(<FiltersGroup />);

    expect(screen.getByTestId('search-filter')).toBeInTheDocument();
    expect(screen.getByTestId('price-filter')).toBeInTheDocument();
    expect(screen.getByTestId('theme-filter')).toBeInTheDocument();
    expect(screen.getByTestId('tier-filter')).toBeInTheDocument();
    expect(screen.getByTestId('time-sort')).toBeInTheDocument();
    expect(screen.getByTestId('price-sort')).toBeInTheDocument();
  });
});
