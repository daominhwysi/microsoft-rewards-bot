const fs = require('fs').promises;

async function checkLineInFile(filePath, lineNumber) {
    // Đọc nội dung của file
    const data = await fs.readFile(filePath, 'utf8');
    
    // Tách nội dung file thành các dòng
    const lines = data.split('\n');
    
    // Kiểm tra xem dòng có dữ liệu không (dòng có tồn tại và không trống)
    if (lineNumber < 1 || lineNumber > lines.length) {
        console.log('Dòng không tồn tại trong file.');
        return;
    }
    
    const line = lines[lineNumber - 1].trim();
    if (line) {
        console.log(`Dòng ${lineNumber} có dữ liệu: "${line}"`);
    } else {
        console.log(`Dòng ${lineNumber} không có dữ liệu.`);
    }
}

module.exports = checkLineInFile;
