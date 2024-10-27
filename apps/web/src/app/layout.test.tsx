import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import RootLayout from './layout';

// Mock Inter font
vitest.mock('next/font/google', () => {
  return {
    __esModule: true,
    Inter: () => vitest.fn(),
  };
});

describe('RootLayout', () => {
  it('Should render RootLayout', () => {
    render(
      <RootLayout>
        <div data-testid="root-layout-children">Children content</div>
      </RootLayout>,
    );

    expect(screen.getByRole('document')).toHaveAttribute('lang', 'en');
    expect(screen.getByTestId('root-layout-children')).toBeVisible();
  });
});
