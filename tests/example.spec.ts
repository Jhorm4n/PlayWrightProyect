import { test, expect } from '@playwright/test';
import { productTest } from '../fixtures/product.fixture';
import { createRandomProduct } from '../helpers/product.factory';


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