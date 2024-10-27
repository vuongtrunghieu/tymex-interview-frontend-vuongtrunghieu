import { getProducts } from '@/actions/products/get-products-action';
import { ItemCard, ItemCardLoading } from '@/app/marketplace/ItemCard';
import { searchParamsCache } from '@/app/marketplace/search-params';
// @ts-ignore
import type { IProduct } from '@fpoon-tymex/api';
import { ScrollArea } from '@fpoon-tymex/ui/scroll-area';

export const ItemsContainer = async () => {
  const query = searchParamsCache.all();
  const result = await getProducts({
    search: query.q,
    limit: query.limit,
    page: query.page,
    sortByPrice: query.sortByPriceOrder ? 'price' : undefined,
    sortByPriceOrder: (query.sortByPriceOrder as 'asc' | 'desc') || undefined,
    sortByTime: query.sortByTimeOrder ? 'createdAt' : undefined,
    sortByTimeOrder: (query.sortByTimeOrder as 'asc' | 'desc') || undefined,
  });

  if (result?.validationErrors) {
    console.error(result.validationErrors);
  }

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
        {result.data.map((item: IProduct, index: number) => (
          <ItemCard item={item} key={`${item?.id}_${index}`} />
        ))}
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