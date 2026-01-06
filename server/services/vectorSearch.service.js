const Ticket = require('../models/Ticket');

async function findSimilarTickets(embedding, k = 5) {
  if (!Array.isArray(embedding) || embedding.length === 0) throw new Error('Invalid embedding');

  const pipeline = [
    {
      $search: {
        index: process.env.ATLAS_VECTOR_INDEX || 'default',
        knnBeta: {
          vector: embedding,
          path: 'embedding',
          k,
        },
      },
    },
    {
      $project: {
        title: 1,
        description: 1,
        severity: 1,
        score: { $meta: 'searchScore' },
      },
    },
    { $limit: k },
  ];

  const results = await Ticket.aggregate(pipeline);
  return results;
}

module.exports = { findSimilarTickets };
