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

        // Step 1: find the column using h2
        const column = locators.columnContainer(columnName);

        // Step 2: find the exact task card using bg-white scoped to column
        const taskCard = column.locator('div.bg-white').filter({
            has: this.page.getByRole('heading', { name: taskName, exact: true, level: 3 })
        });

        // ensures exactly one card matches the task name in this column
        await expect(taskCard).toHaveCount(1);

        // Step 3: verify each tag inside that specific task card only
        for (const tag of tags) {
            await expect(
                taskCard.getByText(tag, { exact: true })
            ).toBeVisible();
        }
    }
}