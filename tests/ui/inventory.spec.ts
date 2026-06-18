import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import users from '../../test-data/users.json';


test.describe('Inventory Tests', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
            users.standardUser.username,
            users.standardUser.password
        );
    });

    test('should display 6 products after login', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);

        // Test Type: Functional Test
        //
        // Scenario:
        // - User logs in successfully
        // - User navigates to the Products page
        //
        // Expected Result:
        // - Exactly 6 products are displayed

        // Count all products displayed on the page
        const productCount = await inventoryPage.inventoryItems.count();

        // Verify that exactly 6 products are shown
        expect(productCount).toBe(6);

        // another examples
        // "expect(productCount).toBeGreaterThan(0);"
        // or 
        // "expect(productCount).toBeGreaterThanOrEqual(6);

    });

    test('should add backpack to cart', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);

        // Test Type: Functional Test
        //
        // Scenario:
        // - User logs in successfully
        // - User adds the Backpack product to the cart
        //
        // Expected Result:
        // - Cart badge displays 1
        // - Backpack button changes to Remove

        await inventoryPage.addBackpackToCart();

        // Verify that the cart contains 1 item

        await expect(inventoryPage.cartBadge).toHaveText('1');

        // ** could be 
        // const badgeCount = await inventoryPage.cartBadge.textContent();
        // expect(Number(badgeCount)).toBeGreaterThan(0);
        // or
        // expect(Number(badgeCount)).toBe(expectedCount);
        // where expectedCount is calculated by the test.

        // Verify that the product was added successfully
        await expect(inventoryPage.backpackRemoveButton)
            .toHaveText('Remove');
    });

    test('should remove backpack from cart', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);

        // Test Type: Functional Test
        //
        // Scenario:
        // - User logs in successfully
        // - User adds one Backpack product to the cart
        // - User removes the Backpack product from the cart
        //
        // Expected Result:
        // - Cart badge is no longer visible
        // - Backpack button changes back to Add to cart

        await inventoryPage.addBackpackToCart();
        await inventoryPage.removeBackpackFromCart();

        await expect(inventoryPage.cartBadge).not.toBeVisible();
        await expect(inventoryPage.backpackAddToCartButton).toHaveText('Add to cart');
    });
});