import { Page } from '@playwright/test'

export class NavigationPageSimple {
	readonly page: Page

	constructor(page: Page) {
		this.page = page
	}

	async navigateToFormLayoutsPage() {
		await this.selectGroupMenuItem('Forms')
		await this.page.getByText('Form Layouts').click()
	}

	async navigateToDatePickerPage() {
		await this.selectGroupMenuItem('Forms')
		await this.page.getByText('DatePicker').click()
	}

	async navigateToSmartTablePage() {
		await this.selectGroupMenuItem('Tables & Data')
		await this.page.getByText('Smart Table').click()
	}

	async navigateToTooltipPage() {
		await this.selectGroupMenuItem('Modal & Overlays')
		await this.page.getByText('Tooltip').click()
	}

	async navigateToToastrPage() {
		await this.selectGroupMenuItem('Modal & Overlays')
		await this.page.getByText('Toastr').click()
	}

	private async selectGroupMenuItem(groupItemTitle: string) {
		const groupMenuItem = this.page.getByTitle(groupItemTitle)
		const expandedState = await groupMenuItem.getAttribute('aria-expanded')
		if (expandedState == 'false') {
			await groupMenuItem.click()
		}
	}
}
