import { expect, test } from '@playwright/test';

test('should navigate to the marketplace page', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('/');
  await expect(page).toHaveURL('/marketplace');
  // The new page should contain an h1 with "About"
  await expect(page.locator('h1')).toContainText('New Arrivals');
});

test('should show and hide Header on scroll', async ({ page }) => {
  // Navigate to the page
  await page.goto('/');
  await expect(page).toHaveURL('/marketplace');
  const header = page.locator('[data-testid="page-header"].translate-y-0');

  // Check that the header is visible initially
  await expect(header).toBeVisible();

  // Simulate scrolling down the page
  await page.mouse.wheel(0, 100);
  // Wait for the animation to complete
  await page.waitForTimeout(500);

  // Check that the header is now hidden
  const newHeader = page.locator(
    '[data-testid="page-header"].-translate-y-full',
  );
  await expect(newHeader).toBeVisible();
  await expect(header).not.toBeVisible();

  await page.mouse.wheel(0, -100);
  // Wait for the animation to complete
  await page.waitForTimeout(500);

  // Check that the header is now visible again
  await expect(header).toBeVisible();
  await expect(newHeader).not.toBeVisible();
});

test('should filter items by text and tier', async ({ page }) => {
  await page.goto('/');

  // Search items by text
  await page.getByTestId('search-filter').click();
  await page.getByTestId('search-filter').fill('The DJ');
  await page.getByTestId('search-filter').press('Enter');
  // Search items by tier
  await page.getByTestId('tier-filter').click();
  await page.getByLabel('Premium').click();
  // Wait for the data loading to complete
  await page.waitForTimeout(2000);

  // Check that our fixture item is visible
  await expect(page.getByTestId('item-card').first()).toBeVisible();
  await expect(
    page.getByTestId('item-card').first().getByRole('heading'),
  ).toContainText('The DJ');
});

test('should unfilter items when clearing filters', async ({ page }) => {
  await page.goto('/');

  // Check if our fixture item is visible
  await expect(
    page.getByTestId('item-card').first().getByRole('heading'),
  ).toContainText('Metal Gear Girl');

  // Search items by tier
  await page.getByTestId('theme-filter').click();
  await page.getByLabel('Light').click();
  // Wait for the data loading to complete
  await page.waitForTimeout(2000);

  // Check if our fixture item is visible
  await expect(
    page.getByTestId('item-card').first().getByRole('heading'),
  ).toContainText('Neon Samurai');

  // Sort
  await page.getByTestId('price-sort').click();
  await page.getByLabel('Low to High').click();

  await expect(
    page.getByTestId('item-card').first().getByRole('heading'),
  ).toContainText('The Neon Enforcer');

  // Reset filters
  await page.getByRole('button', { name: 'Reset filters' }).click();

  await expect(
    page.getByTestId('item-card').first().getByRole('heading'),
  ).toContainText('Metal Gear Girl');
});

test('should filter items by categories', async ({ page }) => {
  await page.goto('/');

  // Check unfiltered data
  await expect(page.getByTestId('items-container-scroll')).toContainText(
    'Mythic',
  );

  // Filter by category
  await page
    .getByTestId('filter-category')
    .getByRole('button', { name: 'Hat' })
    .click();
  // Wait for the data loading to complete
  await page.waitForTimeout(2000);

  await expect(page.getByTestId('items-container-scroll')).not.toContainText(
    'Mythic',
  );
  await expect(page.getByTestId('items-container-scroll')).toContainText('Hat');

  // Filter by another category
  await page
    .getByTestId('filter-category')
    .getByRole('button', { name: 'Mythic' })
    .click();
  // Wait for the data loading to complete
  await page.waitForTimeout(2000);
  await expect(page.getByTestId('items-container-scroll')).toContainText(
    'Mythic',
  );
  await expect(page.getByTestId('items-container-scroll')).toContainText('Hat');

  // Unfilter a category
  await page
    .getByTestId('filter-category')
    .getByRole('button', { name: 'Hat' })
    .click();
  // Wait for the data loading to complete
  await page.waitForTimeout(2000);

  await expect(page.getByTestId('items-container-scroll')).toContainText(
    'Mythic',
  );
  await expect(page.getByTestId('items-container-scroll')).not.toContainText(
    'Hat',
  );

  // Show all
  await page
    .getByTestId('filter-category')
    .getByRole('button', { name: 'All' })
    .click();
  // Wait for the data loading to complete
  await page.waitForTimeout(2000);
  await expect(page.getByTestId('items-container-scroll')).toContainText(
    'Mythic',
  );
  await expect(page.getByTestId('items-container-scroll')).toContainText(
    'Epic',
  );
  await expect(page.getByTestId('items-container-scroll')).toContainText(
    'Mythic',
  );
  await expect(page.getByTestId('items-container-scroll')).toContainText('Hat');
});
