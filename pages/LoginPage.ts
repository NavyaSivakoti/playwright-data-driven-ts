import { Page } from '@playwright/test';
import { config } from '../config';
import { loginLocators } from '../locators/loginLocators';

export class LoginPage {
    constructor(private page: Page) { }

    async login() {
        const locators = loginLocators(this.page);
        await this.page.goto('/');
        await locators.usernameInput.fill(config.username);
        await locators.passwordInput.fill(config.password);
        await locators.signInButton.click();
    }
}