import { Page } from 'puppeteer'

export const login = async (page: Page, user: string, password: string): Promise<Page> => {
    try {
        await page.click('button.btnTrigger')
        await page.type('#j_username', user)
        await page.type('#j_password', password)
        await page.click('button[type=submit]')
        await page.waitFor('a.btnContinue')
        return page
    } catch (error) {
        console.error(`error login. ${error}`)
        throw error
    }
}
