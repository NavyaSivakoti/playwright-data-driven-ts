import { Page, expect } from '@playwright/test';
import { projectLocators } from '../locators/projectLocators';

export class ProjectPage {
    constructor(private page: Page) { }

    // clicks the project in the left sidebar
    async navigateToProject(projectName: string) {
        const locators = projectLocators(this.page);
        await locators.projectButton(projectName).click();
    }

    // verifies task is in the correct column and has the correct tags
    async verifyTaskInColumn(columnName: string, taskName: string, tags: string[]) {
        const locators = projectLocators(this.page);

        // find the column container first
        const column = locators.columnContainer(columnName);
        console.log(column);

        // verify task exists inside that column
        await expect(column.getByRole('heading', { name: taskName, level: 3 })).toBeVisible();

        // verify each tag exists inside that column
        for (const tag of tags) {
            await expect(column.getByText(tag, { exact: true })).toBeVisible();
        }
    }
}