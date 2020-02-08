import { ProductRequest } from './product'
import { Page, ElementHandle } from 'puppeteer'

async function filterAsync(arr: any[], callback: any) {
    const fail = Symbol()
    return (await Promise.all(arr.map(async (item: any) => ((await callback(item)) ? item : fail)))).filter(
        (i: any) => i !== fail,
    )
}

export const addToCart = async (page: Page, productRequests: ProductRequest[]): Promise<any> => {
    for await (const req of productRequests) {
        const allProductElements = await page.$$('div.miglog-prod-inStock')

        const selectedProductElement = await filterAsync(allProductElements, async (e: ElementHandle) => {
            const nameElement = await e.$('div.middleContainer div.text strong')
            const name = await (await nameElement?.getProperty('innerText'))?.jsonValue()

            return name == req.name
        })

        const foundProductElement = selectedProductElement[0]
        const productAddButton = await (foundProductElement as ElementHandle).$('div.addToCart button.js-add-to-cart')
        if (productAddButton) {
            await productAddButton.click()
            await page.waitFor(100000)
        }
    }
}
