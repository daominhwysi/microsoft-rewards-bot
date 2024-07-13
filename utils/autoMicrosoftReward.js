const puppeteer = require('puppeteer');
const { ask } = require('./generateQuestion');
const { appendToFile } = require('./addtext');
const { randomLineFromFile } = require('./getText');
const { typeWithErrors } = require('./typing');
const { replaceLine } = require('./replaceline');

async function automateMicrosoftReward({ headless = true, profile = 1 }) {
  const browser = await puppeteer.launch({ headless, userDataDir: `./user_data/${profile}` });
  const page = await browser.newPage();
  let points; // Khởi tạo biến points ở đầu hàm

  try {
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

    const pcSearch = calculateResult(pointsDetail2);

    for (let element of childElements) {
      const newPagePromise = new Promise(resolve => browser.once('targetcreated', resolve));
      await element.click();
      const newPageTarget = await newPagePromise;
      const newPage = await newPageTarget.page();
      // Thực hiện các thao tác trên tab mới...
      await newPage.close();
    }
    
    for (let index = 0; index < pcSearch; index++) {
      await page.goto('https://www.bing.com/');
      await page.waitForSelector('#id_rc');
      points = await page.$eval('#id_rc', element => element.textContent);

      try {
        const question = await ask();
        await typeWithErrors(page, '#sb_form', question);
        await page.keyboard.press('Enter');
        await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 50000 });
        appendToFile('./data.txt', question);
      } catch (error) {
        const question = await randomLineFromFile('./data.txt');
        await typeWithErrors(page, '#sb_form', question);
        await page.keyboard.press('Enter');
        await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 80000 });
      }
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Kiểm tra xem points đã được khởi tạo trước khi sử dụng
    if (points) {
      await replaceLine('./pointlog.txt', profile - 1, points);
    }
    await browser.close();
  }
}

module.exports = { automateMicrosoftReward };
