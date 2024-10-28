import {
  createSearchParamsCache,
  type inferParserType,
  parseAsArrayOf,
  parseAsFloat,
  parseAsInteger,
  parseAsString,
} from 'nuqs/server';

// 20 records per page
export const LIMIT_DEFAULT = 20;
export const PAGE_DEFAULT = 1;
// Assumption from the design, we have max range = 200 ETH, and min range = 0.01 ETH
export const MAX_PRICE_RANGE = 200;
export const MIN_PRICE_RANGE = 0.01;

export const searchParamParsers = {
  q: parseAsString.withDefault(''),
  limit: parseAsInteger,
  page: parseAsInteger.withDefault(PAGE_DEFAULT),
  sortByPriceOrder: parseAsString,
  sortByTimeOrder: parseAsString,
  tier: parseAsString,
  theme: parseAsString,
  category: parseAsArrayOf(parseAsString, ','),
  priceRange: parseAsArrayOf(parseAsFloat, '-').withDefault([
    MIN_PRICE_RANGE,
    MAX_PRICE_RANGE,
  ]),
  // Data API Refresh At, in Unix Epoch
  // Used to trigger refetch of data API
  r: parseAsInteger.withDefault(0),
};

export type SearchParamsType = inferParserType<typeof searchParamParsers>;

export const searchParamsCache = createSearchParamsCache(searchParamParsers);
