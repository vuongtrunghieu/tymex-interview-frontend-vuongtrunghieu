'use client';

import type { SearchParamsType } from '@/app/marketplace/search-params';
import { useEffect, useRef, useState } from 'react';

/* This component is used to scroll to the top of items container when search params change, except for limit.
 * Because users would want to see the end of the list when they click View More button.
 *  */
export const ItemsContainerScrollToTop = ({
  params,
}: { params: SearchParamsType }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [previousParams, setPreviousParams] = useState(params);

  const scrollToTop = () => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  };

  useEffect(() => {
    if (
      previousParams &&
      params.limit === previousParams.limit &&
      JSON.stringify(previousParams) !== JSON.stringify(params)
    ) {
      scrollToTop();
      setPreviousParams(params);
    }
  }, [params, previousParams]);

  return <div ref={ref} />;
};
