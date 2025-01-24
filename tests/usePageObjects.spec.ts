import { test, expect } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:4200/')
})

test('Navigate to Form page', async ({ page }) => {
	const pm = new PageManager(page)
	await pm.navigateTo().formLayoutsPage()
	await pm.navigateTo().datePickerPage()
	await pm.navigateTo().smartTablePage()
	await pm.navigateTo().toastrPage()
	await pm.navigateTo().tooltipPage()
})

test('Parameterized methods', async ({ page }) => {
	const pm = new PageManager(page)
	await pm.navigateTo().formLayoutsPage()
	await pm.onFormLayoutsPage().submitUsingGridForm('test@test.com', 'Welcome1', 'Option 2')
	await pm.onFormLayoutsPage().submitInlineForm('John Smith', 'john@test.com', true)

	await pm.navigateTo().datePickerPage()
	await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(5)
	await pm.onDatepickerPage().selectDatePickerWithRangeFromToday(2, 5)
})
