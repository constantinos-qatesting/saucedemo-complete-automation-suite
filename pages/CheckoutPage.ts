import { Page, Locator } from '@playwright/test';

/**
 * Checkout Page
 *
 * Contains all locators and actions
 * related to the checkout information page.
 */
export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Customer information fields
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');

    // Continue button
    this.continueButton = page.locator('[data-test="continue"]');
    
    // Error message shown when checkout information is missing
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async fillCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueCheckout() {
    await this.continueButton.click();
  }
  async submitEmptyCheckoutForm() {
    await this.continueButton.click();
  }
}