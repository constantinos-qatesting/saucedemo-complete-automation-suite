import { Page, Locator } from '@playwright/test';

/**
 * Checkout Overview Page
 *
 * Contains locators and actions
 * for the final checkout review page.
 */
export class CheckoutOverviewPage {
  readonly page: Page;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.page = page;

    // Button used to complete the order
    this.finishButton = page.locator('[data-test="finish"]');

    // Success message after completing the order
    this.completeHeader = page.locator('[data-test="complete-header"]');
  }

  async finishOrder() {
    await this.finishButton.click();
  }
}