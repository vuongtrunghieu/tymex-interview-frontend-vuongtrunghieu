'use server';

import { API_ENDPOINT_URL } from '@/actions/products/constants';
import { actionClient } from '@/actions/safe-action';
import { z } from 'zod';

const schema = z.object({
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

export const getProducts = actionClient
  .schema(schema)
  .action(
    async ({ parsedInput: { page, limit, search, sortBy, sortOrder } }) => {
      try {
        const url = new URL(`${API_ENDPOINT_URL}/products`);

        if (search) {
          url.searchParams.append('q', search);
        }
        if (sortBy) {
          url.searchParams.append('_sort', sortBy);
        }
        if (sortOrder) {
          url.searchParams.append('_order', sortOrder);
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
