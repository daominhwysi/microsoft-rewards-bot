const fs = require('fs').promises;

async function replaceLine(filePath, lineNumber, newText) {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        let lines = data.split('\n');
        
        
        while (lineNumber >= lines.length) {
            lines.push(''); // Thêm dòng trắng
        }
        
        lines[lineNumber] = newText;
        

        await fs.writeFile(filePath, lines.join('\n'), 'utf-8');

    } catch (error) {
        console.error('Lỗi:', error.message);
    }
}

module.exports = { replaceLine };
