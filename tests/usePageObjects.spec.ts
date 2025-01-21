import { test, expect } from '@playwright/test'
import { NavigationPage } from '../page-objects/navigationPage'
import { FormLayoutsPage } from '../page-objects/formLayoutsPage'

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:4200/')
})

test('Navigate to Form page', async ({ page }) => {
	const navigateTo = new NavigationPage(page)
	await navigateTo.formLayoutsPage()
	await navigateTo.datePickerPage()
	await navigateTo.smartTablePage()
	await navigateTo.toastrPage()
	await navigateTo.tooltipPage()
})

test('Parameterized methods', async ({ page }) => {
	const navigateTo = new NavigationPage(page)
	const onFormLayoutsPage = new FormLayoutsPage(page)

	await navigateTo.formLayoutsPage()
	await onFormLayoutsPage.submitUsingGridForm('test@test.com', 'Welcome1', 'Option 2')
	await onFormLayoutsPage.submitInlineForm('John Smith', 'john@test.com', true)
})
