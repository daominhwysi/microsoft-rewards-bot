const fs = require('fs').promises;

async function replaceLine(filePath, lineNumber, newText) {
    try {
        // Đọc nội dung của file
        const data = await fs.readFile(filePath, 'utf-8');
        let lines = data.split('\n');
        
        // Nếu lineNumber lớn hơn độ dài hiện tại của mảng lines, thêm các dòng trắng cho đến lineNumber
        while (lineNumber >= lines.length) {
            lines.push(''); // Thêm dòng trắng
        }
        
        // Chỉnh sửa dòng lineNumber
        lines[lineNumber] = newText;
        
        // Ghi lại nội dung đã thay đổi vào file
        await fs.writeFile(filePath, lines.join('\n'), 'utf-8');
        console.log('Đã chỉnh sửa dòng thành công.');
    } catch (error) {
        console.error('Lỗi:', error.message);
    }
}

module.exports = { replaceLine };
