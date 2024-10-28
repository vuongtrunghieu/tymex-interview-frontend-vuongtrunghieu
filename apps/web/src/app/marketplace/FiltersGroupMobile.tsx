'use client';

import { FilterCategory } from '@/app/marketplace/FilterCategory';
import { FiltersGroup } from '@/app/marketplace/FiltersGroup';
import { Button } from '@fpoon-tymex/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@fpoon-tymex/ui/drawer';
import { Icons } from '@fpoon-tymex/ui/icons';
import React from 'react';

export const FiltersGroupMobile = () => {
  return (
    <Drawer>
      <DrawerTrigger>
        <Button variant="outline">
          <Icons.ListFilter className="h-4 w-4 outline-0" tabIndex={0} />
          Sorts & Filters
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="container py-8 space-y-4">
          <FiltersGroup />
          <div className="space-y-4">
            <h4 className="text-sm uppercase font-bold text-muted-foreground">
              Category
            </h4>
            <FilterCategory />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};