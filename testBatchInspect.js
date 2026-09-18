const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios');

async function testBatch() {
  try {
    const form = new FormData();
    form.append('images', fs.createReadStream('uploads/test1.jpg.jpeg'));
    form.append('images', fs.createReadStream('uploads/test2.jpg.jpeg'));

    const response = await axios.post('http://localhost:5000/api/inspect-batch', form, {
      headers: form.getHeaders()
    });

    console.log('✅ Batch Result:\n', JSON.stringify(response.data, null, 2));
  } catch (err) {
    console.error('❌ Error:', err.response ? err.response.data : err.message);
  }
}

testBatch();