'use client';

import { Button } from '@fpoon-tymex/ui/button';
import { useQueryState } from 'nuqs';
import { useState } from 'react';

export const ViewMore = ({ currentLength }: { currentLength: number }) => {
  const [limit, setLimit] = useQueryState('limit', {
    shallow: false,
  });
  const [showButton, setShowButton] = useState(true);

  const handleClickViewMore = () => {
    // No more data to fetch, hide this button
    if (limit && currentLength < +limit) {
      setShowButton(false);
      return;
    }
    // TODO handle loading data
    // TODO handle when to disable this button, i.e. when there is no more data
    // Since we don't have pagination in API for total count, we have to rely on client side data
    // We can probably check the last data.length and the newer data length
    // Other solution might be add an API layer in our Next.js to calculate dataset size and return that to UI
    setLimit((val) => `${Number(val) + 20}`);
  };

  return (
    showButton && (
      <Button
        variant="accent"
        className="min-w-[300px] p-8"
        onClick={handleClickViewMore}
      >
        View More
      </Button>
    )
  );
};
