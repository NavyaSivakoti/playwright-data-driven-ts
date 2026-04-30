import { Page } from '@playwright/test';

export const projectLocators = (page: Page) => ({
    // clicks the project in the left sidebar
    projectButton: (projectName: string) =>
        page.getByRole('button', { name: projectName }),

    // Step 2: find the exact task card inside the column
    columnContainer: (columnName: string) =>
        page.locator('div').filter({
            has: page.getByRole('heading', { name: columnName, level: 2 })
        }),
});