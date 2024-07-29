const { replaceLine } = require('./replaceline');

const fs = require('fs').promises;


async function caculateSum(filePath) {
    const data = await fs.readFile(filePath, 'utf8');

    // Tách các dòng của file
    const lines = data.split('\n').filter(line => line.trim() !== '');

    // Khởi tạo biến tổng
    let totalSum = 0;

    // Lặp qua từng dòng
    for (const line of lines) {
      // Tách tên và số
      const parts = line.split(':');
      if (parts.length === 2) {
        // Lấy số và loại bỏ các khoảng trắng
        const number = parseFloat(parts[1].trim().replace(',', ''));
        // Kiểm tra nếu number là số hợp lệ thì cộng vào tổng
        if (!isNaN(number)) {
          totalSum += number;
        }
      }
    }
    // In ra tổng các số
    await replaceLine(filePath , lines.length , 'Total : ' + totalSum)
}
module.exports = { caculateSum }