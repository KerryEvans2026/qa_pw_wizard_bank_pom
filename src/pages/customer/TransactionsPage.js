import { expect } from '@playwright/test';

export class TransactionsPage {
  constructor(page) {
    this.page = page;
    this.tableHeader = page.getByRole('row').first();
    this.headerFirstCell = this.tableHeader.getByRole('cell').nth(0);
    this.headerSecondCell = this.tableHeader.getByRole('cell').nth(1);
    this.headerThirdCell = this.tableHeader.getByRole('cell').nth(2);
    this.firstRow = page.getByRole('row').nth(1);
    this.firstRowAmountCell = this.firstRow.getByRole('cell').nth(1);
    this.firstRowTypeCell = this.firstRow.getByRole('cell').nth(2);
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/listTx');
  }
  async reload() {
    await this.page.reload();
  }

  async assertFirstRowAmountContainsText(amount) {
    await expect(this.firstRowAmountCell).toContainText(amount);
  }

  async assertFirstRowTypeContainsText(type) {
    await expect(this.firstRowTypeCell).toContainText(type);
  }

  async assertFirstRowIsHidden() {
    await expect(this.firstRow).toBeHidden();
  }

  async assertHeaderIsVisible() {
    await expect(this.tableHeader).toBeVisible();
  }

  async assertHeaderFirstCellContainsText(text) {
    await expect(this.headerFirstCell).toContainText(text);
  }

  async assertHeaderSecondCellContainsText(text) {
    await expect(this.headerSecondCell).toContainText(text);
  }

  async assertHeaderThirdCellContainsText(text) {
    await expect(this.headerThirdCell).toContainText(text);
  }

  async clickDateHeader() {
  await this.headerFirstCell.click();
}
}
