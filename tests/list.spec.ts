import { test, expect } from '@playwright/test';

test('working with list of elements', async ({ page }) => {

    await page.goto(('https://parabank.parasoft.com/parabank/index.htm'));
    const servicesList = page.locator('//*[@id="rightPanel"]/ul[1]'); //("xpath=(//*[@class='inventory_item'])"))
    await expect(servicesList.getByRole('listitem')).toHaveCount(5);
    await expect(servicesList.getByRole('listitem')).toHaveText(['ATM Services', 'Withdraw Funds', 'Transfer Funds', 'Check Balances', 'Make Deposits'])
     console.log(await servicesList.getByRole('listitem').nth(2));
    await servicesList.getByRole('listitem')
        .filter({ hasText: 'ATM Services' }).click();
       
    //await expect(page.getByText('This XML file does not appear to have any style information associated with it. The document tree is shown below.')).toBeVisible();
}

);