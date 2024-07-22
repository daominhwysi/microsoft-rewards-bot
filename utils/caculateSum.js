const fs = require('fs').promises;


async function caculateSum(filePath) {
    const data = await fs.readFile(filePath, 'utf8');

    // Tách nội dung thành từng dòng
    const lines = data.split('\n');
    let total = 0;

    // Tính tổng các số
    const updatedLines = lines.map(line => {
        // Tìm phần số trong chuỗi
        const match = line.match(/:(\d+)$/);
        if (match) {
            const number = parseInt(match[1], 10);
            total += number;
        }
        return line;
    });

    // Thêm dòng tổng vào cuối file
    updatedLines.push(`Total : ${total}`);

    // Ghi lại file với dòng tổng
    await fs.writeFile(filePath, updatedLines.join('\n'), 'utf8');
}
module.exports = { caculateSum }