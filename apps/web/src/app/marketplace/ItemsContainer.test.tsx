import { ItemsContainer } from '@/app/marketplace/ItemsContainer';
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
    useQueryState: vi.fn().mockReturnValue([null, vi.fn()]),
  };
});

vi.mock('nuqs/server', () => {
  return {
    createSearchParamsCache: vi.fn().mockReturnValue({
      parseFloat: vi.fn(),
    }),
  };
});

vi.mock('@/actions/products/get-products-action', () => {
  return {
    getProducts: vi.fn().mockReturnValue({
      data: [
        {
          id: 1,
          title: 'Metal Gear Girl',
          category: 'Mythic',
          price: 30.09,
          isFavorite: false,
          createdAt: 1624533946000,
          theme: 'Halloween',
          tier: 'Premium',
          imageId: 8,
          author: {
            firstName: 'Dewie',
            lastName: 'Labeuil',
            email: 'dlabeuilv@nba.com',
            gender: 'Male',
            avatar:
              'https://robohash.org/nihiltotamdolorem.png?size=100x100&set=set1',
            onlineStatus: 'idle',
          },
        },
        {
          id: 2,
          title: 'Rhythm Ruler',
          category: 'Epic',
          price: 52.57,
          isFavorite: true,
          createdAt: 1652687980000,
          theme: 'Halloween',
          tier: 'Deluxe',
          imageId: 11,
          author: {
            firstName: 'Thaddeus',
            lastName: 'Tumulty',
            email: 'ttumultyt@t-online.de',
            gender: 'Male',
            avatar:
              'https://robohash.org/perferendisitaquedolor.png?size=100x100&set=set1',
            onlineStatus: 'offline',
          },
        },
      ],
    }),
  };
});

vi.mock('@/app/marketplace/search-params', () => {
  return {
    searchParamsCache: {
      all: vi.fn().mockReturnValue({
        q: '',
        limit: 20,
        page: 1,
      }),
    },
  };
});

describe('ItemsContainer', () => {
  it('should render the component successfully', async () => {
    render(await (async () => await ItemsContainer())());

    expect(screen.getByTestId('items-container-scroll')).toBeInTheDocument();
  });
});
