const Tesseract = require('tesseract.js');

const imagePath = 'uploads/test-label.jpg.jpeg';

Tesseract.recognize(imagePath, 'eng')
  .then((result) => {
    console.log('✅ Extracted Text:\n', result.data.text);
  })
  .catch((err) => {
    console.error('❌ OCR Error:', err);
  });