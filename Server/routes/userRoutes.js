const express = require('express');
const { default: Home } = require('../../Client/src/components/Home.vue');
const { default: About } = require('../../Client/src/components/About.vue');
const {default: Playlists} = require('../../Client/src/components/Playlists.vue');
const {default: SignUpForm} = require('../../Client/src/components/SignUpForm.vue');
const router = express.Router();

// Sample data
const data = [
  { id: Home, name: 'Home' },
  { id: About, name: 'About' },
  { id: Playlists, name: 'Playlists' },
  { id: SignUpForm, name: 'SignUpForm' },
];

// Get all items
router.get('/items', (req, res) => {
  res.json(data);
});

// Get a single item by id
router.get('/items/:id', (req, res) => {
  const item = data.find(i => i.id == req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});

// Add a new item
router.post('/items', (req, res) => {
  const newItem = { id: data.length + 1, name: req.body.name };
  data.push(newItem);
  res.status(201).json(newItem);
});

module.exports = router;