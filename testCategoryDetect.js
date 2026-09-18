require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const imagePath = 'uploads/test-label.jpg.jpeg';

async function detectCategory() {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash' });

    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');

    const result = await model.generateContent([
      {
        inlineData: {
          data: base64Image,
          mimeType: 'image/jpeg'
        }
      },
      {
        text: 'Is image mein kya product hai? Sirf ek category naam do in options mein se: Packaged Food, Cosmetic, Electronics/Appliances, Textile, Household Chemicals. Sirf category ka naam likho, kuch aur nahi.'
      }
    ]);

    console.log('✅ Detected Category:', result.response.text());
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

detectCategory();