import { Page, expect } from "@playwright/test";

export class HomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto("https://www.usemotion.com/");
    // Get the status code of the page
    const status = await this.page.evaluate(async () => {
      const response = await fetch(window.location.href);
      return response.status;
    });
    console.log("Page status code:", status);

    // Assert the status code after getting it
    expect(status).toBe(200);
  }

  async getTitle() {
    return this.page.title();
  }
  async clickFreeTrial() {
    // Click on the "Try Motion for free" button using XPath expression
    await this.page.click('//a[contains(text(), "Try Motion for free")]');

    // Wait for navigation to a URL matching a regular expression
    await this.page.waitForURL(/\/checkout/);

    // Find the <p> element on the new page
    const paragraph = await this.page.$('p');

    // Get the text content of the <p> element
    const textContent = await paragraph?.textContent();
    console.log('Text content:', textContent); 

    // Assert that the text content contains the expected text
    expect(textContent).toContain('👋 Try Motion for free!');
  }
}



