import { Category } from './category'
import { Product } from './product'
import { Page, ElementHandle } from 'puppeteer'
import { navigateCategory } from './navigate-category'

const getProduct = async (element: ElementHandle): Promise<Product> => {
    const titleElement = await element.$('div.middleContainer div.text strong')
    const titleVal = await (await titleElement?.getProperty('innerText'))?.jsonValue()

    const priceElement = await element.$('span.price span.number')
    const priceVal = await (await priceElement?.getProperty('innerText'))?.jsonValue()

    return { Name: titleVal as string, Price: priceVal as string }
}

export const listProducts = async (page: Page, category: Category): Promise<Product[]> => {
    const categoryPage: Page = await navigateCategory(page, category)

    const productElements = await categoryPage.$$('div.miglog-prod-inStock')
    const products = await Promise.all(productElements.map(getProduct))

    return products
}
