const express = require('express');
const router = express.Router();
const asyncHandler = require('../middleware/asyncHandler');
const Ticket = require('../models/Ticket');
const { embedText } = require('../services/embedding.service');

// Create a ticket
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const ticket = req.body;
    if (!ticket || !ticket.title) return res.status(400).json({ error: 'title required' });

    if (!ticket.embedding || !Array.isArray(ticket.embedding) || ticket.embedding.length === 0) {
      ticket.embedding = await embedText(JSON.stringify(ticket));
    }

    const doc = await Ticket.create(ticket);
    res.status(201).json(doc);
  })
);

// Fetch all tickets
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const tickets = await Ticket.find().sort({ createdAt: -1 }).limit(500);
    res.json(tickets);
  })
);

// Patch ticket (partial update) - PATCH /api/tickets/:id
router.patch(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const patch = req.body;
    if (!patch || Object.keys(patch).length === 0) return res.status(400).json({ error: 'patch required' });

    // If updating content that affects embedding, regenerate it
    if (patch.title || patch.description || patch.steps) {
      patch.embedding = await embedText(JSON.stringify({ title: patch.title, description: patch.description, steps: patch.steps }));
    }

    const updated = await Ticket.findByIdAndUpdate(id, patch, { new: true });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  })
);

module.exports = router;
