import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Carga variables de entorno desde .env en desarrollo

dotenv.config({
  path: require('path').resolve(__dirname, `.env.${process.env.NODE_ENV || 'qa'}`),
});


// Base URL configurable por ambiente
const baseURL = process.env.BASE_URL || 'https://demo.serenity.is';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000, // Timeout global de cada prueba
  expect: {
    timeout: 10_000, // Timeout para expect()
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI, // no permitir `test.only` en CI
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  outputDir: 'test-results',
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'reports/htmlReport' }],
    ['json', { outputFile: 'reports/jsonReport/results.json' }],
    ['junit', { outputFile: 'reports/xmlReport/results.xml' }],
  ],
  use: {
    baseURL,
    headless: process.env.HEADLESS !== 'false',
    viewport: { width: 1280, height: 720 },
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }/*,
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },*/
  ],
});
