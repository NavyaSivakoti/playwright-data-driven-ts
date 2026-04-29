import { Page } from '@playwright/test';

export const projectLocators = (page: Page) => ({
    // clicks the project in the left sidebar
    projectButton: (projectName: string) =>
        page.getByRole('button', { name: projectName }),

    // finds the column container by its h2 heading
    columnContainer: (columnName: string) =>
        page.getByRole('heading', { name: columnName, level: 2 }).locator('..'),
});