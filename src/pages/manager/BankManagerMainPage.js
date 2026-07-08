import { expect } from '@playwright/test';

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
    this.addCustomerButton = page.getByRole('button', { name: 'Add Customer' });
    this.openAccountButton = page.getByRole('button', { name: 'Open Account' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager');
  }

  async clickAddCustomerButton() {
    await this.addCustomerButton.click();
  }

  async clickOpenAccountButton() {
    await this.openAccountButton.click();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }

  async assertAddCustomerButtonIsVisible() {
    await expect(this.addCustomerButton).toBeVisible();
  }

  async assertOpenAccountButtonIsVisible() {
    await expect(this.openAccountButton).toBeVisible();
  }

  async assertCustomersButtonIsVisible() {
    await expect(this.customersButton).toBeVisible();
  }
}