import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import Footer from './Footer';

describe('Footer', () => {
  it('should render footer with navigation links', () => {
    render(<Footer />);
    expect(screen.getByRole('heading', { name: 'NAVIGATION' })).toBeVisible();
    expect(screen.getByText('Home')).toBeVisible();
    expect(screen.getByText('About us')).toBeVisible();
    expect(screen.getByText('Our teams')).toBeVisible();
    expect(screen.getByText('Whitepaper')).toBeVisible();
    expect(screen.getByText('Marketplace')).toBeVisible();
    expect(screen.getByText('Roadmap')).toBeVisible();
    expect(screen.getByText('FAQs')).toBeVisible();
    expect(screen.getByText('News')).toBeVisible();
    expect(screen.getByText('Community')).toBeVisible();
  });

  it('should render contact us section', () => {
    render(<Footer />);
    expect(screen.getByRole('heading', { name: 'CONTACT US' })).toBeVisible();
    expect(screen.getByText('01234567810')).toBeVisible();
    expect(screen.getByText('tymex-talent@tyme.com')).toBeVisible();
  });

  it('should render subscribe section', () => {
    render(<Footer />);
    expect(
      screen.getByRole('heading', {
        name: 'SUBSCRIBE TO RECEIVE OUR LATEST UPDATE',
      }),
    ).toBeVisible();
    expect(screen.getByPlaceholderText('Your email address')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Subscribe' })).toBeVisible();
  });

  it('should render copyright and links', () => {
    render(<Footer />);
    expect(
      screen.getByText('©2023 Tyme - Edit. All Rights reserved.'),
    ).toBeVisible();
    expect(screen.getByText('Security')).toBeVisible();
    expect(screen.getByText('Legal')).toBeVisible();
    expect(screen.getByText('Privacy')).toBeVisible();
  });
});
