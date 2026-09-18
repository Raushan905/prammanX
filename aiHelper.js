const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const GEMINI_MODELS = ['gemini-3.5-flash-lite', 'gemini-3.6-flash', 'gemini-3.8-flash', 'gemini-3.5-flash'];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function callGemini(modelName, imageBase64, promptText) {
  const model = genAI.getGenerativeModel({ model: modelName });

  const parts = [];
  if (imageBase64) {
    parts.push({ inlineData: { data: imageBase64, mimeType: 'image/jpeg' } });
  }
  parts.push({ text: promptText });

  const result = await model.generateContent(parts);
  return result.response.text();
}

async function callGroq(imageBase64, promptText) {
  let content;

  if (imageBase64) {
    content = [
      { type: 'text', text: promptText },
      { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${imageBase64}` } }
    ];
  } else {
    content = promptText;
  }

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      messages: [{ role: 'user', content }]
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ? data.error.message : 'Groq request failed');
  }

  let text = data.choices[0].message.content;
  text = text.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

  return text;
}

async function tryAllProviders(imageBase64, promptText) {
  const attempts = [
    { name: 'Groq (Llama-4-Scout)', fn: () => callGroq(imageBase64, promptText) },
    ...GEMINI_MODELS.map((m) => ({ name: m, fn: () => callGemini(m, imageBase64, promptText) }))
  ];

  let lastError;

  for (const attempt of attempts) {
    try {
      const result = await attempt.fn();
      return result;
    } catch (err) {
      lastError = err;
      console.log(`⚠️ ${attempt.name} failed, trying next... (${err.message.slice(0, 150)})`);
      continue;
    }
  }

  throw lastError;
}

async function generateWithFallback(imageBase64, promptText) {
  try {
    return await tryAllProviders(imageBase64, promptText);
  } catch (firstError) {
    console.log('⚠️ All providers failed on first pass, retrying once after delay...');
    await sleep(3000);
    try {
      return await tryAllProviders(imageBase64, promptText);
    } catch (secondError) {
      throw new Error('AI services are temporarily unavailable. Please try again in a moment.');
    }
  }
}

module.exports = { generateWithFallback };