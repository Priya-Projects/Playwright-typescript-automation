import { test, expect } from '@playwright/test';

test('example test using getbytext', async ({ page }) => {
    await page.goto(('https://parabank.parasoft.com/parabank/index.htm'));

    //expect webpage to have the text 'Register' in the page
    await expect(page.getByText('Register')).toBeVisible();
});

test('example test using getbyLabel', async ({ page }) => {
    await page.goto(('https://login.salesforce.com/'));

    //click on 'Remember me' checkbox
    await (page.getByLabel('Remember me').click());
});

test('example test using getbyAltText', async ({ page }) => {
    await page.goto(('https://parabank.parasoft.com/parabank/index.htm'));
    await (page.getByText('ParaBank Is Now Re-Opened').click());

    //use getbyAltText to click on the logo image
    await (page.getByAltText('ParaBank').click());
    await expect(page.getByText('Latest News')).toBeVisible();
});

test('example test using getbyTitle', async ({ page }) => {
    // getbytitle is used to get the element by its title attribute and not the title tag of the webpage
    await page.goto(('https://parabank.parasoft.com/parabank/lookup.htm'));

    //use getByTitle to click on the logo and go to homepage
    await (page.getByTitle('ParaBank').click());

});
test('example test using getbyPlaceholder', async ({ page }) => {
    //getbyPlaceholder is used to locate the element by its placeholder attribute
    await page.goto(('https://www.saucedemo.com/'));
    //use getByPlaceholder to enter username and password
    await (page.getByPlaceholder('Username').fill('standard_user'));
    await (page.getByPlaceholder('Password').fill('secret_sauce'));
    await (page.getByRole('button', { name: 'Login' }).click());

});

test('example test using filterbytext', async ({ page }) => {
    await page.goto(('https://www.saucedemo.com/'));
    await (page.getByPlaceholder('Username').fill('standard_user'));
    await (page.getByPlaceholder('Password').fill('secret_sauce'));
    await (page.getByRole('button', { name: 'Login' }).click());
    //use filterbytext to locate the right element based on the given text
    await (page.locator("xpath=(//*[@class='inventory_item'])")
        .filter({ hasText: 'Sauce Labs Backpack' })
        .getByRole('button', { name: 'Add to cart' }).click());
});

test('example test using Filter by not having text', async ({ page }) => {
    await page.goto(('https://www.saucedemo.com/'));
    await (page.getByPlaceholder('Username').fill('standard_user'));
    await (page.getByPlaceholder('Password').fill('secret_sauce'));
    await (page.getByRole('button', { name: 'Login' }).click());
    await expect(page.locator("xpath=(//*[@class='inventory_item'])")
        .filter({ hasNotText: 'Sauce Labs' }))
        .toBeVisible();
});

test('example test using Filter by child', async ({ page }) => {
    await page.goto(('https://www.saucedemo.com/'));
    await (page.getByPlaceholder('Username').fill('standard_user'));
    await (page.getByPlaceholder('Password').fill('secret_sauce'));
    await (page.getByRole('button', { name: 'Login' }).click());

    //await (page.locator("xpath=(//*[@class='inventory_item'])"))
    await (page.locator('.inventory_item'))
        
        //has: looks for an element; hasText: looks for text.
        // And with Playwright, always check the element’s role + accessible name when using getByRole().
        //<a> has role="button".So Playwright sees this element as a button, not a link.Its accessible name comes from aria-label
        //.filter({ hasText: 'Sauce Labs Bolt T-Shirt' })
        .filter({ has: page.getByRole('button', { name: 'View details for Sauce Labs Bolt T-Shirt' })})
        .getByRole('button', { name: 'Add to cart' })
        .click();
});

test('example test using Filter by not having child', async ({ page }) => {
    //_filter by not having a matching element inside
    await page.goto(('https://www.saucedemo.com/'));
    await (page.getByPlaceholder('Username').fill('standard_user'));
    await (page.getByPlaceholder('Password').fill('secret_sauce'));
    await (page.getByRole('button', { name: 'Login' }).click());

    const productsOtherthanTShirt= page.locator('.inventory_item')      
        .filter({ hasNot: page.getByRole('button', { name: 'View details for Sauce Labs Bolt T-Shirt' })});
    await expect(productsOtherthanTShirt).toHaveCount(5);// this counts other products that do not have the button name 'View details for Sauce Labs Bolt T-Shirt' in the page
        
});

test('matching 2 locators simultaneaously using AND', async ({ page }) => {
    //_filter by not having a matching element inside
    await page.goto(('https://www.saucedemo.com/'));
    await (page.getByPlaceholder('Username').fill('standard_user'));
    await (page.getByPlaceholder('Password').fill('secret_sauce'));
    await (page.getByRole('button', { name: 'Login' }).click());
    
    //add tshirt product to cart using chaining of locators
    const tShirtProduct= page.locator('.inventory_item').filter({hasText:'Sauce Labs Bolt T-Shirt'});
    const addtshirtTocart=tShirtProduct.getByRole('button', { name: 'Add to cart' });
    await addtshirtTocart.click();
    
    //add backpack product to cart using chaining of locators
    const backPackProduct= page.locator('.inventory_item').filter({hasText:'Sauce Labs Backpack'});
    const addbackPackTocart=backPackProduct.getByRole('button', { name: 'Add to cart' });
    await addbackPackTocart.click();

    //click on the cart icon to go to the cart page
    const cartIcon=page.locator('.shopping_cart_link');
    await cartIcon.click();

    //click on the remove button of the tshirt product in the cart page using 'AND' operator to match 2 locators simultaneously
    const removeTshirtButton=page.getByRole('button', { name: 'Remove' })
  .and(page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]'));
    await removeTshirtButton.click();
});