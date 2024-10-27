import {
  ItemsContainer,
  ItemsContainerLoading,
} from '@/app/marketplace/ItemsContainer';
import { Button } from '@fpoon-tymex/ui/button';
import { Card } from '@fpoon-tymex/ui/card';
import { Separator } from '@fpoon-tymex/ui/separator';
import React, { Suspense } from 'react';

const MainContent = async () => {
  return (
    <div className="container flex-grow py-8 relative">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-64 flex-shrink-0">
          <Card className="p-4">
            <div className="space-y-4">
              <div className="font-medium">Filters</div>
              <Separator />
            </div>
          </Card>
        </div>

        <div className="flex-1 ">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <Button variant="accent" size="sm">
                  All
                </Button>
                {/* TODO add other filters */}
              </div>
            </div>
          </div>

          <Suspense fallback={<ItemsContainerLoading />}>
            <ItemsContainer />
          </Suspense>

          <div className="pt-10 flex justify-center">
            <Button variant="accent" className="min-w-[300px] p-8">
              View More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
