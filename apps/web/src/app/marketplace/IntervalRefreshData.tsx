'use client';

import { useToast } from '@fpoon-tymex/ui/hooks';
import { useQueryState } from 'nuqs';
import { useEffect } from 'react';

export const IntervalRefreshData = ({
  interval = 60000,
}: { interval?: number }) => {
  const { toast } = useToast();

  const [refresh, setRefresh] = useQueryState('r', {
    shallow: false,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      toast({
        title: 'Refreshing data',
        description:
          'The systems team has initiated a data refresh process in the background.',
      });
      setRefresh(`${Date.now()}`);
    }, interval);

    return () => clearInterval(intervalId);
  }, [refresh, setRefresh]);

  return null;
};
