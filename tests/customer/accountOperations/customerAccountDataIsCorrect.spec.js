import { test } from '@playwright/test';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';

test('Assert customer has correct bank data', async ({ page }) => {


  const loginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);

  await loginPage.open();
  await loginPage.selectCustomer('Hermoine Granger');
  await loginPage.clickLoginButton();
  await accountPage.assertAccountIdInDropDownHasValue('number:1001');
  await accountPage.assertAccountLineContainsText('Account Number : 1001');
  await accountPage.assertAccountLineContainsText('Balance : 5096');
  await accountPage.assertAccountLineContainsText('Currency : Dollar');
});
