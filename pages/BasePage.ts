import { expect, Page } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }
 /*detiene la ejecución del test hasta que:
  No haya más solicitudes de red activas durante al menos 500 ms
  Espera a que la página deje de cargar recursos
  Se considera que la página está “estable” desde el punto de vista de red*/
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async fill(selector: string, value: string): Promise<void> {
    await this.page.fill(selector, value);
  }

  async click(selector: string): Promise<void> {
    await this.page.click(selector);
  }

  async selectOption(searchInput: string, optionName: string): Promise<void> {
    await this.page.locator(searchInput).fill(optionName);
    await this.page.locator(`xpath=//div[@class='select2-result-label' and normalize-space()='${optionName}']`).click();
  }

  async expectVisible(selector: string): Promise<void> {
    await expect(this.page.locator(selector)).toBeVisible({ timeout: 10_000 });
  }

  async pressKeyboardEnter(): Promise<void> {
    await this.page.keyboard.press('Enter');
  }
  
}
