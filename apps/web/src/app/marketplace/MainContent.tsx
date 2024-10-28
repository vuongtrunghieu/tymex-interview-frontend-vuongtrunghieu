import { FilterCategory } from '@/app/marketplace/FilterCategory';
import { FiltersGroup } from '@/app/marketplace/FiltersGroup';
import { FiltersGroupMobile } from '@/app/marketplace/FiltersGroupMobile';
import { IntervalRefreshData } from '@/app/marketplace/IntervalRefreshData';
import {
  ItemsContainer,
  ItemsContainerLoading,
} from '@/app/marketplace/ItemsContainer';
import { env } from '@/env.mjs';
import { Suspense } from 'react';

const MainContent = async () => {
  const refreshIntervalInMilliseconds = (env.API_REFRESH_INTERVAL || 60) * 1000;

  return (
    <div className="container 2xl:max-w-[1440px] flex-grow lg:py-8 relative">
      <div className="flex flex-col lg:flex-row gap-6">
        <section className="hidden lg:block w-full lg:w-96 flex-shrink-0">
          <FiltersGroup />
        </section>
        <div className="block lg:hidden">
          <FiltersGroupMobile />
        </div>

        <section className="flex-1">
          <div className="hidden lg:flex items-center justify-between mb-6">
            <FilterCategory />
          </div>

          <IntervalRefreshData interval={refreshIntervalInMilliseconds} />
          <Suspense fallback={<ItemsContainerLoading />}>
            <ItemsContainer />
          </Suspense>
        </section>
      </div>
    </div>
  );
};

export default MainContent;
