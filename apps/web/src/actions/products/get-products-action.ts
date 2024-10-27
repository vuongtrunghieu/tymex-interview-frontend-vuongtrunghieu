'use server';

import { API_ENDPOINT_URL } from '@/actions/products/constants';
import { actionClient } from '@/actions/safe-action';
import { z } from 'zod';

const schema = z.object({
  page: z.number().min(1).optional(),
  limit: z.number().min(1).optional(),
  search: z.string().optional(),
  sortByPrice: z.string().optional(),
  sortByTime: z.string().optional(),
  sortByPriceOrder: z.enum(['asc', 'desc']).optional(),
  sortByTimeOrder: z.enum(['asc', 'desc']).optional(),
  theme: z.string().optional(),
  tier: z.string().optional(),
  category: z.array(z.string()).optional(),
  priceRange: z.array(z.number()).length(2).optional(),
});

export const getProducts = actionClient
  .schema(schema)
  .action(
    async ({
      parsedInput: {
        page,
        limit,
        search,
        sortByPrice,
        sortByTime,
        sortByTimeOrder,
        sortByPriceOrder,
        tier,
        theme,
        category,
        priceRange,
      },
    }) => {
      try {
        const url = new URL(`${API_ENDPOINT_URL}/products`);

        if (search) {
          url.searchParams.append('q', search);
        }
        if (category?.length) {
          for (const cat of category) {
            url.searchParams.append('category', cat);
          }
        }
        if (priceRange?.length) {
          const [min, max] = priceRange;
          if (min && max) {
            url.searchParams.append('price_gte', min.toString());
            url.searchParams.append('price_lte', max.toString());
          }
        }
        if (tier) {
          url.searchParams.append('tier', tier);
        }
        if (theme) {
          url.searchParams.append('theme', theme);
        }
        if (sortByTime || sortByPrice) {
          const sorts = [sortByPrice, sortByTime].filter(Boolean);
          const orders = [sortByPriceOrder, sortByTimeOrder].filter(Boolean);
          url.searchParams.append('_sort', sorts.join(','));
          url.searchParams.append('_order', orders.join(','));
        }
        url.searchParams.append('_page', page ? page.toString() : '1');
        url.searchParams.append('_limit', limit ? limit.toString() : '20');

        const res = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();

        if (!data) return [];

        return data;
      } catch (err) {
        console.error(err);
        return [];
      }
    },
  );
