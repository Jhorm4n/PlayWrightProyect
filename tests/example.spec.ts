import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

import { LoginPage } from '../pages/LoginPage';
import { NavBarPage } from '../pages/NavBarPage';
import { ProductPage } from '../pages/ProductPage';
import { Product } from '../models/Product';

/* -------------------------------------------------------------------------- */
/*                              Test utilities                                */
/* -------------------------------------------------------------------------- */

function createRandomProduct(): Product {
  return {
    name: `producto prueba ${faker.string.alphanumeric(6)}`,
    supplierName: 'Aux joyeux ecclésiastiques',
    categoryName: 'Produce',
    unitsInStock: faker.number.int({ min: 1, max: 20 }),
    unitsOnOrder: faker.number.int({ min: 1, max: 10 }),
    reorderLevel: faker.number.int({ min: 1, max: 5 }),
  };
}

/* -------------------------------------------------------------------------- */
/*                              Custom fixture                                 */
/* -------------------------------------------------------------------------- */

const productTest = test.extend<{ productPage: ProductPage }>({
  productPage: async ({ page }, use) => {
    const baseUrl = process.env.BASE_URL;
    const username = process.env.APP_USER;
    const password = process.env.APP_PASSWORD;

    if (!baseUrl || !username || !password) {
      throw new Error(
        'BASE_URL, APP_USER and APP_PASSWORD environment variables are required'
      );
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

/* -------------------------------------------------------------------------- */
/*                                   Tests                                    */
/* -------------------------------------------------------------------------- */

test.describe('Product Management', () => {
  productTest('Add producto', async ({ productPage }) => {
    const product = createRandomProduct();

    await productPage.addProduct(product);
    await productPage.searchAndVerifyProduct(product.name);
  });

  productTest('Delete producto', async ({ productPage }) => {
    const product = createRandomProduct();

    await productPage.addProduct(product);
    await productPage.searchAndVerifyProduct(product.name);

    await productPage.deleteProduct(product.name);
    await productPage.searchProduct(product.name);

    await expect(
      productPage.getProductRow(product.name)
    ).toHaveCount(0, { timeout: 10_000 });
  });
});