const puppeteer = require('puppeteer');
const { ask } = require('./generateQuestion');
const { appendToFile } = require('./addtext');
const { randomLineFromFile } = require('./randomLineFromFile');
const { typeWithErrors } = require('./typing');
const { replaceLine } = require('./replaceline');
const { getText } = require('./getText');

async function automateMicrosoftReward({ headless = true, profile = 1 }) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    let browser;
    try {
      const userAgent = await getText('./data/useragent.txt', profile);
      browser = await puppeteer.launch({ headless, userDataDir: `./user_data/${profile}` });
      const page = await browser.newPage();
      await page.setUserAgent(userAgent)
      let points; // Khởi tạo biến points ở đầu hàm
      let user = 'null';

      await page.goto('https://rewards.bing.com/');
      await page.waitForSelector('#daily-sets');

      const childElements = await page.$$('#daily-sets > mee-card-group:nth-child(7) > div > *');
      await page.click('#dailypointColumnCalltoAction > span > ng-transclude');

      const [pointsDetail2] = await Promise.all([
        page.$eval('#userPointsBreakdown > div > div:nth-child(2) > div > div:nth-child(1) > div > div.pointsDetail > mee-rewards-user-points-details > div > div > div > div > p.pointsDetail.c-subheading-3.ng-binding', el => el.textContent)
      ]);

      await page.click('#modal-host > div:nth-child(2) > button');

      function calculateResult(str) {
        const [num1, num2] = str.split(' / ').map(Number);
        return (num2 - num1) / 3;
      }

      const pcSearch = calculateResult(pointsDetail2) + Math.floor(Math.random() * 7) - 3;      ;
      console.log(pcSearch);

      for (let element of childElements) {
        const newPagePromise = new Promise(resolve => browser.once('targetcreated', resolve));
        await element.click();
        const newPageTarget = await newPagePromise;
        const newPage = await newPageTarget.page();
        // Thực hiện các thao tác trên tab mới...
        await newPage.close();
      }

      for (let index = 0; index < pcSearch; index++) {
        await page.setUserAgent(userAgent)
        await page.goto('https://www.bing.com/?scope=web&cc=VN');
        await page.waitForSelector('#sb_form');

        try {
          const question = await ask();
          await typeWithErrors(page, '#sb_form', question);
          await page.keyboard.press('Enter');
          await page.waitForSelector('.b_algo');
          await appendToFile('./data/question.txt', question);
        } catch (error) {
          const question = await randomLineFromFile('./data/question.txt');
          await typeWithErrors(page, '#sb_form', question);
          await page.keyboard.press('Enter');
          await page.waitForSelector('.b_algo');
        }
      }
      await page.setUserAgent(userAgent)
      await page.goto('https://rewards.microsoft.com');

      const targetSelector = '#balanceToolTipDiv > p > mee-rewards-counter-animation > span';
      await page.waitForSelector(targetSelector);
      let lastContent = '';
      let unchangedTime = 0;
      const checkInterval = 100; // Kiểm tra mỗi 100ms

      const checkContent = async () => {
        const content = await page.$eval(targetSelector, el => el.textContent.trim());
        if (content === lastContent) {
          unchangedTime += checkInterval;
          if (unchangedTime >= 1000) {
            points = await page.$eval(targetSelector, el => el.textContent.trim());
            user = await page.$eval('#redirect_info_link', element => element.textContent);
            await replaceLine('./data/pointlog.txt', profile - 1, `${user.trim()} : ${points}`);
            clearInterval(intervalId);
            await browser.close();
          }
        } else {
          lastContent = content;
          unchangedTime = 0;
        }
      };

      const intervalId = setInterval(checkContent, checkInterval);
      break; // Nếu không gặp lỗi, thoát khỏi vòng lặp thử lại

    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);
      if (browser) {
        await browser.close();
      }
      if (attempt === 3) {
        console.error('All attempts failed. Exiting.');
      }
    }
  }
}

module.exports = { automateMicrosoftReward };
