const playwright = require('playwright')

const BASE_URL = 'https://github.com/topics/playwright'

    ;(async () => {
        // here goes the code
        const browser = await playwright.chromium.launch({ headless: true})
        // set the context
        const context = await browser.newContext()
        const page = await context.newPage({ bypassCSP: true})
        await page.setDefaultTimeout(30000)
        await page.setViewportSize({ width: 800, heigth: 600})
        await page.goto(BASE_URL)
    })().catch(error => {
        console.log(error)
        process.exit(1)
    })