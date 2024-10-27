'use client';

import { searchParamParsers } from '@/app/marketplace/search-params';
import { Button } from '@fpoon-tymex/ui/button';
import { Label } from '@fpoon-tymex/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@fpoon-tymex/ui/select';
import { useQueryStates } from 'nuqs';
import { useState } from 'react';

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
  const [category, setCategory] = useState(query.category);

  const handleFilter = () => {
    setQuery({
      theme: theme || null,
      sortByPriceOrder: sortByPriceOrder || null,
      sortByTimeOrder: sortByTimeOrder || null,
      tier: tier || null,
      category: category || null,
      q: query.q || null,
      limit: query.limit || null,
      page: query.page || null,
    });
  };

  return (
    <section className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="price-sort"
            className="uppercase font-bold text-muted-foreground"
          >
            Tier
          </Label>
          <Select
            value={tier || 'all'}
            onValueChange={(val) => setTier(val === 'All' ? null : val)}
          >
            <SelectTrigger id="price-sort">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Dark">Basic</SelectItem>
              <SelectItem value="Light">Premium</SelectItem>
              <SelectItem value="Colorful">Deluxe</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="price-sort"
            className="uppercase font-bold text-muted-foreground"
          >
            Theme
          </Label>
          <Select
            value={theme || 'all'}
            onValueChange={(val) => setTheme(val === 'All' ? null : val)}
          >
            <SelectTrigger id="price-sort">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Dark">Dark</SelectItem>
              <SelectItem value="Light">Light</SelectItem>
              <SelectItem value="Colorful">Colorful</SelectItem>
              <SelectItem value="Halloween">Halloween</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="price-sort"
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
            <SelectTrigger id="price-sort">
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
