import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator("input[ng-model='searchCustomer']");
    this.tableRows = page.locator('table.table tbody tr');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async fillSearchField(text) {
    await this.searchInput.fill(text);
  }

  getRowByCustomer(firstName, lastName) {
    return this.tableRows.filter({ hasText: firstName }).filter({ hasText: lastName });
  }

  async clickDeleteButtonForCustomer(firstName, lastName) {
    const row = this.getRowByCustomer(firstName, lastName);
    await row.getByRole('button', { name: 'Delete' }).click();
  }

  async assertCustomerRowIsVisible(firstName, lastName) {
    await expect(this.getRowByCustomer(firstName, lastName)).toBeVisible();
  }

  async assertCustomerRowIsNotVisible(firstName, lastName) {
    await expect(this.getRowByCustomer(firstName, lastName)).toHaveCount(0);
  }

  async assertOnlyOneRowIsVisible() {
    await expect(this.tableRows).toHaveCount(1);
  }

  async assertAllVisibleRowsContainText(text) {
    const count = await this.tableRows.count();
    for (let i = 0; i < count; i++) {
      await expect(this.tableRows.nth(i)).toContainText(text);
    }
  }

  async assertLastRowContains(text) {
    await expect(this.tableRows.last()).toContainText(text);
  }

  async assertLastRowAccountNumberIsNotEmpty() {
    const lastRowCells = this.tableRows.last().locator('td');
    const accountCell = lastRowCells.last();
    await expect(accountCell).not.toHaveText('');
  }
}