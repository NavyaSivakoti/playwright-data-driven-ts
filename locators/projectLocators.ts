import { Page } from '@playwright/test';

export const projectLocators = (page: Page) => ({
    // clicks the project in the left sidebar
    projectButton: (projectName: string) =>
        page.getByRole('button', { name: projectName }),

    // finds the column container by filtering the div that contains the column h2 heading
    columnContainer: (columnName: string) =>
        page.locator('div').filter({
            has: page.getByRole('heading', { name: columnName, level: 2 })
        }),
});