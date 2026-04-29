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

        // find the specific task card inside that column
        // .. goes up from h3 to the task card div
        const taskCard = column
            .getByRole('heading', { name: taskName, level: 3 })
            .locator('..');

        // verify task exists inside that column
        await expect(
            column.getByRole('heading', { name: taskName, level: 3 })
        ).toBeVisible();

        // verify each tag exists inside that specific task card only
        for (const tag of tags) {
            await expect(
                taskCard.getByText(tag, { exact: true })
            ).toBeVisible();
        }
    }
}