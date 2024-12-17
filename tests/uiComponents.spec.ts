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

	test('Checkboxes', async ({ page }) => {
		await page.getByText('Modal & Overlays').click()
		await page.getByText('Toastr').click()

		await page.getByRole('checkbox', { name: 'Hide on click' }).uncheck({ force: true })

		await page.getByRole('checkbox', { name: 'Prevent arising of duplicate toast' }).check({ force: true })

		const allBoxes = page.getByRole('checkbox')
		// all() creates an array from the locators so that we can iterate over them
		// Since all() returns a Promise, we should use await.
		for (const box of await allBoxes.all()) {
			// iterating an array -> use for-of
			await box.check({ force: true })
			expect(await box.isChecked()).toBeTruthy()

			await box.uncheck({ force: true })
			expect(await box.isChecked()).toBeFalsy()
		}
	})

	test('Lists and Dropdowns', async ({ page }) => {
		const menuDropdown = page.locator('ngx-header nb-select')
		await menuDropdown.click()

		page.getByRole('list') // when the list has UL tag
		page.getByRole('listitem') // whan the list has LI tag

		// const optionList = page.getByRole('list').locator('nb-option')
		const optionList = page.locator('nb-option-list nb-option')
		await expect(optionList).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate'])
		await optionList.filter({ hasText: 'Cosmic' }).click()

		// background color checking
		const header = page.locator('nb-layout-header')
		await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

		const colors = {
			Light: 'rgb(255, 255, 255)',
			Dark: 'rgb(34, 43, 69)',
			Cosmic: 'rgb(50, 50, 89)',
			Corporate: 'rgb(255, 255, 255)',
		}

		for (const color in colors) {
			// iterating an object -> use for-in
			await menuDropdown.click()
			await optionList.filter({ hasText: color }).click()
			await expect(header).toHaveCSS('background-color', colors[color]) // [] get the VALUE of the object element
		}
	})

	test('Tooltips', async ({ page }) => {
		await page.getByText('Modal & Overlays').click()
		await page.getByText('Tooltip').click()

		const toolTipCard = page.locator('nb-card', { hasText: 'Tooltip Placements' })
		await toolTipCard.getByRole('button', { name: 'Top' }).hover()

		page.getByRole('tooltip') // if 'role' is assigned to the tooltip
		const tooltip = await page.locator('nb-tooltip').textContent()
		expect(tooltip).toEqual('This is a tooltip') 
	})
})
