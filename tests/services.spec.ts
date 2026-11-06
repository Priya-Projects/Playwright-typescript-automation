import {test, expect } from "@playwright/test";
test('Check for services', async({page})=>{
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');

    //Click on the header left menu 'services'
   await page.locator('#headerPanel')
   .getByRole('listitem')
    .filter({ hasText: 'Services' })
    .getByRole('link', { name: 'Services' })
    .click();
   //expect that list of services is displayed
   await expect(page.getByText('Available Bookstore SOAP services:')).toBeVisible();
});

