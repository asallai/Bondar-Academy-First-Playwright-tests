import { Page, expect } from '@playwright/test'

export class DatepickerPage {
	private readonly page: Page

	constructor(page: Page) {
		this.page = page
	}

	async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number) {
		const calendarInputField = this.page.getByPlaceholder('Form Picker')
		await calendarInputField.click()
		const dateToAssert = await this.selectDateInTheCalendar(numberOfDaysFromToday)
		await expect(calendarInputField).toHaveValue(dateToAssert)
	}

	async selectDatePickerWithRangeFromToday(startDayFromToday: number, endDayFromToday: number) {
		const calendarInputField = this.page.getByPlaceholder('Range Picker')
		await calendarInputField.click()
		const startDateToAssert = await this.selectDateInTheCalendar(startDayFromToday)
		const endDateToAssert = await this.selectDateInTheCalendar(endDayFromToday)
		const dateToAssert = `${startDateToAssert} - ${endDateToAssert}`
		await expect(calendarInputField).toHaveValue(dateToAssert)
	}

	private async selectDateInTheCalendar(numberOfDaysFromToday: number) {
		let date = new Date()
		date.setDate(date.getDate() + numberOfDaysFromToday)
		let day = date.getDate().toString(2)
		day = date.toLocaleString('EN-US', { day: '2-digit' })

		const monthShort = date.toLocaleString('EN-US', { month: 'short' })
		const monthLong = date.toLocaleString('EN-US', { month: 'long' })
		const year = date.getFullYear()
		const dateToAssert = `${monthShort} ${day}, ${year}`

		let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
		const expectedMonthAndYear = ` ${monthLong} ${year} `

		while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
			await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
			calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
		}

		await this.page.locator('.day-cell.ng-star-inserted').getByText(day, { exact: true }).click()
		return dateToAssert
	}
}
