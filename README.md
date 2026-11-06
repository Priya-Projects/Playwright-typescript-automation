# Playwright + TypeScript UI Test Automation

![Playwright tests](https://github.com/Priya-Projects/playwright-typescript-automation/actions/workflows/playwright.yml/badge.svg)

UI test automation built with **Playwright** and **TypeScript**, running against [Sauce Demo](https://www.saucedemo.com), a public practice e-commerce site.

## Tech stack

| Tool | Purpose |
|---|---|
| Playwright Test | Test runner, assertions, reporting |
| TypeScript | Test code |
| Node.js (LTS) | Runtime |
| GitHub Actions | CI pipeline |

## What is tested
Locators concepts
Lists concept
## Project structure

```
.
├── tests/                     # Test files (*.spec.ts)
├── pages/                     # Page Objects (once added)
├── playwright.config.ts       # Playwright configuration
├── package.json               # Dependencies and scripts
└── README.md
```
## Setup

```powershell
# 1. Clone the repository
git clone https://github.com/Priya-Projects/Playwright-typescript-automation.git
cd playwright-typescript-automation

# 2. Install dependencies
npm ci

# 3. Download the Playwright browsers
npx playwright install
```

## Running the tests

Run all tests (headless):

```powershell
npm test
```

Run with a visible browser:

```powershell
npm run test:headed
```

Run a single file:

```powershell
npx playwright test tests/login.spec.ts
```

Open the HTML report after a run:

```powershell
npm run report
```

## Key features

- Locators based on user-facing attributes: `getByRole`, `getByText`, `getByTestId`
- Web-first assertions with Playwright's automatic waiting and retry
- HTML report with screenshots and traces for failed tests

## Roadmap

- [ ] Page Object Model
- [ ] Fixtures for shared setup (login)
- [ ] Combined API + UI test
- [ ] CI pipeline (GitHub Actions)

## Related project

[Robot Framework UI + API automation](https://github.com/Priya-Projects/Robot-PlaywrightUI-api-automation): the same site and API tested with Robot Framework, Browser Library and RequestsLibrary, with a GitHub Actions pipeline.