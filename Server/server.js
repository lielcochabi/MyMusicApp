const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const querystring = require('querystring');

// MongoDB connection URI
const uri = "mongodb+srv://femaledynamics1:Dolev132%40@users.4vcfgvu.mongodb.net/MyMusicApp?retryWrites=true&w=majority"; // Replace with your MongoDB URI if using MongoDB Atlas

// Spotify API credentials
const CLIENT_ID = '63df0d7b18364e369c2b704ebde82427'; // Replace with your Client ID
const CLIENT_SECRET = '58d8dea6569448ccb3bfda430fe9d99d'; // Replace with your Client Secret

// Create an Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

// Define a schema and model for the user data
const userSchema = new mongoose.Schema({
  email: String,
  confirmEmail: String,
  password: String,
  name: String,
  dob: String,
  gender: String,
});

const User = mongoose.model('User', userSchema);

// Define a schema and model for the songs
const songSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  songId: String,
  songName: String,
  artistNames: [String],
});

const Song = mongoose.model('Song', songSchema);

// Define the /api/signup endpoint
app.post('/api/signup', async (req, res) => {
  const { email, confirmEmail, password, name, dob, gender } = req.body;

  // Create a new user document
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
    const savedUser = await newUser.save();
    res.status(201).send(savedUser);
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).send({ message: 'Error signing up user', error });
  }
});

// Define the /api/user/songs endpoint to save a song to a user
app.post('/api/user/songs', async (req, res) => {
  const { userId, song } = req.body;

  const newSong = new Song({
    userId,
    songId: song.id,
    songName: song.name,
    artistNames: song.artists.map(artist => artist.name),
  });

  try {
    const savedSong = await newSong.save();
    res.status(201).send(savedSong);
  } catch (error) {
    console.error('Error saving song:', error);
    res.status(500).send({ message: 'Error saving song', error });
  }
});

// Define the /api/token endpoint to get an access token from Spotify
app.post('/api/token', async (req, res) => {
  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  try {
    const response = await axios.post(tokenUrl, querystring.stringify({ 
      grant_type: 'client_credentials',
      scope: 'streaming user-read-email user-read-private user-modify-playback-state user-read-playback-state user-library-read user-library-modify' // Required scopes
    }), {
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
