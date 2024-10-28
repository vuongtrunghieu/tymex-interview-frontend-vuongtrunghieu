import RootLayout from '@/app/layout';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'inter-font',
    subsets: ['latin'],
  }),
}));

vi.mock('@fpoon-tymex/ui/cn', () => ({
  cn: (...inputs: string[]) => inputs.join(' '),
}));

vi.mock('@fpoon-tymex/ui/toaster', () => ({
  Toaster: () => <div data-testid="mock-toaster">Toaster</div>,
}));

vi.mock('next-themes', async () => {
  const actual = await vi.importActual('next-themes');
  return {
    ...actual,
    ThemeProvider: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
  };
});

vi.mock('nuqs/adapters/next/app', () => ({
  NuqsAdapter: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-nuqs-adapter">{children}</div>
  ),
}));

describe('RootLayout', () => {
  const mockChildren = <div data-testid="mock-children">Test Children</div>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render children correctly', () => {
    render(<RootLayout>{mockChildren}</RootLayout>);
    expect(screen.getByTestId('mock-children')).toBeInTheDocument();
  });

  it('should render Toaster component', () => {
    render(<RootLayout>{mockChildren}</RootLayout>);
    expect(screen.getByTestId('mock-toaster')).toBeInTheDocument();
  });

  it('should wrap content in ThemeProvider with correct props', () => {
    const { container } = render(<RootLayout>{mockChildren}</RootLayout>);

    const themeProvider = container.firstChild;
    expect(themeProvider).toBeInTheDocument();
  });

  it('should wrap content in NuqsAdapter', () => {
    render(<RootLayout>{mockChildren}</RootLayout>);
    expect(screen.getByTestId('mock-nuqs-adapter')).toBeInTheDocument();
  });
});
