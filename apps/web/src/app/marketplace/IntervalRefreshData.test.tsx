import { IntervalRefreshData } from '@/app/marketplace/IntervalRefreshData';
import { useToast } from '@fpoon-tymex/ui/hooks';
import { render, screen, waitFor } from '@testing-library/react';
import { useQueryState } from 'nuqs';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@fpoon-tymex/ui/hooks', () => ({
  useToast: vi.fn().mockReturnValue({ toast: vi.fn() }),
}));
vi.mock('nuqs', () => ({
  useQueryState: vi.fn().mockReturnValue([null, vi.fn()]),
}));

describe('IntervalRefreshData', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should display a toast message and update the query state every interval', async () => {
    const mockInterval = 1000;
    const mockSetRefresh = vi.fn();
    const mockToast = vi.fn();
    vi.mocked(useQueryState).mockReturnValue([null, mockSetRefresh]);
    // @ts-ignore
    vi.mocked(useToast).mockReturnValue({ toast: mockToast });

    render(<IntervalRefreshData interval={mockInterval} />);

    await waitFor(
      () => {
        expect(mockToast).toHaveBeenCalledWith({
          title: 'Refreshing data',
          description:
            'The systems team has initiated a data refresh process in the background.',
        });
        expect(mockSetRefresh).toHaveBeenCalled();
      },
      { timeout: 2000 },
    );
  });

  it('should clear the interval on unmount', () => {
    const mockClearInterval = vi.spyOn(global, 'clearInterval');
    const mockInterval = 1000;
    vi.mocked(useQueryState).mockReturnValue([null, vi.fn()]);
    // @ts-ignore
    vi.mocked(useToast).mockReturnValue({ toast: vi.fn() });

    const { unmount } = render(<IntervalRefreshData interval={mockInterval} />);

    unmount();

    expect(mockClearInterval).toHaveBeenCalled();
  });
});
