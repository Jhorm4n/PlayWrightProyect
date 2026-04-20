import { Page } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected async waitForLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  protected async selectOption(searchInput: string, optionName: string): Promise<void> {
    await this.page.locator(searchInput).fill(optionName);
    await this.page.locator(`xpath=//div[@class='select2-result-label' and normalize-space()='${optionName}']`).click();
  }
}
