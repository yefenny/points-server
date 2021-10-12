const express = require('express');
const { transactions } = require('../store');
const pointsRouter = express.Router();

pointsRouter.route('/spend/').post((req, res, next) => {
  let { points } = req.body;

  if (!points) {
    return res.status(400).json({ error: 'Points field is required' });
  }
  if (typeof points !== 'number') {
    return res.status(400).json({ error: 'Points should be a number' });
  }
  let sortedTransactions = transactions.sort(
    (a, b) => a.timestamp - b.timestamp
  );
  let spend = [];
  sortedTransactions.forEach((obj) => {
    let toSubstract = 0;
    if (points > 0) {
      if (obj.points - points <= 0) {
        toSubstract = obj.points;
      } else {
        toSubstract = points;
      }
      let found = spend.find((oldObj) => oldObj.payer === obj.payer);
      if (found) found.points += -toSubstract;
      else spend.push({ payer: obj.payer, points: -toSubstract });
      points -= toSubstract;
    }
  });
  spend.forEach((obj) => {
    transactions.push({
      payer: obj.payer,
      points: obj.points,
      timestamp: new Date()
    });
  });
  res.send(spend);
});

pointsRouter.route('/balance/').get((req, res, next) => {
  let balance = {};
  transactions.forEach((obj) => {
    balance[obj.payer]
      ? (balance[obj.payer] += obj.points)
      : (balance[obj.payer] = obj.points);
  });
  res.send(balance);
});

module.exports = pointsRouter;
