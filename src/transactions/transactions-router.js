const express = require('express');
const { transactions } = require('../store');
const transactionsRouter = express.Router();

transactionsRouter.route('/add').post((req, res, next) => {
  const { payer, points, timestamp } = req.body;

  const result = {
    payer,
    points,
    timestamp: new Date(timestamp)
  };
  for (const [key, value] of Object.entries(result)) {
    if (!value) return res.status(400).json({ error: `${key} is required` });
  }
  if (typeof payer !== 'string') {
    return res.status(400).json({ error: 'Invalid type of payer' });
  }
  if (typeof points !== 'number') {
    return res.status(400).json({ error: 'Points should be a number' });
  }
  if (!new Date(timestamp).getTime() > 0) {
    return res.status(400).json({ error: 'Invalid type of timestamp' });
  }

  transactions.push(result);

  res.status(201).end();
});

module.exports = transactionsRouter;
