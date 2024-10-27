import { getProducts } from '@/actions/products/get-products-action';
import { ItemCard, ItemCardLoading } from '@/app/marketplace/ItemCard';
// @ts-ignore
import type { IProduct } from '@fpoon-tymex/api';
import { ScrollArea } from '@fpoon-tymex/ui/scroll-area';
import React, { Suspense } from 'react';

export const ItemsContainer = async () => {
  const result = await getProducts({});

  if (!result || !result.data?.length) {
    return (
      <div>
        <p>No results</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-2rem)] pr-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-8">
        <Suspense>
          {result?.data.map((item: IProduct, index: number) => (
            <ItemCard item={item} key={`${item?.id}_${index}`} />
          ))}
        </Suspense>
      </div>
    </ScrollArea>
  );
};

export const ItemsContainerLoading = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-8">
      {[...Array(5)].map((_, index: number) => (
        <ItemCardLoading key={`${_}_${index + 1}`} />
      ))}
    </div>
  );
};
