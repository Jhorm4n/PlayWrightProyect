import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { NavBarPage } from '../pages/NavBarPage';
import { ProductPage } from '../pages/ProductPage';

type ProductFixtures = {
  productPage: ProductPage;
};

export const productTest = base.extend<ProductFixtures>({
  productPage: async ({ page }, use) => {
    const baseUrl = process.env.BASE_URL;
    const username = process.env.APP_USER;
    const password = process.env.APP_PASSWORD;

    if (!baseUrl || !username || !password) {
      throw new Error('Missing env variables');
    }

    const loginPage = new LoginPage(page);
    const navBarPage = new NavBarPage(page);
    const productPage = new ProductPage(page);

    await loginPage.goto(baseUrl);
    await loginPage.login(username, password);
    await navBarPage.navigateToProducts();

    await use(productPage);
  },
});
