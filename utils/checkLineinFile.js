const fs = require('fs').promises;

/**
 * Kiểm tra xem một dòng trong file có dữ liệu hay không.
 * @param {string} filePath - Đường dẫn đến file .txt.
 * @param {number} lineNumber - Số dòng cần kiểm tra (bắt đầu từ 1).
 * @returns {Promise<void>} - Một Promise không có giá trị trả về.
 */
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
