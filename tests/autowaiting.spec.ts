import { test, expect } from '@playwright/test'

test.beforeEach( async ({ page }) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX request').click()
})

test('Auto waiting', async ({ page }) => {
    const successButton = page.locator('.bg-success')
    await successButton.click()

   // const text = successButton.textContent()
   // await successButton.waitFor({ state: "attached" })
   // const text = successButton.allTextContents()

   // expect(text).toContain('Data loaded with AJAX get request.')

    await expect(successButton).toHaveText('Data loaded with AJAX get request.', { timeout: 20000 })    
})

test('Alternative waits', async ({ page }) => {
    const successButton = page.locator('.bg-success')
    
    // wait for element
    await page.waitForSelector('.bg-success')

    // wait for particular response
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    // wait for network calls to be completed (NOT RECOMMENDED)
    await page.waitForLoadState('networkidle')

    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')    
})