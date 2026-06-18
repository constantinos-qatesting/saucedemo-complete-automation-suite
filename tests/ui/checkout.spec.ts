import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { CheckoutOverviewPage } from '../../pages/CheckoutOverviewPage';
import users from '../../test-data/users.json';

test.describe('Checkout Tests', () => {

    test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login(
    users.standardUser.username,
    users.standardUser.password
  );
});

test('should continue to checkout overview after entering customer information', async ({ page }) => {
  // Test Type: End-to-End Test
  //
  // Scenario:
  // - User logs in successfully
  // - User adds Backpack to the cart
  // - User opens the cart
  // - User proceeds to checkout
  // - User enters checkout information
  //
  // Expected Result:
  // - User is redirected to Checkout Overview page

 
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await inventoryPage.addBackpackToCart();
  await inventoryPage.openCart();

  await cartPage.proceedToCheckout();

  await checkoutPage.fillCheckoutInformation(
    'Constantinos',
    'Kyr',
    '1000'
  );

  await checkoutPage.continueCheckout();

  await expect(page).toHaveURL(/checkout-step-two.html/);
});
test('should show error when checkout information is missing', async ({ page }) => {

  // Test Type: Negative Test
  //
  // Scenario:
  // - User logs in successfully
  // - User adds Backpack to the cart
  // - User proceeds to checkout
  // - User clicks Continue without entering customer information
  //
  // Expected Result:
  // - Checkout is not allowed
  // - Error message is displayed

  
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await inventoryPage.addBackpackToCart();
  await inventoryPage.openCart();

  await cartPage.proceedToCheckout();

  await checkoutPage.submitEmptyCheckoutForm();

  await expect(checkoutPage.errorMessage)
    .toContainText('First Name is required');
});
test('should show error when last name is missing during checkout', async ({ page }) => {

  // Test Type: Negative Test
  //
  // Scenario:
  // - User reaches checkout information page
  // - User enters First Name
  // - User leaves Last Name empty
  // - User enters Postal Code
  //
  // Expected Result:
  // - Checkout is not allowed
  // - Last Name required error is displayed

  
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await inventoryPage.addBackpackToCart();
  await inventoryPage.openCart();

  await cartPage.proceedToCheckout();

  await checkoutPage.firstNameInput.fill('Constantinos');
  await checkoutPage.postalCodeInput.fill('1000');

  await checkoutPage.continueCheckout();

  await expect(checkoutPage.errorMessage)
    .toContainText('Last Name is required');
});
test('should show error when postal code is missing during checkout', async ({ page }) => {

  // Test Type: Negative Test
  //
  // Scenario:
  // - User reaches checkout information page
  // - User enters First Name
  // - User enters Last Name
  // - User leaves Postal Code empty
  //
  // Expected Result:
  // - Checkout is not allowed
  // - Postal Code required error is displayed

  
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await inventoryPage.addBackpackToCart();
  await inventoryPage.openCart();

  await cartPage.proceedToCheckout();

  await checkoutPage.firstNameInput.fill('Constantinos');
  await checkoutPage.lastNameInput.fill('Kyr');

  await checkoutPage.continueCheckout();

  await expect(checkoutPage.errorMessage)
    .toContainText('Postal Code is required');
});
});