const express = require('express');
const puppeteer = require('puppeteer');

const server = express();

server.get('/', async (request, response) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto('https://marketplace.axieinfinity.com/axie');
    
    
    
    // let links = await page.$$(".m-8.cursor-pointer > a")[0].getAttribute('href')
    const data = await page.evaluate(() => {
        const main = document.querySelector("#__next > div.h-screen > div.flex.flex-column > div.flex-1.overflow-y-auto.px-8.py-12.md\\:px-32.md\\:py-24 > div > div > div > div.flex.mt-16.flex-wrap.justify-center")
        let link = [];
        let i = 0;
        main.childNodes.forEach(function(div) {
            link[i] = div.firstElementChild.getAttribute('href')
        })
        return link;

    })
    await browser.close();
    response.send({total: data});
});
server.listen('3000', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto('https://marketplace.axieinfinity.com/axie');
    // let links = await page.$$(".m-8.cursor-pointer > a")[0].getAttribute('href')
    const data = await page.evaluate(() => Array.from(
        document.querySelectorAll('.m-8.cursor-pointer > a'),
        a => a
    ))
    await browser.close();
    console.log(data)
});
(async () => {
  
})();
