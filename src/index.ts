import { addToCart } from './add-to-cart'
require('dotenv').config()
import { login } from './login'
import { navigateCategory } from './navigate-category'
import { listProducts } from './list-products'
import { Category } from './product'
import { default as puppeteer, Browser } from 'puppeteer'

const ADDRESS = 'https://www.shufersal.co.il/online/'
const DEBUG = process.env.NODE_ENV == 'development'

const user = process.env.USER || ''
const password = process.env.PASSWORD || ''
;(async (): Promise<any> => {
    const browser: Browser = await puppeteer.launch({ headless: DEBUG })
    const page = await browser.newPage()
    await page.setViewport({ width: 1366, height: 768 })
    await page.goto(ADDRESS)

    try {
        const afterLoginPage = await login(page, user, password)

        await afterLoginPage.click('a.btnContinue')
        await afterLoginPage.waitFor('#secondMenu1')

        const fruitsPage = await navigateCategory(afterLoginPage, Category.Fruits)

        const products = await listProducts(fruitsPage)
        console.log(products)

        await addToCart(fruitsPage, [{ name: 'בננה' }])
    } catch (error) {
        console.error(error)
    } finally {
        browser.close()
    }
})()
