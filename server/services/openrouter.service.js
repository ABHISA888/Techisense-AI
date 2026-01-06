const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = process.env.OPENROUTER_API_URL || 'https://api.openrouter.ai';

if (!OPENROUTER_API_KEY) {
  console.warn('OPENROUTER_API_KEY not set. LLM calls will fail until it is configured.');
}

async function triageTextToJSON(rawText) {
  if (!OPENROUTER_API_KEY) throw new Error('OPENROUTER_API_KEY missing');

  const prompt = `You are an assistant that converts messy bug reports into JSON only.\nReturn valid JSON with keys: title, description, steps (array), expected, actual, severity, labels.\nGiven the input delimited by triple backticks, return JSON only.\n\nBug:\n\`\`\`\n${rawText}\n\`\`\``;

  const payload = {
    model: process.env.OPENROUTER_MODEL || 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 700,
  };

  const resp = await fetch(`${OPENROUTER_API_URL}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await resp.json();
  const text = data?.choices?.[0]?.message?.content || data?.choices?.[0]?.text;
  if (!text) throw new Error('LLM returned empty response');

  try {
    const json = JSON.parse(text);
    return json;
  } catch (err) {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error('LLM returned non-JSON output for triage');
  }
}

module.exports = { triageTextToJSON };