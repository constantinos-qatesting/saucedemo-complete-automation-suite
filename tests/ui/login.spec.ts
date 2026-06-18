import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import users from '../../test-data/users.json';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { CheckoutOverviewPage } from '../../pages/CheckoutOverviewPage';

test.describe('Login Tests', () => {

test.describe('Login Tests', () => {

test('should show error for locked user', async ({ page }) => {

  // Test Type: Negative Test
  //
  // Scenario:
  // - User enters valid credentials
  // - User account is locked
  //
  // Expected Result:
  // - Login is denied
  // - Appropriate error message is displayed

  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(
    users.lockedUser.username,
    users.lockedUser.password
  );

await expect(loginPage.errorMessage)
  .toContainText('locked out');
  });
  test('should login successfully with standard user', async ({ page }) => {

  // Test Type: Positive Test
  //
  // Scenario:
  // - User enters valid credentials
  // - User clicks Login
  //
  // Expected Result:
  // - User is redirected to Products page

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();

  await loginPage.login(
    users.standardUser.username,
    users.standardUser.password
  );

  await expect(page).toHaveURL(/inventory.html/);

  await expect(inventoryPage.pageTitle)
    .toHaveText('Products');
});


});

});

