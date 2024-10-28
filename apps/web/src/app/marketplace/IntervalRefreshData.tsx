'use client';

import { useQueryState } from 'nuqs';
import { useEffect } from 'react';

export const IntervalRefreshData = ({
  interval = 60000,
}: { interval?: number }) => {
  const [refresh, setRefresh] = useQueryState('r', {
    shallow: false,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRefresh(`${Date.now()}`);
    }, interval);

    return () => clearInterval(intervalId);
  }, [refresh, setRefresh]);

  return null;
};
