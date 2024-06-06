const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/signupdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Define a User schema
const userSchema = new mongoose.Schema({
  email: String,
  confirmEmail: String,
  password: String,
  name: String,
  dob: String,
  gender: String,
});

const User = mongoose.model('User', userSchema);

// Define the /api/signup endpoint
app.post('/api/signup', async (req, res) => {
  const { email, confirmEmail, password, name, dob, gender } = req.body;

  // Create a new user
  const newUser = new User({
    email,
    confirmEmail,
    password,
    name,
    dob,
    gender,
  });

  try {
    // Save the user to the database
    await newUser.save();
    res.status(201).send({ message: 'User signed up successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error signing up user', error });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
