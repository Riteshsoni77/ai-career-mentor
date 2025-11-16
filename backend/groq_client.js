const fetch = (...args) => import('node-fetch').then(mod => mod.default(...args));

const GROQ_API_KEY = process.env.GROQ_API_KEY;

async function generateGroqText(messages, { model = 'openai/gpt-oss-20b', maxTokens = 1500 } = {}) {
  if (!GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY not set in env');
  }

  const url = 'https://api.groq.com/openai/v1/chat/completions'; // Verify this URL
  
  const body = {
    messages: messages,
    model: model,
    temperature: 0.2,
    max_tokens: maxTokens,
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Groq API Error:", errorText);
    throw new Error(`Groq API request failed with status ${res.status}. Reason: ${errorText}`);
  }

  const json = await res.json();
  console.log("Groq Response:", json);

  const message = json.choices[0]?.message || null;

  if (!message || !message.content) {
    console.error("Invalid response structure from Groq:", json);
    throw new Error("Failed to extract content from Groq response.");
  }

  return { raw: message.content, meta: json };
}

module.exports = { generateGroqText };