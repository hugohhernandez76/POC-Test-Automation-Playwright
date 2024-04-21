import { test, expect } from "@playwright/test";
import HomePage from "../pageObjects/homePage";

test.describe('Account Page', () => {
  test("Open Home Page and Verify loggin ", async ({ page }) => {
    // open url
    await page.goto('/my-account');
    await page.locator('li a[href*="cart"]').first().click()
    
  });
    
  test.describe('Account Page', () => {
    test.use({ storageState: 'notLoggedInState.json' })
  
    test('Verify login and register is visible', async ({ page }) => {
      await page.goto('/my-account')
      await expect(page.locator('form[class*="login"]')).toBeVisible()
      await expect(page.locator('form[class*="register"]')).toBeVisible()
    });
  })
})