const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios');

// Yahan un images ke naam daalo jo tumhare uploads folder mein hain
// (ek hi product ke alag-alag angles wali photos)
const imagesToTest = [
  'uploads/test1.jpg.jpeg',
  'uploads/test2.jpg.jpeg'
];

async function testMultiInspect() {
  try {
    const form = new FormData();

    imagesToTest.forEach((imgPath) => {
      form.append('images', fs.createReadStream(imgPath));
    });

    console.log(`🔍 Testing ${imagesToTest.length} images together...\n`);

    const response = await axios.post('http://localhost:5000/api/inspect-multi', form, {
      headers: form.getHeaders()
    });

    console.log('✅ Combined Result:\n', JSON.stringify(response.data, null, 2));
  } catch (err) {
    console.error('❌ Error:', err.response ? err.response.data : err.message);
  }
}

testMultiInspect();