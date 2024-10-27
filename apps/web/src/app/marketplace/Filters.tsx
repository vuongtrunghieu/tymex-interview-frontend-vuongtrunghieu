'use client';

import { Label } from '@fpoon-tymex/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@fpoon-tymex/ui/select';
import { useQueryState } from 'nuqs';

export const Filters = () => {
  const [sortByPriceOrder, setSortByPriceOrder] = useQueryState(
    'sortByPriceOrder',
    {
      shallow: false,
    },
  );
  const [sortByTimeOrder, setSortByTimeOrder] = useQueryState(
    'sortByTimeOrder',
    {
      shallow: false,
    },
  );

  return (
    <section className="space-y-4">
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
            <SelectItem value="desc">Latest</SelectItem>
            <SelectItem value="asc">Oldest</SelectItem>
            <SelectItem value="none">Unsorted</SelectItem>
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
            <SelectItem value="asc">Low to High</SelectItem>
            <SelectItem value="desc">High to Low</SelectItem>
            <SelectItem value="none">Unsorted</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
};
