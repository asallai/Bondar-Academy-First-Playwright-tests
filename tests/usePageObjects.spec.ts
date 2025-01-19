import { test, expect } from '@playwright/test'
import { NavigationPage } from '../page-objects/navigationPage'

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:4200/')
})

test('Navigate to Form page', async ({ page }) => {
	const navigationPage = new NavigationPage(page)
	await navigationPage.navigateToFormLayoutsPage()
	await navigationPage.navigateToDatePickerPage()
	await navigationPage.navigateToSmartTablePage()
	await navigationPage.navigateToToastrPage()
	await navigationPage.navigateToTooltipPage()
})
