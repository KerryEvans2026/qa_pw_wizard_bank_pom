import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';
import { TransactionsPage } from '../../../src/pages/customer/TransactionsPage';

test('Assert the deposit can be opened', async ({ page }) => {


  const customerLoginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);
  const transactionsPage = new TransactionsPage(page);

  await customerLoginPage.open();
  await customerLoginPage.selectCustomer('Harry Potter');
  await customerLoginPage.clickLoginButton();
  await accountPage.clickDepositButton();

  const amount = faker.number.int(100).toString();

  await accountPage.fillAmountInputField(amount);
  await accountPage.clickDepositFormButton();
  await accountPage.assertDepositSuccessfulMessageIsVisible();
  await accountPage.clickTransactionsButton();
  await transactionsPage.assertHeaderIsVisible();
  await transactionsPage.reload();
  await transactionsPage.assertFirstRowAmountContainsText(amount);
  await transactionsPage.assertFirstRowTypeContainsText('Credit');
});
