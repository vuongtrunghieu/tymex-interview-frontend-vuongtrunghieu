'use client';

import {
  LIMIT_DEFAULT,
  searchParamParsers,
} from '@/app/marketplace/search-params';
// @ts-ignore
import type { IProduct } from '@fpoon-tymex/api';
import { Button } from '@fpoon-tymex/ui/button';
import { cn } from '@fpoon-tymex/ui/cn';
import { useQueryStates } from 'nuqs';
import { useMemo } from 'react';

const CATEGORIES: IProduct['category'] = [
  'Upper Body',
  'Lower Body',
  'Hat',
  'Shoes',
  'Accessory',
  'Legendary',
  'Mythic',
  'Epic',
  'Rare',
];

export const FilterCategory = () => {
  const [query, setQuery] = useQueryStates(searchParamParsers, {
    shallow: false,
  });
  const categories = useMemo(
    () => (query?.category?.length ? query.category : []),
    [query.category],
  );

  const handleCategoryClick = (categoryName: string) => {
    if (categoryName === 'All') {
      setQuery({
        category: null,
        limit: LIMIT_DEFAULT,
      });
      return;
    }

    const newCategories = [...(categories || [])];

    if (newCategories.includes(categoryName)) {
      newCategories.splice(newCategories.indexOf(categoryName), 1);
    } else {
      newCategories.push(categoryName);
    }

    if (
      newCategories.length === 0 ||
      newCategories.length === CATEGORIES.length
    ) {
      // None category selected or all categories selected
      // Defaulting to 'All'
      setQuery({
        category: null,
        limit: LIMIT_DEFAULT,
      });
    } else {
      // Update category
      setQuery({
        category: newCategories,
        limit: LIMIT_DEFAULT,
      });
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="accent"
        size="sm"
        onClick={() => handleCategoryClick('All')}
        className={cn(categories.length ? 'bg-fuchsia-900 brightness-75' : '')}
      >
        All
      </Button>
      {CATEGORIES.map((categoryName: string, index: number) => (
        <Button
          variant="accent"
          key={`${categoryName}_${index + 1}`}
          size="sm"
          onClick={() => handleCategoryClick(categoryName)}
          className={cn(
            categories.includes(categoryName)
              ? ''
              : 'bg-fuchsia-900 brightness-75',
          )}
        >
          {categoryName}
        </Button>
      ))}
    </div>
  );
};
