import { test } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';

test('Assert manager can Login', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const bankManagerMainPage = new BankManagerMainPage(page);

  await bankHomePage.open();
  await bankHomePage.clickBankManagerLoginButton();

  await bankManagerMainPage.assertAddCustomerButtonIsVisible();
  await bankManagerMainPage.assertOpenAccountButtonIsVisible();
  await bankManagerMainPage.assertCustomersButtonIsVisible();
});