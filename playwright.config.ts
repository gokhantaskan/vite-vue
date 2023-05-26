import "dotenv/config";

import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

const DEV_PORT = parseInt(process.env.VITE_PORT || "5173");

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: "./e2e",
  /* Maximum time one test can run for. */
  timeout: 60 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 10_000,
  },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["list"],
    ["html", { outputFile: "./test-results/e2e/results.html" }],
    ["json", { outputFile: "./test-results/e2e/json/results.json" }],
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: `http://localhost:${DEV_PORT}`,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    /* Only on CI systems run the tests headless */
    headless: !!process.env.CI,
    /* Locale to use for i18n, dates and numbers. */
    locale: "en-US",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "Chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "Microsoft Edge",
      use: { ...devices["Desktop Edge"], channel: "msedge" },
    },
    {
      name: "Firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "Safari",
      use: { ...devices["Desktop Safari"] },
    },
    /* Test against tablet viewports. */
    {
      name: "iPad (gen 6)",
      use: { ...devices["iPad (gen 6)"] },
    },
    /* Test against mobile viewports. */
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 11"] },
    },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: "test-results/e2e",

  /* Run your local dev server before starting the tests */
  webServer: {
    /**
     * Use the dev server by default for faster feedback loop.
     * Use the preview server on CI for more realistic testing.
    Playwright will re-use the local server if there is already a dev-server running.
     */
    command: process.env.CI ? `vite preview --port ${DEV_PORT}` : "vite dev",
    port: DEV_PORT,
    reuseExistingServer: !process.env.CI,
  },
};

export default config;
