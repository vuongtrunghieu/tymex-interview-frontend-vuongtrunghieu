'use client';

import { searchParamParsers } from '@/app/marketplace/search-params';
import { Button } from '@fpoon-tymex/ui/button';
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
import { type KeyboardEventHandler, useState } from 'react';

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
  // Assumption from the design, we have max range = 200 ETH, and min range = 0.01 ETH
  const MAX_PRICE_RANGE = 200;
  const MIN_PRICE_RANGE = 0.01;
  const [priceRange, setPriceRange] = useState([
    query.priceRange?.[0] || MIN_PRICE_RANGE,
    query.priceRange?.[1] || MAX_PRICE_RANGE,
  ]);
  const [search, setSearch] = useState(query.q);

  const handleFilter = () => {
    setQuery({
      theme: theme || null,
      sortByPriceOrder: sortByPriceOrder || null,
      sortByTimeOrder: sortByTimeOrder || null,
      tier: tier || null,
      priceRange: priceRange || null,
      q: search || null,
      limit: query.limit || null,
      page: query.page || null,
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
        <Input
          id="search-filter"
          value={search || ''}
          type="text"
          placeholder="Quick search"
          onChange={(e) => setSearch(e.target.value)}
          icon={Icons.SearchIcon}
          iconProps={{ behavior: 'prepend', className: 'h-4 w-4 mr-1' }}
          onKeyDown={handleSearch}
        />
      </div>
      <div className="space-y-4 mb-12">
        <Label
          htmlFor="price-filter"
          className="uppercase font-bold text-muted-foreground"
        >
          Price
        </Label>
        <DualRangeSlider
          id="price-filter"
          label={(value) => (
            <div className="text-sm hidden group-hover:block">{value}</div>
          )}
          labelPosition="top"
          value={priceRange}
          onValueChange={setPriceRange}
          min={MIN_PRICE_RANGE}
          max={MAX_PRICE_RANGE}
          step={0.01}
          rangeClassName="bg-accent"
          thumbClassName="bg-accent"
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
            <SelectTrigger id="tier-filter">
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
            <SelectTrigger id="theme-filter">
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
            <SelectTrigger id="time-sort">
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
            <SelectTrigger id="price-sort">
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
      <div className="flex items-center justify-end">
        {/* TODO reset filters whenever it's not the defaults*/}
        <Button
          variant="accent"
          className="min-w-[150px]"
          onClick={handleFilter}
        >
          Search
        </Button>
      </div>
    </section>
  );
};
