import { FiltersGroupMobile } from '@/app/marketplace/FiltersGroupMobile';
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

describe('FiltersGroupMobile', () => {
  it('should render the component successfully', () => {
    render(<FiltersGroupMobile />);

    expect(screen.getByText('Sorts & Filters')).toBeInTheDocument();
  });
});
