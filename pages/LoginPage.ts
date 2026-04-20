import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly usernameInput = 'input[name="Username"]';
  private readonly passwordInput = 'input[name="Password"]';
  private readonly loginButton = '#LoginPanel0_LoginButton';
  private readonly startSharpHeading = '.s-form-title-logo';
  private readonly contentHeader = '.content-header';

  async goto(baseUrl: string): Promise<void> {
    await this.page.goto(baseUrl);
    await expect(this.page.locator(this.startSharpHeading)).toBeVisible();
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.locator(this.usernameInput).fill(username);
    await this.page.locator(this.passwordInput).fill(password);
    await this.page.locator(this.loginButton).click();
    await expect(this.page.locator(this.contentHeader)).toBeVisible();
  }
}
