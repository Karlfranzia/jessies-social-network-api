const express = require('express');
const db = require('./config/connection');
const userRoutes = require('./routes/userRoutes');
const thoughtRoutes = require('./routes/thoughtRoutes');
const reactionRoutes = require('./routes/reactionRoutes');
const friendRoutes = require('./routes/friendRoutes');


// Create Express application
const app = express();
const port = 3001;

// Set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());





app.use('/api', userRoutes);
app.use('/api', thoughtRoutes);
app.use('/api', reactionRoutes);
app.use('/api', friendRoutes);

db.once('open', () => {
  app.listen(port, () => {
    console.log(`API server running on port ${port}!`);
  });
});

