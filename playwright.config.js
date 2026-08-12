// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js',
  retries: 1,
  timeout: 40 * 1000,
  expect: { 
    timeout: 4*1000
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    trace: 'on',
    video: 'retain-on-failure',
      ignoreHttpsErrors : true,
      permissions:['geolocation']
  },
  
});

