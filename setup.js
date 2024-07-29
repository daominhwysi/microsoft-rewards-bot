const puppeteer = require('puppeteer');
const randomUseragent = require('random-useragent');
const { replaceLine } = require('./utils/replaceline');
const checkLineInFile = require('./utils/checkLineinFile');
const { getText } = require('./utils/getText');

(async () => {
  const user = 1
  var userAgent = randomUseragent.getRandom();
  
  // Kiểm tra xem người dùng đã có trong tập tin chưa
  const isFirstTime = await checkLineInFile('./data/useragent.txt', user);
  
  // Nếu là lần đầu tiên, cập nhật tập tin
  if (isFirstTime) {
    await replaceLine('./data/useragent.txt', user, userAgent);
  } else {
    userAgent = await getText('./data/useragent.txt', user);
  }
  
  // Khởi chạy Puppeteer
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: './user_data/' + user,
  });
  
  const page = await browser.newPage();
  await page.setUserAgent(userAgent)
  await page.goto('https://rewards.bing.com/');
  await page.setUserAgent(userAgent)
  await page.goto('https://bing.com');
})();
