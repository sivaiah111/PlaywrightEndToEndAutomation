import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { ProductPage } from '../pages/productPage';
import { CartPage } from '../pages/cartPage';

type PageFixture = {
 loginPage: LoginPage;
 productPage: ProductPage;
 cartPage: CartPage;
 checkoutPage: CheckoutPage;
};

export const test = base.extend<PageFixture>({
  loginPage: async({page}, use) => {
    await use(new LoginPage(page));
  },

  productPage: async ({ page }, use) => {
     
    await use(new ProductPage(page));
  },

  cartPage: async ({ page }, use) => {
    
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  }

});

export { expect } from '@playwright/test';