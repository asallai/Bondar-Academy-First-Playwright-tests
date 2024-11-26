import { test, expect } from '@playwright/test'
import { using } from 'rxjs'

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:4200/')
})

test.describe('Form Layouts page', async () => {
	test.beforeEach(async ({ page }) => {
		await page.getByText('Forms').click()
		await page.getByText('Form Layouts').click()
	})

	test('Input fields', async ({ page }) => {
		const usingTheGridEmailInput = page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: 'Email' })

		await usingTheGridEmailInput.fill('test@test.com')
		await usingTheGridEmailInput.clear()
		await usingTheGridEmailInput.pressSequentially('test2@test.com', { delay: 50 })

		// Generic assertion
		const inputValue = await usingTheGridEmailInput.inputValue()
		expect(inputValue).toEqual('test2@test.com')

		// Locator assertion
		await expect(usingTheGridEmailInput).toHaveValue('test2@test.com')
	})

	test('Radio buttons', async ({ page }) => {
		const usingTheGridEmailForm = page.locator('nb-card', { hasText: 'Using the Grid' })

		// Get by Label
		// (Radio button has 'visuall-hidden' class --> 'force: true' is necessary in order to check!)
		await usingTheGridEmailForm.getByLabel('Option 1').check({ force: true })
		// Get by Role
		await usingTheGridEmailForm.getByRole('radio', { name: 'Option 1' }).check({ force: true })

		// Validate the status
		// Using Generic assertion
		const radioStatus = usingTheGridEmailForm.getByLabel('Option 1').isChecked()
		expect(radioStatus).toBeTruthy()
		// Using Locator assertion
		await expect(usingTheGridEmailForm.getByLabel('Option 1')).toBeChecked()

		await usingTheGridEmailForm.getByLabel('Option 2').check({ force: true })
		// Validation by using Generic assertion
		expect(await usingTheGridEmailForm.getByLabel('Option 1').isChecked()).toBeFalsy()
		expect(await usingTheGridEmailForm.getByLabel('Option 2').isChecked()).toBeTruthy()
		// Validation by using Locator assertion
		await expect(usingTheGridEmailForm.getByLabel('Option 1')).not.toBeChecked()
		await expect(usingTheGridEmailForm.getByLabel('Option 2')).toBeChecked()
	})
})
