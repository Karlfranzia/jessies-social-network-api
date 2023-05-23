const express = require('express');
const router = express.Router();
const User = require('../models/user');

// POST add a friend to a user's friend list
router.post('/friends/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const friendId = req.body.friendId;
    if (!friendId) {
      return res.status(400).json({ error: 'Missing friendId' });
    }

    user.friends.push(friendId);
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE remove a friend from a user's friend list
router.delete('/friends/:userId/:friendId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const friendId = req.params.friendId;
    if (!friendId) {
      return res.status(400).json({ error: 'Missing friendId' });
    }

    user.friends = user.friends.filter((friend) => friend.toString() !== friendId);
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
