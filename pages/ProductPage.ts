import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Product } from '../models/Product';

export class ProductPage extends BasePage {
  private readonly addButton = "xpath=//div[@data-action='add']";
  private readonly deleteButton = "xpath=//div[@data-action='delete' and contains(@class,'icon-tool-button')]";
  private readonly confirmDelete = 'xpath=//button[@class="btn btn-primary"]';
  private readonly productNameInput = 'input[id="Serenity_Demo_Northwind_ProductDialog13_ProductName"]';
  private readonly supplierSelect = '#select2-chosen-4';
  private readonly supplierInput = 'input[id="s2id_autogen4_search"]';
  private readonly categorySelect = '#select2-chosen-5';
  private readonly categorySearch = 'input[id="s2id_autogen5_search"]';
  private readonly unitsInStockInput = 'input[name="UnitsInStock"]';
  private readonly unitsOnOrderInput = 'input[name="UnitsOnOrder"]';
  private readonly reorderLevelInput = 'input[name="ReorderLevel"]';
  private readonly saveButton = 'xpath=//div[@data-action="save-and-close"]';
  private readonly searchInput = 'input[id*="Serenity_Demo_Northwind_ProductGrid0_QuickSearchInput"]';
  private readonly titleFormAddProduct = 'div[class="panel-titlebar-text"]';

  constructor(page: Page) {
    super(page);
  }

  private rowByName(name: string): string {
    return `//a[@data-item-type='Demo.Northwind.Product'  and normalize-space()="${name}"]`;
  }

  async goToAddProducts(): Promise<void> {
    await this.click(this.addButton);
    await this.page.waitForSelector(this.productNameInput);
  }

  async addProduct(product: Product): Promise<void> {
    await this.goToAddProducts();
    await this.fill(this.productNameInput, product.name);

    await this.page.locator(this.supplierSelect).click();
    await this.selectOption(this.supplierInput, product.supplierName);
  
    await this.page.locator(this.categorySelect).click();
    await this.selectOption(this.categorySearch, product.categoryName);

    await this.fill(this.unitsInStockInput, String(product.unitsInStock));
    await this.fill(this.unitsOnOrderInput, String(product.unitsOnOrder));
    await this.fill(this.reorderLevelInput, String(product.reorderLevel));
    await this.click(this.saveButton);
    await this.waitForPageLoad();

  }
  async searchProduct(name: string): Promise<void> {
    await this.page.waitForSelector(this.searchInput);
    await this.fill(this.searchInput, name);
    await this.pressKeyboardEnter();
    await this.waitForPageLoad();
  }

  async searchAndVerifyProduct(name: string): Promise<void> {
    await this.searchProduct(name);
    await expect(this.page.locator(this.rowByName(name))).toBeVisible({ timeout: 10_000 });
  }

  async clickInProduct(name: string): Promise<void> {
    await this.page.waitForSelector(this.rowByName(name));
    await this.click(this.rowByName(name));
    await this.waitForPageLoad();
  }

  async deleteProduct(name: string): Promise<void> {
    await this.clickInProduct(name);
    await this.click(this.deleteButton);
    await this.page.waitForSelector(this.confirmDelete);
    await this.click(this.confirmDelete);
    await this.waitForPageLoad();
  }

  getProductRow(name: string) {
    return this.page.locator(this.rowByName(name));
  }

  async updateProduct(originalName: string, updatedProduct: Product): Promise<void> {
    await this.clickInProduct(originalName);
    await this.page.waitForSelector(this.productNameInput);
    await this.fill(this.productNameInput, updatedProduct.name);
    await this.click(this.saveButton);
    await this.waitForPageLoad();
  }

  
  get productsTitleForm() {
    return this.page.locator('.title-text');
  }

}
