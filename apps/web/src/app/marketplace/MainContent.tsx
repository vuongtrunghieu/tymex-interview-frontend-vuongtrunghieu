import { FilterCategory } from '@/app/marketplace/FilterCategory';
import { FiltersGroup } from '@/app/marketplace/FiltersGroup';
import {
  ItemsContainer,
  ItemsContainerLoading,
} from '@/app/marketplace/ItemsContainer';
import { Suspense } from 'react';

const MainContent = async () => {
  return (
    <div className="container 2xl:max-w-[1440px] flex-grow py-8 relative">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="space-y-4">
            <FiltersGroup />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <FilterCategory />
          </div>

          <Suspense fallback={<ItemsContainerLoading />}>
            <ItemsContainer />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
