import { test, expect } from '@playwright/test'
import { using } from 'rxjs'

test.beforeEach( async ({ page }) => {
    await page.goto('http://localhost:4200/')
})

test.describe('Form Layouts page', async () => {
    test.beforeEach( async ({ page }) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('Input fields', async ({ page }) => {
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})
    
        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('test2@test.com', {delay: 50})

        // Generic assertion
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('test2@test.com')

        // Locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('test2@test.com')
    })



})