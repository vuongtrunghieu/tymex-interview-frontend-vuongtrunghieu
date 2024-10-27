import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsFloat,
  parseAsInteger,
  parseAsString,
} from 'nuqs/server';

// 20 records per page
export const LIMIT_DEFAULT = 20;

export const searchParamParsers = {
  q: parseAsString.withDefault(''),
  limit: parseAsInteger.withDefault(LIMIT_DEFAULT),
  page: parseAsInteger.withDefault(1),
  sortByPriceOrder: parseAsString,
  sortByTimeOrder: parseAsString,
  tier: parseAsString,
  theme: parseAsString,
  category: parseAsArrayOf(parseAsString, ','),
  priceRange: parseAsArrayOf(parseAsFloat, '-'),
};

export const searchParamsCache = createSearchParamsCache(searchParamParsers);
