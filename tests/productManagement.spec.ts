import { test, expect } from '@playwright/test';
import { productTest } from '../fixtures/product.fixture';
import { createRandomProduct } from '../helpers/product.factory';


test.describe('Feature: Product Management', () => {

  productTest(`Given the administrator navigates to the Add Product page
    When the administrator enters valid product information
    Then the new product should appear in the product list successfully`, async ({ productPage }) => {
    const product = createRandomProduct();

    await productPage.addProduct(product);
    await productPage.searchAndVerifyProduct(product.name);
  });

  productTest(`Given the administrator is on the Products page
    And the administrator is on the Products page
    When the administrator selects a product to delete
    Then the product should be removed from the product list successfully`, async ({ productPage }) => {
    const product = createRandomProduct();

    await productPage.addProduct(product);
    await productPage.searchAndVerifyProduct(product.name);

    await productPage.deleteProduct(product.name);
    await productPage.searchProduct(product.name);

    await expect(
      productPage.getProductRow(product.name)
    ).toHaveCount(0, { timeout: 10_000 });

    await expect(
    await productPage.productsTitleForm.screenshot()
    ).toMatchSnapshot('products-list.png', {
      threshold: 0.1,
    });

  });

  productTest(`Given the administrator is on the Products page
    And the administrator is on the Products page
    When the administrator selects a product to update
    Then the product should be updated in the product list successfully`, async ({ productPage }) => {
    const product = createRandomProduct();

    await productPage.addProduct(product);
    await productPage.searchAndVerifyProduct(product.name);

    await productPage.updateProduct(product.name, { ...product, name: `${product.name} (Updated)` });
    await productPage.searchAndVerifyProduct(`${product.name} (Updated)`);
  });
});