import { chromium, FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {
    // Open Browser
    const browser = await chromium.launch()
    const page = await browser.newPage()
    await page.goto('https://practice.sdetunicorns.com/my-account/')
    await page.context().storageState({path: 'notLoggedInState.json'})
    await page.locator("input[id='username']").fill('practiceuser1')
    await page.locator('#password').fill('PracticePass1!')
    await page.locator('button[value="Log in"]').click()
    
    // Save signed in state
    await page.context().storageState({path: 'loggedInState.json'})
    // Closing browser
    await page.close()
}

export default globalSetup;
