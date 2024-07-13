function getRandomChar() {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{};:,.<>?/\\|`~";
    return chars[Math.floor(Math.random() * chars.length)];
  }
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
async function typeWithErrors(page, selector, text) {
    for (let char of text) {
      if (Math.random() < 0.069) {
        const errorChar = getRandomChar();
        await page.type(selector, errorChar);
        await sleep(100);
        await page.keyboard.press('Backspace');
        await sleep(100);
        await page.type(selector, char);
        await sleep(100);
      } else {
        await page.type(selector, char);
        await sleep(Math.random() * 200 + 100);
      }
    }
  }
  
  module.exports = { typeWithErrors };