import '@testing-library/jest-dom';
import Marketplace from '@/app/marketplace/page';
import { searchParamsCache } from '@/app/marketplace/search-params';
import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';

vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    className,
  }: { src: string; alt: string; className: string }) => (
    <img src={src} alt={alt} className={className} />
  ),
}));

vi.mock('@/components/Header', () => ({
  default: () => <div data-testid="mock-header">Header</div>,
}));

vi.mock('@/components/Footer', () => ({
  default: () => <div data-testid="mock-footer">Footer</div>,
}));

vi.mock('@/app/marketplace/HeroBanner', () => ({
  default: () => <div data-testid="mock-hero-banner">Hero Banner</div>,
}));

vi.mock('@/app/marketplace/MainContent', () => ({
  default: () => <div data-testid="mock-main-content">Main Content</div>,
}));

vi.mock('@/app/marketplace/search-params', () => ({
  searchParamsCache: {
    parse: vi.fn(),
  },
}));

describe('Marketplace', () => {
  const mockSearchParams = {};

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all main components', async () => {
    render(<Marketplace searchParams={mockSearchParams} />);

    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-hero-banner')).toBeInTheDocument();
    expect(screen.getByTestId('mock-main-content')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });

  it('should call searchParamsCache.parse with the provided search params', async () => {
    const customSearchParams = { query: 'test' };
    render(<Marketplace searchParams={customSearchParams} />);

    expect(searchParamsCache.parse).toHaveBeenCalledWith(customSearchParams);
    expect(searchParamsCache.parse).toHaveBeenCalledTimes(1);
  });

  it('should render the background image with correct properties', async () => {
    render(<Marketplace searchParams={mockSearchParams} />);

    const backgroundImage = screen.getByAltText('main-background');
    expect(backgroundImage).toBeInTheDocument();
    expect(backgroundImage).toHaveClass('object-cover absolute');
  });

  it('should have the correct layout classes', async () => {
    const { container } = render(
      <Marketplace searchParams={mockSearchParams} />,
    );

    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toHaveClass(
      'min-h-screen flex flex-col bg-gray-900 text-white',
    );

    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('relative pt-12 pb-20');
  });
});
