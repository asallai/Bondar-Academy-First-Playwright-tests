import { Page } from '@playwright/test'
import { using } from 'rxjs'

export class FormLayoutsPage {
    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async submitUsingGridForm(email: string, password: string, optionText: string) {
        const usingTheGridEmailForm = this.page.locator('nb-card', { hasText: 'Using the Grid' })
        await usingTheGridEmailForm.getByRole('textbox', { name: 'Email' }).fill(email)
        await usingTheGridEmailForm.getByRole('textbox', { name: 'Password' }).fill(password)
        await usingTheGridEmailForm.getByRole('radio', { name: optionText }).check({ force: true })
        await usingTheGridEmailForm.getByRole('button', { name: 'Sign in' }).click()
    }

    async submitInlineForm(name: string, email: string, rememberMe: boolean) {
        const inlineForm = this.page.locator('nb-card', { hasText: 'Inline form' })
        await inlineForm.getByRole('textbox', { name: 'Jane Doe' }).fill(name)
        await inlineForm.getByRole('textbox', { name: 'Email' }).fill(email)
        if (rememberMe) {
            await inlineForm.getByRole('checkbox').check({ force: true })
        }
        await inlineForm.getByRole('button', { name: 'Submit' }).click()        
    }
}