import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProjectPage } from '../pages/ProjectPage';
import { testData } from '../testData';

for (const data of testData) {
    test(`Test Case ${testData.indexOf(data) + 1}: Verify "${data.task}" is in "${data.column}"`, async ({ page }) => {

        // login to the app
        const loginPage = new LoginPage(page);
        await loginPage.login();

        // navigate to the correct project
        const projectPage = new ProjectPage(page);
        await projectPage.navigateToProject(data.project);

        // verify task is in correct column with correct tags
        await projectPage.verifyTaskInColumn(data.column, data.task, data.tags);
    });
}   