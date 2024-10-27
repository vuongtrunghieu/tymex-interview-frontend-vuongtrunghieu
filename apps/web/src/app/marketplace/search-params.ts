import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
} from 'nuqs/server';

export const searchParamParsers = {
  q: parseAsString.withDefault(''),
  limit: parseAsInteger.withDefault(20),
  page: parseAsInteger.withDefault(1),
  sortByPriceOrder: parseAsString,
  sortByTimeOrder: parseAsString,
  tier: parseAsString,
  theme: parseAsString,
  category: parseAsArrayOf(parseAsString, ','),
};

export const searchParamsCache = createSearchParamsCache(searchParamParsers);
