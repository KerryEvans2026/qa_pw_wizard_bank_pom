import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postCodeInput = page.getByPlaceholder('Post Code');
    this.addCustomerSubmitButton = page
      .getByRole('button', { name: 'Add Customer' })
      .and(page.locator("[type='submit']"));
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/addCust');
  }

  async fillFirstName(firstName) {
    await this.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName) {
    await this.lastNameInput.fill(lastName);
  }

  async fillPostCode(postCode) {
    await this.postCodeInput.fill(postCode);
  }

  // Сайт показує нативний браузерний alert() після сабміту —
  // без обробки dialog тест зависне.
  async clickAddCustomerButton() {
    this.page.once('dialog', (dialog) => dialog.accept());
    await this.addCustomerSubmitButton.click();
  }
}