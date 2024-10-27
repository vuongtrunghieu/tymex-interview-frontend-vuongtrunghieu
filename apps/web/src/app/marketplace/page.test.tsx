import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import Page from './page';

describe('Page', () => {
  it('should render Page', () => {
    render(<Page searchParams={{}} />);
    expect(screen.getByTestId('page-header')).toBeDefined();
    expect(screen.getByTestId('hero-banner')).toBeDefined();
    expect(
      screen.getByRole('heading', { level: 1, name: 'New Arrivals' }),
    ).toBeDefined();
    expect(screen.getByTestId('page-footer')).toBeDefined();
  });
});
