const fs = require('fs').promises;

async function randomLineFromFile(filename) {
    try {
        // Đọc tất cả các dòng từ tệp văn bản
        const data = await fs.readFile(filename, 'utf8');
        const lines = data.split('\n').filter(Boolean);
        
        // Chọn ngẫu nhiên một dòng
        const randomIndex = Math.floor(Math.random() * lines.length);
        return lines[randomIndex];
    } catch (err) {
        console.error('Error reading file:', err);
        throw err; // Throwing the error for handling further up
    }
}
module.exports = { randomLineFromFile }