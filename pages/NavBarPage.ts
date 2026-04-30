import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class NavBarPage extends BasePage {
  
  private readonly productsButton = "xpath=//a[@href='/Northwind/Product']//span";
  private readonly northwindLink = "xpath=//*[text()='Northwind']";
  constructor(page: Page) {
    super(page);
  }

  async navigateToProducts(): Promise<void> {
    await this.page.waitForSelector(this.northwindLink);
    await this.click(this.northwindLink);
    await this.page.waitForSelector(this.productsButton);
    await this.click(this.productsButton);
    await this.waitForPageLoad();
  }
}
