const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = process.env.OPENROUTER_API_URL || 'https://api.openrouter.ai';

async function embedText(text) {
  if (!OPENROUTER_API_KEY) throw new Error('OPENROUTER_API_KEY missing');

  const payload = {
    model: process.env.OPENROUTER_EMBEDDING_MODEL || 'text-embedding-3-small',
    input: text,
  };

  const resp = await fetch(`${OPENROUTER_API_URL}/v1/embeddings`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await resp.json();
  const emb = data?.data?.[0]?.embedding;
  if (!emb) throw new Error('Embedding API returned no embedding');
  return emb;
}

module.exports = { embedText };