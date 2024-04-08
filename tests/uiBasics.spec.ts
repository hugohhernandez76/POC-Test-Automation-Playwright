import { test, expect } from "@playwright/test";
import { HomePage } from "../pageObjects/homePage";
import { NewUser } from "../pageObjects/createNewUser";

test("Load main page and validate status code 200", async ({ page }) => {
  // Instantiate the HomePage object
  const homePage = new HomePage(page);
  await homePage.navigate();
  const title = await homePage.getTitle();
  expect(title).toContain("Motion | Meet Motion Calendar. Try it for Free");
});

test("Validate top menu bar to contain all elements visible", async ({
  page,
}) => {
  // Instantiate the HomePage object
  const homePage = new HomePage(page);
  await homePage.navigate();
  // Define the selector for the menu bar
  const menuBarSelector = 'div[class="nav-wrapper w-container"]';

  // Define an array of element selectors you expect to be present in the menu bar
  const expectedTextContents = [
    "Features",
    "Use Cases",
    "Teams",
    "Pricing",
    "Careers",
    "Contact",
    "Log in",
    "Try Motion for Free",
  ];

  // Check if the menu bar exists
  const menuBar = await page.$(menuBarSelector);
  expect(menuBar).not.toBeNull();

  // Iterate over each expected element and check if it exists within the menu bar
  for (const textContent of expectedTextContents) {
    // Construct a selector that matches elements with the expected text content
    const elementSelector = `${menuBarSelector} >> text=${textContent}`;

    // Check if an element with the expected text content exists in the menu bar
    const elementExists = (await page.$(elementSelector)) !== null;

    // Assert that the element exists
    expect(elementExists).toBeTruthy();
  }
  await homePage.clickFreeTrial();
});
test.only('Create new User', async ({page}) => { 
// Instantiate the HomePage object
const homePage = new HomePage(page);
const newUser = new NewUser(page);
await homePage.navigate();
await homePage.clickFreeTrial(); 
await newUser.createNewUser();
 })

