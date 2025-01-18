import { test, expect } from '@playwright/test'

test('Drag and Drop with iFrames', async ({ page }) => {
	await page.goto('https://www.globalsqa.com/demo-site/draganddrop/')

	const frame = page.frameLocator('[rel-title="Photo Manager"] iframe')
	await frame.locator('li', { hasText: 'High Tatras 2' }).dragTo(frame.locator('#trash'))

	// More precise control
	await frame.locator('li', { hasText: 'High Tatras 4' }).hover() // hover over the element
	await page.mouse.down() // click the mouse above the element
	await frame.locator('#trash').hover() // move the mouse into the direction where we want to drop our element
	await page.mouse.up() // release the mouse

	await expect(frame.locator('#trash li h5')).toHaveText(['High Tatras 2', 'High Tatras 4'])
})
