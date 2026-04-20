import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class NavBarPage extends BasePage {
  private readonly northwindLink = "xpath=//*[text()='Northwind']";
  private readonly productLink = "xpath=//a[@href='/Northwind/Product']//span";

  async navigateToProducts(): Promise<void> {
    await expect(this.page.locator(this.northwindLink)).toBeVisible();
    await this.page.locator(this.northwindLink).click();
    await this.page.locator(this.productLink).click();
  }
}
