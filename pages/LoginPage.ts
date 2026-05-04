import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly usernameInput = 'input[id="LoginPanel0_Username"]';
  private readonly passwordInput = 'input[id="LoginPanel0_Password"]';
  private readonly submitButton = 'button[id="LoginPanel0_LoginButton"]';

  constructor(page: Page) {
    super(page);
  }

  async gotoLogin(): Promise<void> {
    await this.goto('/');
    await this.waitForPageLoad();
  }

  async login(username: string, password: string): Promise<void> {
    console.log(`Logging in with user: ${username}`);
    console.log(`Logging in with password: ${'*'.repeat(password.length)}`);
    await this.page.waitForSelector(this.usernameInput);
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.submitButton);
    await this.waitForPageLoad();
  }
}
