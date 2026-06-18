# Playwright QA Automation Portfolio

## Overview

This project demonstrates a QA Automation Framework built with Playwright and TypeScript.

The framework showcases UI and API testing practices, including Page Object Model (POM), positive and negative test scenarios, end-to-end user flows, and API validation.

---

## Technologies Used

* Playwright
* TypeScript
* Node.js
* Page Object Model (POM)

---

## UI Test Coverage

### Login

* Successful login
* Locked user validation

### Inventory

* Product visibility
* Add product to cart
* Remove product from cart

### Cart

* Verify products in cart
* Multiple product validation

### Checkout

* Complete checkout flow
* Required field validation
* Error handling

---

## API Test Coverage

### Positive Tests

* GET User
* POST User
* PUT User
* DELETE User

### Negative Tests

* Non-existing user (404)
* Empty response validation
* Invalid user creation behavior

---

## Framework Features

* Page Object Model (POM)
* Test organization with test.describe()
* Shared setup using beforeEach()
* Test data stored in JSON files
* Positive and negative testing
* End-to-End testing
* API testing

---

## Installation

Install dependencies:

npm install

---

## Run All Tests

npx playwright test

---

## Run UI Tests

npx playwright test tests/ui

---

## Run API Tests

npx playwright test tests/api

---

## Run Specific Browser

npx playwright test --project=chromium

---

## Generate HTML Report

npx playwright show-report

---

## Author

Constantinos Kyrri
QA Engineer
