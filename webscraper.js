const puppeteer = require('puppeteer');

module.exports = {
    test_func: async function() {

        const browser = await puppeteer.launch();

        const page = await browser.newPage();
        await page.goto('https://www.impfsuche.de/protect/homek');

        const xpath = await page.$x("/html/body/div[3]/table/tbody");
        let text = await page.evaluate(h1 => h1.textContent, xpath[0]);
        console.log(text)
        console.log(typeof text)

        await browser.close();

        return text;
    }
}