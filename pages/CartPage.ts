import { Page, Locator } from '@playwright/test';

/**
 * Cart Page
 *
 * Contains all locators and actions
 * related to the shopping cart.
 */
export class CartPage {

  // Current browser page
  readonly page: Page;

  // Product names displayed inside the cart
  readonly cartItemNames: Locator;

  // Checkout button
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // All product names displayed inside the cart
    this.cartItemNames = page.locator('.inventory_item_name');

    // Checkout button
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}