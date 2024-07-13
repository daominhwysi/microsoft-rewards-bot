const fs = require('fs').promises;

async function appendToFile(filePath, newContent) {
    try {
        // Đọc nội dung hiện tại của file
        const data = await fs.readFile(filePath, 'utf8');

        // Thêm nội dung mới trên dòng mới
        const updatedContent = data + '\n' + newContent;

        // Ghi lại nội dung đã được cập nhật vào file
        await fs.writeFile(filePath, updatedContent);

        // Đọc lại nội dung từ file để lọc và ghi lại
        const newData = await fs.readFile(filePath, 'utf8');
        const lines = newData.split('\n');
        const filteredLines = lines.filter(line => line.trim() !== '');
        const result = filteredLines.join('\n');

        // Ghi chuỗi đã lọc vào file
        await fs.writeFile(filePath, result, 'utf8');
    } catch (err) {
        console.error(err);
    }
}

module.exports = { appendToFile };
