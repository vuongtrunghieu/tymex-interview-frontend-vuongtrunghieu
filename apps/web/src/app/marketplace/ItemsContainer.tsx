import { getProducts } from '@/actions/products/get-products-action';
import { ItemCard, ItemCardLoading } from '@/app/marketplace/ItemCard';
import { ItemsContainerScrollToTop } from '@/app/marketplace/ItemsContainerScrollToTop';
import { ViewMore } from '@/app/marketplace/ViewMore';
import {
  LIMIT_DEFAULT,
  searchParamsCache,
} from '@/app/marketplace/search-params';
// @ts-ignore
import type { IProduct } from '@fpoon-tymex/api';
import { ScrollArea } from '@fpoon-tymex/ui/scroll-area';

export const ItemsContainer = async () => {
  const query = searchParamsCache.all();
  const result = await getProducts({
    search: query.q || undefined,
    limit: query.limit || LIMIT_DEFAULT,
    page: query.page || 1,
    tier: query.tier || undefined,
    theme: query.theme || undefined,
    category: query.category || undefined,
    priceRange: query.priceRange || undefined,
    sortByPrice: query.sortByPriceOrder ? 'price' : undefined,
    sortByPriceOrder: (query.sortByPriceOrder as 'asc' | 'desc') || undefined,
    sortByTime: query.sortByTimeOrder ? 'createdAt' : undefined,
    sortByTimeOrder: (query.sortByTimeOrder as 'asc' | 'desc') || undefined,
  });

  if (result?.validationErrors || result?.serverError) {
    // TODO: Can be implemented in safe-action middleware, a cleaner way
    console.error('Validation Errors', result.validationErrors);
    console.error('Server Error', result.serverError);
  }

  if (!result || !result.data?.length) {
    return (
      <div>
        <p>No results</p>
      </div>
    );
  }

  return (
    <>
      <ScrollArea
        className="h-[calc(100vh-16rem)] pr-4"
        data-testid="items-container-scroll"
      >
        <ItemsContainerScrollToTop params={query} />
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-8"
          data-testid="items-container"
        >
          {result.data.map((item: IProduct, index: number) => (
            <ItemCard item={item} key={`${item?.id}_${index}`} />
          ))}
        </div>
      </ScrollArea>
      <div className="pt-16 flex justify-center" key={result.data.length}>
        <ViewMore currentLength={result.data.length} />
      </div>
    </>
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
