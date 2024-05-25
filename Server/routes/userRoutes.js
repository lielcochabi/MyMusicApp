// userRoutes.js
const express = require('express');
const router = express.Router();

// Define route handlers
router.get('/', (req, res) => {
  res.send('Hello from user route!');
});

module.exports = router;
