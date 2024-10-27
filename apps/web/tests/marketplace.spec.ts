import { expect, test } from '@playwright/test';

test('should navigate to the marketplace page', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('http://localhost:3000/');
  await expect(page).toHaveURL('http://localhost:3000/marketplace');
  // The new page should contain an h1 with "About"
  await expect(page.locator('h1')).toContainText('New Arrivals');
});
