import { FilterCategory } from '@/app/marketplace/FilterCategory';
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

describe('FilterCategory', () => {
  it('should render the component successfully', () => {
    render(<FilterCategory />);

    expect(screen.getByTestId('filter-category')).toBeInTheDocument();
  });
});
