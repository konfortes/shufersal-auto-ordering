import { Page } from 'puppeteer'

export enum Category {
    FruitsAndVegetables = 'פירות, ירקות ופיצוחים',
}

export const navigateCategory = async (page: Page, category: Category): Promise<Page> => {
    const categoryAnchor = await page.$x(`//a[contains(text(), '${category}')]`)

    if (categoryAnchor.length > 0) {
        await categoryAnchor[0].click()
    } else {
        throw new Error(`Category ${category} not found`)
    }

    await page.waitFor('div.gridCart')
    return page
}
