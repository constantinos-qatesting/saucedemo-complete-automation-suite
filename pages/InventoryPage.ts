import { Page, Locator } from '@playwright/test';

/**
 * Products Page
 *
 * Contains all locators and actions
 * related to the SauceDemo products page.
 */

export class InventoryPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly inventoryItems: Locator;
    readonly backpackAddToCartButton: Locator;
    readonly backpackRemoveButton: Locator;
    readonly cartBadge: Locator;
    readonly shoppingCartLink: Locator;
    readonly bikeLightAddToCartButton: Locator;
    readonly bikeLightRemoveButton: Locator;


    constructor(page: Page) {
        this.page = page;

        // Products page title
        this.pageTitle = page.locator('[data-test="title"]');

        // All product cards
        this.inventoryItems = page.locator('.inventory_item');

        // "Add to cart" button for the Backpack product

        this.backpackAddToCartButton = page.locator(
            '[data-test="add-to-cart-sauce-labs-backpack"]'
        );

        // "Remove" button shown after the Backpack is added to the cart

        this.backpackRemoveButton = page.locator(
            '[data-test="remove-sauce-labs-backpack"]'
        );

        // Cart badge displaying the number of items in the cart

        this.cartBadge = page.locator(
            '[data-test="shopping-cart-badge"]'
        );
        // Shopping cart icon/link
        this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
        
        // "Add to cart" button for the Bike Light product
        this.bikeLightAddToCartButton = page.locator(
            '[data-test="add-to-cart-sauce-labs-bike-light"]'
        );

        // "Remove" button shown after the Bike Light is added to the cart
        this.bikeLightRemoveButton = page.locator(
            '[data-test="remove-sauce-labs-bike-light"]'
        );
    }
    async addBackpackToCart() {
        await this.backpackAddToCartButton.click();
    }
    async removeBackpackFromCart() {
        await this.backpackRemoveButton.click();
    }
    async openCart() {
        await this.shoppingCartLink.click();
    }
    async addBikeLightToCart() {
        await this.bikeLightAddToCartButton.click();
    }
}