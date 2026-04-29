import { Page } from '@playwright/test';

export const loginLocators = (page: Page) => ({
    usernameInput: page.getByRole('textbox', { name: 'Username' }),
    passwordInput: page.getByRole('textbox', { name: 'Password' }),
    signInButton: page.getByRole('button', { name: 'Sign in' }),
});