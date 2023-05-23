const express = require('express');
const router = express.Router();
const Reaction = require('../models/Reaction');

// POST a new reaction to a thought
router.post('/reactions', async (req, res) => {
  try {
    const reaction = await Reaction.create(req.body);
    res.json(reaction);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE a reaction by ID
router.delete('/reactions/:id', async (req, res) => {
  try {
    const reaction = await Reaction.findByIdAndDelete(req.params.id);
    if (!reaction) {
      return res.status(404).json({ error: 'Reaction not found' });
    }
    res.json(reaction);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
