import { Page, Locator } from '@playwright/test'

export class NavigationPage {
	readonly page: Page
	readonly formLayoutMenuItem: Locator
	readonly datePickerMenuItem: Locator
	readonly smartTableMenuItem: Locator
	readonly tooltipMenuItem: Locator
	readonly toastrMenuItem: Locator

	constructor(page: Page) {
		this.page = page
		this.formLayoutMenuItem = page.getByText('Form Layouts')
		this.datePickerMenuItem = page.getByText('DatePicker')
		this.smartTableMenuItem = page.getByText('Smart Table')
		this.tooltipMenuItem = page.getByText('Tooltip')
		this.toastrMenuItem = page.getByText('Toastr')
	}

	async formLayoutsPage() {
		await this.selectGroupMenuItem('Forms')
		await this.formLayoutMenuItem.click()
	}

	async datePickerPage() {
		await this.selectGroupMenuItem('Forms')
		await this.datePickerMenuItem.click()
	}

	async smartTablePage() {
		await this.selectGroupMenuItem('Tables & Data')
		await this.smartTableMenuItem.click()
	}

	async tooltipPage() {
		await this.selectGroupMenuItem('Modal & Overlays')
		await this.tooltipMenuItem.click()
	}

	async toastrPage() {
		await this.selectGroupMenuItem('Modal & Overlays')
		await this.toastrMenuItem.click()
	}

	private async selectGroupMenuItem(groupItemTitle: string) {
		const groupMenuItem = this.page.getByTitle(groupItemTitle)
		const expandedState = await groupMenuItem.getAttribute('aria-expanded')
		if (expandedState == 'false') {
			await groupMenuItem.click()
		}
	}
}
