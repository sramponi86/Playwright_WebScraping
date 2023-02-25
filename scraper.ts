const playwright = require('playwright')
const random_useragent = require('random-useragent')
const BASE_URL = 'https://github.com/topics/playwright'

    ;(async () => {
        // create agent
        const agent = random_useragent.getRandom()
        // setup browser
        const browser = await playwright.chromium.launch({ headless: true})
        // set the context
        const context = await browser.newContext({ userAgent: agent })
        const page = await context.newPage({ bypassCSP: true})
        await page.setDefaultTimeout(30000)
        await page.setViewportSize({ width: 800, height: 600})
        await page.goto(BASE_URL)

        // get data
        const repositories = await page.$$eval('article.border' , (repoCards) => {
            return repoCards.map((card) => {
                const [user, repo] = card.querySelectorAll('h3 a')

                const formatText = (element) => element && element.innerText.trim()

                return {
                    user: formatText(user),
                    repo: formatText(repo),
                    url: repo.href,

                }
            })
        })
        console.log(repositories)
        // store data

        console.log(agent)
        // close browser
        await browser.close()
    })().catch(error => {
        console.log(error)
        process.exit(1)
    })