import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:4200/')
	await page.getByText('Forms').click()
	await page.getByText('Form Layouts').click()
})

test('Locator syntax rules', async ({ page }) => {
	// by Tag name
	await page.locator('input').first().click()

	// by ID
	page.locator('#inputEmail1')

	// by Class value
	page.locator('.shape-rectangle')

	// by Attribute
	page.locator('[placeholder="Email"]')

	// by Class value (full)
	page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

	// combine different selectors: Do NOT put space between them
	page.locator('input[placeholder="Email"].shape-rectangle')

	// by XPath (NOT recommended)
	page.locator('//*[@id="inputEmail1"]')

	// by partial text match
	page.locator(':text=("Using")')

	// by exact text match
	page.locator(':text-is=("Using the Grid")')
})

test('User Facing Locators', async ({ page }) => {
	await page.getByRole('textbox', { name: 'Email' }).first().click()
	await page.getByRole('button', { name: 'Sign in' }).first().click()

	await page.getByLabel('Email').first().click()

	await page.getByPlaceholder('Jane Doe').click()

	await page.getByText('Using the Grid').click()

	await page.getByTitle('IoT Dashboard').click()

	// by data-testid
	await page.getByTestId('SignIn').click()
})

test('Locating child elements', async ({ page }) => {
	await page.locator('nb-card nb-radio :text-is("Option 1")').click()
	await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

	await page.locator('nb-card').getByRole('button', { name: 'Sign in' }).first().click()

	await page.locator('nb-card').nth(3).getByRole('button').click()
})

test('Locating parent elements', async ({ page }) => {
	await page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: 'Email' }).click()

	await page.locator('nb-card', { has: page.locator('#inputEmail1') }).getByRole('textbox', { name: 'Email' }).click()

	await page.locator('nb-card').filter({ hasText: 'Basic form' }).click()

	await page.locator('nb-card').filter({ has: page.locator('.status-danger') }).getByRole('textbox', { name: 'Password' }).click()

	// level up: '..'
	await page.locator('nb-card').locator('..').click()
})

test('Reusing the locators', async ({ page }) => {
	const basicForm = page.locator('nb-card').filter({ hasText: 'Basic form' })
	const emailField = basicForm.getByRole('textbox', { name: 'Email' })

	await emailField.fill('test@test.com')
	await basicForm.getByRole('textbox', { name: 'Password' }).fill('Welcome123')
	await basicForm.locator('nb-checkbox').click()
	await basicForm.getByRole('button').click()

	await expect(emailField).toHaveValue('test@test.com')
})

test('Extracting values', async ({ page }) => {
	// single text value
	const basicForm = page.locator('nb-card').filter({ hasText: 'Basic form' })
	const buttonText = await basicForm.locator('button').textContent()
	expect(buttonText).toEqual('Submit')

	// all text values
	const allRadioButtonLabels = await page.locator('nb-radio').allTextContents()
	expect(allRadioButtonLabels).toContain('Option 1')
	expect(allRadioButtonLabels).toContain('Option 2')
	expect(allRadioButtonLabels).toContain('Disabled Option')
	expect(allRadioButtonLabels).toEqual(['Option 1', 'Option 2', 'Disabled Option'])

	// input value
	const emailField = basicForm.getByRole('textbox', { name: 'Email' })
	await emailField.fill('test@test.com')
	const emailValue = await emailField.inputValue()
	expect(emailValue).toEqual('test@test.com')

	// attibute value
	const placeHolderValue = await emailField.getAttribute('placeholder')
	expect(placeHolderValue).toEqual('Email')
})

test('Assertions', async ({ page }) => {
	const basicFormButton = page.locator('nb-card').filter({ hasText: 'Basic form' }).locator('button')

	// Generic assertion
	const text = await basicFormButton.textContent()
	expect(text).toEqual('Submit')

	// Locator assertion
	await expect(basicFormButton).toHaveText('Submit')

	// Soft assertion
	await expect.soft(basicFormButton).toHaveText('Submit')
	await basicFormButton.click()
})
