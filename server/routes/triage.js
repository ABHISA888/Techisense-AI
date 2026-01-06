const express = require('express');
const router = express.Router();
const asyncHandler = require('../middleware/asyncHandler');
const { triageTextToJSON } = require('../services/openrouter.service');
const { embedText } = require('../services/embedding.service');

// POST /api/triage
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { raw } = req.body;
    if (!raw) return res.status(400).json({ error: 'raw text required' });

    const structured = await triageTextToJSON(raw);
    const embedding = await embedText(JSON.stringify(structured));

    res.json({ ticket: structured, embedding });
  })
);

module.exports = router;
