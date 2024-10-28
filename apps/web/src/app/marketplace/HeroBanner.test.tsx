import HeroBanner from '@/app/marketplace/HeroBanner';
import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';

describe('HeroBanner', () => {
  it('should render the component successfully', () => {
    render(<HeroBanner />);

    expect(screen.getByText('New Arrivals')).toBeInTheDocument();
  });
});
