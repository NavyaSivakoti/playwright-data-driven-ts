# Playwright Data-Driven Test Suite

An automated test suite built with Playwright and TypeScript using data-driven techniques and Page Object Model architecture to verify tasks, columns, and tags on a project board application.

## Tech Stack

- [Playwright](https://playwright.dev/) - Test automation framework
- [TypeScript](https://www.typescriptlang.org/) - Programming language
- Page Object Model (POM) - Design pattern

## Project Structure

```
playwright-data-driven-ts/
├── locators/
│   ├── loginLocators.ts        # Login page element selectors
│   └── projectLocators.ts      # Project board element selectors
├── pages/
│   ├── LoginPage.ts            # Login page actions
│   └── ProjectPage.ts          # Project board actions
├── tests/
│   └── asana.spec.ts           # Main test file
├── config.ts                   # Base URL and credentials
├── testData.ts                 # Test data for all 6 test cases
└── playwright.config.ts        # Playwright configuration
```

## How It Works

### Data-Driven Approach

All 6 test cases are defined in `testData.ts` as an array of objects. Each object has 4 parameters:

```typescript
{
  project: "Web Application",
  task: "Implement user authentication",
  column: "To Do",
  tags: ["Feature", "High Priority"]
}
```

A single `for` loop in `asana.spec.ts` iterates through all 6 objects and generates one test per object. Adding a new test case only requires adding a new object to `testData.ts`. No changes to the test code needed.

### Page Object Model

Locators are separated from business logic:

- `locators/` folder holds all element selectors
- `pages/` folder holds all actions and verifications
- `tests/` folder holds the actual test cases

This means if a selector changes, only one file needs updating.

### Column Scoping

The key locator strategy used is column container scoping:

```typescript
// Finds the column heading and goes up to its parent container
page.getByRole('heading', { name: columnName, level: 2 }).locator('..')
```

All task and tag verifications happen inside that specific column container only. This prevents false positives even when the same tag appears in multiple columns.

## Test Cases

| # | Project | Task | Column | Tags |
|---|---|---|---|---|
| 1 | Web Application | Implement user authentication | To Do | Feature, High Priority |
| 2 | Web Application | Fix navigation bug | To Do | Bug |
| 3 | Web Application | Design system updates | In Progress | Design |
| 4 | Mobile Application | Push notification system | To Do | Feature |
| 5 | Mobile Application | Offline mode | In Progress | Feature, High Priority |
| 6 | Mobile Application | App icon design | Done | Design |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd playwright-data-driven-ts

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Running Tests

```bash
# Run all tests
npx playwright test

# View HTML report
npx playwright show-report
```

## Test Results

All 18 tests pass across 3 browsers (Chromium, Firefox, WebKit).

```
18 passed (6 test cases x 3 browsers)
0 failed
0 flaky
```

## Configuration

Credentials and base URL are stored in `config.ts`.

> Note: In a production environment, credentials should be stored in a `.env` file, CI/CD pipeline secrets (e.g. GitHub Actions Secrets), or a secrets manager and never hardcoded in the codebase.