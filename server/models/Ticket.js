const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    steps: { type: [String], default: [] },
    expected: { type: String },
    actual: { type: String },
    severity: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'medium' },
    priority: { type: String, enum: ['P1', 'P2', 'P3'], default: 'P3' },
    labels: { type: [String], default: [] },
    embedding: { type: [Number], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Ticket', ticketSchema);
