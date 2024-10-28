import { getProducts } from '@/actions/products/get-products-action';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/actions/products/constants', () => ({
  API_ENDPOINT_URL: 'https://example.com',
}));

vi.spyOn(global, 'fetch').mockResolvedValue({
  json: () =>
    Promise.resolve([
      { id: 1, name: 'Product 1', price: 10 },
      { id: 2, name: 'Product 2', price: 20 },
    ]),
} as Response);

describe('getProducts', () => {
  it('should fetch products with default parameters', async () => {
    const url = new URL('https://example.com/products');
    url.searchParams.append('_page', '1');
    url.searchParams.append('_limit', '20');

    const result = await getProducts({});
    expect(result).toEqual({
      data: [
        { id: 1, name: 'Product 1', price: 10 },
        { id: 2, name: 'Product 2', price: 20 },
      ],
    });

    expect(global.fetch).toHaveBeenCalledWith(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  it('should fetch products with custom parameters', async () => {
    const priceRange = [10, 50];
    const page = 2;
    const limit = 200;
    const search = 'test';
    const sortPrice = 'price';
    const sortPriceOrder = 'asc';
    const category = ['CAT1', 'CAT2'];
    const tier = 'TIER1';
    const theme = 'THEME2';
    const url = new URL('https://example.com/products');
    url.searchParams.append('q', search);
    url.searchParams.append('category', category[0]!);
    url.searchParams.append('category', category[1]!);
    url.searchParams.append('price_gte', `${priceRange[0]}`);
    url.searchParams.append('price_lte', `${priceRange[1]}`);
    url.searchParams.append('tier', tier);
    url.searchParams.append('theme', theme);
    url.searchParams.append('_sort', sortPrice);
    url.searchParams.append('_order', sortPriceOrder);
    url.searchParams.append('_page', `${page}`);
    url.searchParams.append('_limit', `${limit}`);

    const result = await getProducts({
      page,
      limit,
      search,
      sortByPrice: sortPrice,
      sortByPriceOrder: sortPriceOrder,
      priceRange: priceRange,
      category,
      tier,
      theme,
    });

    expect(result).toEqual({
      data: [
        { id: 1, name: 'Product 1', price: 10 },
        { id: 2, name: 'Product 2', price: 20 },
      ],
    });
    expect(global.fetch).toHaveBeenCalledWith(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  it('should handle errors', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));

    const result = await getProducts({});
    expect(result).toEqual({ data: [] });
  });
});
