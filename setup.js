const puppeteer = require('puppeteer');
const randomUseragent = require('random-useragent');
const { replaceLine } = require('./utils/replaceline');
const checkLineInFile = require('./utils/checkLineinFile');

(async () => {
  const user = 1;
  const userAgent = randomUseragent.getRandom();
  
  // Kiểm tra xem người dùng đã có trong tập tin chưa
  const isFirstTime = await checkLineInFile(user);
  
  // Nếu là lần đầu tiên, cập nhật tập tin
  if (isFirstTime) {
    await replaceLine('./data/useragent.txt', user, userAgent);
  }
  
  // Khởi chạy Puppeteer
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: './user_data/' + user,
    args: [`--user-agent=${userAgent}`] // Thiết lập User-Agent cho trình duyệt
  });
  
  const page = await browser.newPage();
  await page.goto('https://rewards.bing.com/');
})();
