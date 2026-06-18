import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import users from '../../test-data/users.json';

test.describe('Cart Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
      users.standardUser.username,
      users.standardUser.password
    );
  });

  test('should display backpack in cart', async ({ page }) => {
    // Test Type: End-to-End Test
    //
    // Scenario:
    // - User logs in successfully
    // - User adds Backpack to the cart
    // - User opens the cart
    //
    // Expected Result:
    // - Backpack is displayed in the cart

    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addBackpackToCart();

    await inventoryPage.openCart();

    await expect(cartPage.cartItemNames)
      .toContainText(['Sauce Labs Backpack']);
  });

  test('should add multiple products to cart', async ({ page }) => {
    // Test Type: Functional Test
    //
    // Scenario:
    // - User logs in successfully
    // - User adds Backpack to the cart
    // - User adds Bike Light to the cart
    //
    // Expected Result:
    // - Cart badge displays 2
    // - Both products are added successfully

    const inventoryPage = new InventoryPage(page);

    await inventoryPage.addBackpackToCart();
    await inventoryPage.addBikeLightToCart();

    // Verify that two items exist in the cart
    await expect(inventoryPage.cartBadge).toHaveText('2');

    // Verify Backpack was added
    await expect(inventoryPage.backpackRemoveButton).toBeVisible();

    // Verify Bike Light was added
    await expect(inventoryPage.bikeLightRemoveButton).toBeVisible();
  });

  test('should display multiple products in cart', async ({ page }) => {
    // Test Type: End-to-End Test
    //
    // Scenario:
    // - User logs in successfully
    // - User adds Backpack and Bike Light to the cart
    // - User opens the cart
    //
    // Expected Result:
    // - Both products are displayed in the cart

    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addBackpackToCart();
    await inventoryPage.addBikeLightToCart();

    await inventoryPage.openCart();

    await expect(cartPage.cartItemNames).toContainText([
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
    ]);
  });
});