import { Page } from 'puppeteer'
import { Category } from './category'

const fruitsAndVegetables = 'פירות, ירקות ופיצוחים'

// TODO: better name
const paths: { [key in Category]: string } = {
    fruits: 'A0405',
    vegetables: 'A0408',
}

const fruitsOrVegetablesPage = async (page: Page, category: Category): Promise<Page> => {
    const categoryAnchor = await page.$x(`//a[contains(text(), '${fruitsAndVegetables}')]`)

    if (categoryAnchor.length > 0) {
        await categoryAnchor[0].click()
    } else {
        throw new Error(`Could not navigate to fruits`)
    }

    await page.waitFor('div.gridCart')
    await page.click(`a[href*="${paths[category]}"]`)
    await page.waitFor('#changeView')
    await page.screenshot({ path: 'example.png' })
    return page
}

export const navigateCategory = async (page: Page, category: Category): Promise<Page> => {
    switch (category) {
        case Category.Fruits:
            await fruitsOrVegetablesPage(page, category)
            break
        case Category.Vegetables:
            await fruitsOrVegetablesPage(page, category)
            break
        default:
            throw new Error(`Category ${category} does not supported`)
    }
    return page
}
