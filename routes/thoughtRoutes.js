const express = require('express');
const router = express.Router();
const Thought = require('../models/Thought');
const User = require('../models/user');

// GET all thoughts
router.get('/thoughts', async (req, res) => {
    try {
      const thoughts = await Thought.find().sort({ createdAt: -1 });
      const formattedThoughts = thoughts.map((thought) => ({
        id: thought._id,
        thoughtText: thought.thoughtText,
        username: thought.username,
        createdAt: thought.createdAt.toISOString(), // Format timestamp as ISO string
        reactions: thought.reactions
      }));
      res.json(formattedThoughts);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // GET a thought by ID
  router.get('/thoughts/:id', async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.id);
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      const formattedThought = {
        id: thought._id,
        thoughtText: thought.thoughtText,
        username: thought.username,
        createdAt: thought.createdAt.toISOString(), // Format timestamp as ISO string
        reactions: thought.reactions
      };
      res.json(formattedThought);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });

// POST a new thought
router.post('/thoughts', async (req, res) => {
    try {
      const thought = await Thought.create(req.body);
  
      // Update the corresponding user's thoughts array by username
      const user = await User.findOneAndUpdate(
        { username: req.body.username }, // Find the user by their username
        { $push: { thoughts: thought._id } }, // Add the thought's reference to the user's thoughts array
        { new: true }
      ).populate('thoughts'); // Populate the thoughts array with the entire thought object
  
      res.json({ thought, user });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });

// PUT update a thought by ID
router.put('/thoughts/:id', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    res.json(thought);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE a thought by ID
router.delete('/thoughts/:id', async (req, res) => {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.id);
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.json(thought);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  module.exports = router;
