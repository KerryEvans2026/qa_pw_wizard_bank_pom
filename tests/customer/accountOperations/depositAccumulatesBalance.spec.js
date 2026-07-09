import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';

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

test('Assert balance accumulates correctly after multiple deposits', async ({ page }) => {
  const customerLoginPage = new CustomerLoginPage(page);
  const customerAccountPage = new CustomerAccountPage(page);

  const firstDeposit = faker.number.int({ min: 1, max: 100 });
  const secondDeposit = faker.number.int({ min: 1, max: 100 });

  await customerLoginPage.open();
  await customerLoginPage.selectCustomer(`${firstName} ${lastName}`);
  await customerLoginPage.clickLoginButton();

  await customerAccountPage.clickDepositButton();
  await customerAccountPage.fillAmountInputField(String(firstDeposit));
  await customerAccountPage.clickDepositFormButton();
  await customerAccountPage.assertDepositSuccessfulMessageIsVisible();
  await customerAccountPage.assertAccountLineContainsText(String(firstDeposit));

  await customerAccountPage.clickDepositButton();
  await customerAccountPage.fillAmountInputField(String(secondDeposit));
  await customerAccountPage.clickDepositFormButton();
  await customerAccountPage.assertDepositSuccessfulMessageIsVisible();
  await customerAccountPage.assertAccountLineContainsText(String(firstDeposit + secondDeposit));
});