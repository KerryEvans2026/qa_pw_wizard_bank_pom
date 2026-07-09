import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';
import { TransactionsPage } from '../../../src/pages/customer/TransactionsPage';

let firstName;
let lastName;

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  const openAccountPage = new OpenAccountPage(page);

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostCode(postCode);
  await addCustomerPage.clickAddCustomerButton();

  await openAccountPage.open();
  await openAccountPage.selectCustomer(`${firstName} ${lastName}`);
  await openAccountPage.selectCurrency('Dollar');
  await openAccountPage.clickProcessButton();
});

test('Assert customer can successfully withdraw money', async ({ page }) => {
  const customerLoginPage = new CustomerLoginPage(page);
  const customerAccountPage = new CustomerAccountPage(page);
  const transactionsPage = new TransactionsPage(page);

  const depositAmount = 500;
  const withdrawAmount = 200;

  await customerLoginPage.open();
  await customerLoginPage.selectCustomer(`${firstName} ${lastName}`);
  await customerLoginPage.clickLoginButton();

  await customerAccountPage.clickDepositButton();
  await customerAccountPage.fillAmountInputField(String(depositAmount));
  await customerAccountPage.clickDepositFormButton();
  await customerAccountPage.assertDepositSuccessfulMessageIsVisible();

  await customerAccountPage.clickWithdrawlButton();
  await customerAccountPage.fillAmountInputField(String(withdrawAmount));
  await customerAccountPage.clickWithdrawlFormButton();

  await customerAccountPage.clickTransactionsButton();
  await transactionsPage.assertHeaderIsVisible();
  await transactionsPage.reload();
  await transactionsPage.reload();
  await transactionsPage.reload();
  await transactionsPage.assertTransactionExists(String(depositAmount), 'Credit');
});