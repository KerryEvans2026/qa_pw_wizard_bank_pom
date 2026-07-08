import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.customerSelect = page.locator('#userSelect');
    this.currencySelect = page.locator('#currency');
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/openAccount');
  }

  async selectCustomer(fullName) {
    await this.customerSelect.selectOption({ label: fullName });
  }

  async selectCurrency(currency) {
    await this.currencySelect.selectOption({ label: currency });
  }

  async assertSelectedCurrencyIs(currency) {
    await expect(this.currencySelect).toHaveValue(
      await this.currencySelect.locator(`option:has-text("${currency}")`).getAttribute('value'),
    );
  }

  async clickProcessButton() {
    this.page.once('dialog', (dialog) => dialog.accept());
    await this.processButton.click();
  }
}