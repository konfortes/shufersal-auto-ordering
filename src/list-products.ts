import { Product } from './product'
import { Page, ElementHandle } from 'puppeteer'

const getProduct = async (element: ElementHandle): Promise<Product> => {
    const titleElement = await element.$('div.middleContainer div.text strong')
    const titleVal = await (await titleElement?.getProperty('innerText'))?.jsonValue()

    const priceElement = await element.$('span.price span.number')
    const priceVal = await (await priceElement?.getProperty('innerText'))?.jsonValue()

    return { name: titleVal as string, price: priceVal as string }
}

export const listProducts = async (categoryPage: Page): Promise<Product[]> => {
    const productElements = await categoryPage.$$('div.miglog-prod-inStock')
    const products = await Promise.all(productElements.map(getProduct))

    return products
}
