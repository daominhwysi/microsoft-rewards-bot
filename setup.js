const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false, userDataDir: './user_data/5' });
  const page = await browser.newPage();
  await page.goto('https://rewards.bing.com/');

})();
