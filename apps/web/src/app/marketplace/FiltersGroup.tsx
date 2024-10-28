'use client';

import {
  LIMIT_DEFAULT,
  MAX_PRICE_RANGE,
  MIN_PRICE_RANGE,
  PAGE_DEFAULT,
  searchParamParsers,
} from '@/app/marketplace/search-params';
import { debounce } from '@/utils/debounce';
import { Button } from '@fpoon-tymex/ui/button';
import { cn } from '@fpoon-tymex/ui/cn';
import { DualRangeSlider } from '@fpoon-tymex/ui/dual-range-slider';
import { Icons } from '@fpoon-tymex/ui/icons';
import { Input } from '@fpoon-tymex/ui/input';
import { Label } from '@fpoon-tymex/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@fpoon-tymex/ui/select';
import { useQueryStates } from 'nuqs';
import React, {
  type KeyboardEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

const DEFAULTS = {
  q: '',
  priceRange: [MIN_PRICE_RANGE, MAX_PRICE_RANGE],
  theme: null,
  tier: null,
  sortByPriceOrder: null,
  sortByTimeOrder: null,
};

export const FiltersGroup = () => {
  const [query, setQuery] = useQueryStates(searchParamParsers, {
    shallow: false,
  });
  const [sortByPriceOrder, setSortByPriceOrder] = useState(
    query.sortByPriceOrder,
  );
  const [sortByTimeOrder, setSortByTimeOrder] = useState(query.sortByTimeOrder);
  const [tier, setTier] = useState(query.tier);
  const [theme, setTheme] = useState(query.theme);
  const [priceRange, setPriceRange] = useState([
    query.priceRange?.[0] || MIN_PRICE_RANGE,
    query.priceRange?.[1] || MAX_PRICE_RANGE,
  ]);
  const [search, setSearch] = useState(query.q || '');

  const debounced = useCallback(
    debounce(
      ({
        theme,
        sortByPriceOrder,
        sortByTimeOrder,
        tier,
        priceRange,
        search,
      }) =>
        setQuery({
          theme: theme || null,
          sortByPriceOrder: sortByPriceOrder || null,
          sortByTimeOrder: sortByTimeOrder || null,
          tier: tier || null,
          priceRange: priceRange || null,
          q: search || null,
          limit: LIMIT_DEFAULT,
          page: PAGE_DEFAULT,
        }),
      1000,
    ),
    [setQuery],
  );
  /* Automatically debounce filter & sorting changes, making Search button obsoleted */
  useEffect(() => {
    handleFilter();
  }, [tier, sortByPriceOrder, sortByTimeOrder, theme, search, priceRange]);

  const isDirty = useMemo(
    () =>
      DEFAULTS.q !== search ||
      DEFAULTS.priceRange[0] !== priceRange[0] ||
      DEFAULTS.priceRange[1] !== priceRange[1] ||
      DEFAULTS.theme !== theme ||
      DEFAULTS.tier !== tier ||
      DEFAULTS.sortByPriceOrder !== sortByPriceOrder ||
      DEFAULTS.sortByTimeOrder !== sortByTimeOrder,
    [tier, sortByPriceOrder, sortByTimeOrder, theme, search, priceRange],
  );
  const handleResetFilters = () => {
    setSortByPriceOrder(DEFAULTS.sortByPriceOrder);
    setSortByTimeOrder(DEFAULTS.sortByTimeOrder);
    setTier(DEFAULTS.tier);
    setTheme(DEFAULTS.theme);
    setPriceRange(DEFAULTS.priceRange);
    setSearch('');
    setQuery({ ...DEFAULTS, limit: LIMIT_DEFAULT, page: PAGE_DEFAULT });
  };

  const handleFilter = () => {
    // Commit update to URL search params, and trigger refetch of data API
    debounced({
      theme,
      sortByPriceOrder,
      sortByTimeOrder,
      tier,
      priceRange,
      search,
    });
  };

  const handleSearch: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleFilter();
    }
  };

  return (
    <section className="space-y-6">
      <div>
        <Label htmlFor="search-filter" className="sr-only">
          Search
        </Label>
        <Input
          id="search-filter"
          data-testid="search-filter"
          value={search}
          type="text"
          placeholder="Quick search"
          onChange={(e) => setSearch(e.target.value)}
          icon={Icons.SearchIcon}
          iconProps={{ behavior: 'prepend', className: 'h-4 w-4 mr-1' }}
          onKeyDown={handleSearch}
        />
      </div>
      <div className="space-y-4 pb-8">
        <Label
          htmlFor="price-filter"
          className="uppercase font-bold text-muted-foreground"
        >
          Price
        </Label>
        <DualRangeSlider
          id="price-filter"
          data-testid="price-filter"
          label={(value) => (
            <div className="text-sm hidden group-hover:block">{value}</div>
          )}
          labelPosition="top"
          value={priceRange}
          onValueChange={setPriceRange}
          min={MIN_PRICE_RANGE}
          max={MAX_PRICE_RANGE}
          step={0.01}
          rangeClassName="bg-gradient-to-r from-pink-600 to-fuchsia-600"
          thumbClassName="bg-gradient-to-r from-pink-600 to-fuchsia-600"
          showMinMax
          unit="ETH"
          className="group"
        />
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="tier-filter"
            className="uppercase font-bold text-muted-foreground"
          >
            Tier
          </Label>
          <Select
            value={tier || 'All'}
            onValueChange={(val) => setTier(val === 'All' ? null : val)}
          >
            <SelectTrigger id="tier-filter" data-testid="tier-filter">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Basic">Basic</SelectItem>
              <SelectItem value="Premium">Premium</SelectItem>
              <SelectItem value="Deluxe">Deluxe</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="theme-filter"
            className="uppercase font-bold text-muted-foreground"
          >
            Theme
          </Label>
          <Select
            value={theme || 'All'}
            onValueChange={(val) => setTheme(val === 'All' ? null : val)}
          >
            <SelectTrigger id="theme-filter" data-testid="theme-filter">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Dark">Dark</SelectItem>
              <SelectItem value="Light">Light</SelectItem>
              <SelectItem value="Colorful">Colorful</SelectItem>
              <SelectItem value="Halloween">Halloween</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="time-sort"
            className="uppercase font-bold text-muted-foreground"
          >
            Time
          </Label>
          <Select
            value={sortByTimeOrder || 'none'}
            onValueChange={(val) =>
              setSortByTimeOrder(val === 'none' ? null : val)
            }
          >
            <SelectTrigger id="time-sort" data-testid="time-sort">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Unsorted</SelectItem>
              <SelectItem value="desc">Latest</SelectItem>
              <SelectItem value="asc">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="price-sort"
            className="uppercase font-bold text-muted-foreground"
          >
            Price
          </Label>
          <Select
            value={sortByPriceOrder || 'none'}
            onValueChange={(val) =>
              setSortByPriceOrder(val === 'none' ? null : val)
            }
          >
            <SelectTrigger id="price-sort" data-testid="price-sort">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Unsorted</SelectItem>
              <SelectItem value="asc">Low to High</SelectItem>
              <SelectItem value="desc">High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div
        className={cn(
          'flex items-center',
          isDirty ? 'justify-between' : 'justify-end',
        )}
      >
        {isDirty && (
          <Button variant="ghost" onClick={handleResetFilters}>
            <Icons.CircleX
              className="h-4 w-4 outline-0 fill-yellow-500 text-background"
              tabIndex={0}
            />
            Reset filters
          </Button>
        )}
        <Button
          variant="accent"
          className="min-w-[150px]"
          onClick={handleFilter}
          disabled={!isDirty}
        >
          Search
        </Button>
      </div>
    </section>
  );
};
