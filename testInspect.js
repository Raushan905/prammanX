const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios');

// Yahan test karne wali image ka naam likho (test1.jpg.jpeg ya test2.jpg.jpeg)
const imageToTest = 'uploads/test1.jpg.jpeg';

async function testInspect() {
  try {
    const form = new FormData();
    form.append('image', fs.createReadStream(imageToTest));

    console.log(`🔍 Testing image: ${imageToTest}\n`);

    const response = await axios.post('http://localhost:5000/api/inspect', form, {
      headers: form.getHeaders()
    });

    console.log('✅ Result:\n', JSON.stringify(response.data, null, 2));
  } catch (err) {
    console.error('❌ Error:', err.response ? err.response.data : err.message);
  }
}

testInspect();