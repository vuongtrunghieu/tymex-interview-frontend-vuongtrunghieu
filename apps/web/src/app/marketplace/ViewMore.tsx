'use client';

import { Button } from '@fpoon-tymex/ui/button';
import { Icons } from '@fpoon-tymex/ui/icons';
import { useQueryState } from 'nuqs';
import { useState } from 'react';

export const ViewMore = ({ currentLength }: { currentLength: number }) => {
  const [limit, setLimit] = useQueryState('limit', {
    shallow: false,
  });
  // Since we don't have pagination in API for total count, and direct control over data API,
  // we'll need to rely on client side data.
  // We can probably check the last data.length and the requesting data length to determine if there is more data.
  // Other solution might be to add an API layer in our Next.js to calculate dataset size and return that to UI.
  const [showButton, setShowButton] = useState(true);
  const [isFetching, setFetching] = useState(false);

  const handleClickViewMore = () => {
    // No more data to fetch, hide this button
    if (limit && currentLength < +limit) {
      setShowButton(false);
      return;
    }
    setFetching(true);
    setLimit((val) => `${Number(val) + 20}`);
  };

  return (
    showButton && (
      <Button
        variant="accent"
        className="min-w-[16rem] p-6"
        onClick={handleClickViewMore}
        disabled={isFetching}
      >
        {isFetching && (
          <Icons.LoaderCircle
            className="outline-0 h-4 w-4 animate-spin"
            tabIndex={0}
          />
        )}
        View More
      </Button>
    )
  );
};
