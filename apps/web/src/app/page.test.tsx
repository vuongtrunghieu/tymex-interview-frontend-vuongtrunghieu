import Root from '@/app/page';
import { render } from '@testing-library/react';
import { redirect } from 'next/navigation';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

describe('Root Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should redirect to /marketplace', () => {
    render(<Root />);

    expect(redirect).toHaveBeenCalledTimes(1);
    expect(redirect).toHaveBeenCalledWith('/marketplace');
  });

  it('should redirect immediately upon mounting', () => {
    render(<Root />);

    expect(redirect).toHaveBeenCalledTimes(1);
    expect(redirect).toHaveBeenCalledWith('/marketplace');
  });
});
