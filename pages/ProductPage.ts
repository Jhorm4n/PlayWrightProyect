import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Product } from '../models/Product';

export class ProductPage extends BasePage {
  private readonly addButton = "xpath=//div[@data-action='add']";
  private readonly productNameInput = '#Serenity_Demo_Northwind_ProductDialog13_ProductName';
  private readonly supplierSelect = '#select2-chosen-4';
  private readonly supplierSearch = '#s2id_autogen4_search';
  private readonly categorySelect = '#select2-chosen-5';
  private readonly categorySearch = '#s2id_autogen5_search';
  private readonly unitsInStockInput = '#Serenity_Demo_Northwind_ProductDialog13_UnitsInStock';
  private readonly unitsOnOrderInput = '#Serenity_Demo_Northwind_ProductDialog13_UnitsOnOrder';
  private readonly reorderLevelInput = '#Serenity_Demo_Northwind_ProductDialog13_ReorderLevel';
  private readonly saveAndCloseButton = "xpath=//div[@data-action='save-and-close']";
  private readonly quickSearchInput = '#Serenity_Demo_Northwind_ProductGrid0_QuickSearchInput';

  async addProduct(product: Product): Promise<void> {
    await this.page.locator(this.addButton).click();
    await this.page.locator(this.productNameInput).fill(product.name);
    await this.page.locator(this.supplierSelect).click();
    await this.selectOption(this.supplierSearch, product.supplierName);
    await this.page.locator(this.categorySelect).click();
    await this.selectOption(this.categorySearch, product.categoryName);
    await this.page.locator(this.unitsInStockInput).fill(product.unitsInStock.toString());
    await this.page.locator(this.unitsOnOrderInput).fill(product.unitsOnOrder.toString());
    await this.page.locator(this.reorderLevelInput).fill(product.reorderLevel.toString());
    await this.page.locator(this.saveAndCloseButton).click();
  }

  async searchProduct(productName: string): Promise<void> {
    await this.page.locator(this.quickSearchInput).fill(productName);
    await this.page.locator(this.quickSearchInput).press('Enter');
  }

  async verifyProductVisible(productName: string): Promise<void> {
    const productLocator = this.page.locator(`xpath=//a[@data-item-type='Demo.Northwind.Product' and normalize-space()='${productName}']`).first();
    await expect(productLocator).toBeVisible();
  }

  async searchAndVerifyProduct(productName: string): Promise<void> {
    await this.searchProduct(productName);
    await this.verifyProductVisible(productName);
  }
}
