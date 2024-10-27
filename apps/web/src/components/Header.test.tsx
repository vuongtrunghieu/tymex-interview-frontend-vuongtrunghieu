import { fireEvent, render, waitFor } from '@testing-library/react';
import { expect, test } from 'vitest';
import Header from './Header';

describe('Header', () => {
  it('should render header with navigation links', () => {
    const { getByTestId } = render(<Header />);
    const header = getByTestId('page-header');
    expect(header).toBeVisible();

    const navLinks = header.querySelectorAll('a');
    expect(navLinks.length).toBe(6);
  });

  it('should render language selector', () => {
    const { getByTestId } = render(<Header />);
    const languageSelector = getByTestId('language-selector');
    expect(languageSelector).toBeVisible();
  });

  it('should render connect wallet button', () => {
    const { getByTestId } = render(<Header />);
    const connectWalletButton = getByTestId('connect-wallet-button');
    expect(connectWalletButton).toBeVisible();
    expect(connectWalletButton).toHaveTextContent('Connect Wallet');
  });
});
