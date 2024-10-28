import { ItemCard, ItemCardLoading } from '@/app/marketplace/ItemCard';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

const mockItem = {
  title: 'Test Item',
  category: 'Rare',
  imageId: 1,
  price: 10.5,
  author: {
    firstName: 'Hieu',
    lastName: 'V',
    avatar: 'https://example.com/avatar.jpg',
    onlineStatus: 'online',
    email: 'hieu@example.com',
  },
  isFavorite: true,
};

describe('ItemCard', () => {
  it('should render the item information correctly', () => {
    render(<ItemCard item={mockItem} />);
    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('Rare')).toBeInTheDocument();
    expect(screen.getByText('10.50 ETH')).toBeInTheDocument();
    expect(screen.getByText('Hieu V')).toBeInTheDocument();
  });
});
