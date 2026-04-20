import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { LoginPage } from '../pages/LoginPage';
import { NavBarPage } from '../pages/NavBarPage';
import { ProductPage } from '../pages/ProductPage';
import { Product } from '../models/Product';

async function createRandomProduct(): Promise<Product> {
  return {
    name: `producto prueba ${faker.string.alphanumeric(6)}`,
    supplierName: "Aux joyeux ecclésiastiques",
    categoryName: "Produce",
    unitsInStock: faker.number.int({ min: 1, max: 20 }),
    unitsOnOrder: faker.number.int({ min: 1, max: 10 }),
    reorderLevel: faker.number.int({ min: 1, max: 5 })
  };
}

const productTest = test.extend<{ productPage: ProductPage }>({
  productPage: async ({ page }, use) => {
    const baseUrl = process.env.URL ?? 'NA';
    const username = process.env.USER ?? 'NA';
    const password = process.env.PASSWORD ?? 'NA';

    const loginPage = new LoginPage(page);
    const navBarPage = new NavBarPage(page);
    const productPage = new ProductPage(page);

    await loginPage.goto(baseUrl);
    await loginPage.login(username, password);
    await navBarPage.navigateToProducts();

    await use(productPage);
  },
});

productTest.describe('Product Management', () => {
  productTest('Add producto', async ({ productPage }) => {
    const product = await createRandomProduct();
    
    await productPage.addProduct(product);
    await productPage.searchAndVerifyProduct(product.name);
  });
});