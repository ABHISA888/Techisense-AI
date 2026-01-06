const express = require('express');
const router = express.Router();
const asyncHandler = require('../middleware/asyncHandler');
const { embedText } = require('../services/embedding.service');
const { findSimilarTickets } = require('../services/vectorSearch.service');

// POST /api/search
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { text, embedding } = req.body;
    const emb = embedding || (text ? await embedText(text) : null);
    if (!emb) return res.status(400).json({ error: 'text or embedding required' });

    const results = await findSimilarTickets(emb, 5);

    const topScore = results?.[0]?.score ?? 0;
    const threshold = parseFloat(process.env.DUPLICATE_SCORE_THRESHOLD || '2.0');

    res.json({ results, duplicate: topScore >= threshold, topScore, threshold });
  })
);

module.exports = router;
