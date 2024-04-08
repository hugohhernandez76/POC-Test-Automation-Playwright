import { Page, expect } from "@playwright/test";
import faker from 'faker';

export class NewUser {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async createNewUser() {
    // Generate a random email
    const email = faker.internet.email();

    // Fill the email input field with the generated email
    await this.page.fill('[name="textinput_search"]', email);

    // Check if the Continue button is enabled
    const continueButton = await this.page.$('button[type="submit"]');
    const isButtonEnabled = await continueButton?.isEnabled();

    // Assert that the Continue button is enabled
    expect(isButtonEnabled).toBeTruthy();

    // Click on the Continue button
    await continueButton?.click();
    
    // // Wait for navigation to a URL matching a regular expression
    await this.page.waitForURL(/https:\/\/app\.usemotion\.com\/checkout/);
    // wait for span to be visible
    await this.page.waitForSelector('//span[contains(@class, "text-semantic-neutral-text-subtle") and contains(@class, "text-xs") and contains(@class, "mb-3")]');

    // Verificar que el span esté visible
    const isSpanVisible = await this.page.isVisible('span.text-semantic-neutral-text-subtle.text-xs.mb-1.5');
    expect(isSpanVisible).toBeTruthy();
  }
  

  async getTitle() {
    return this.page.title();
  }
  
}