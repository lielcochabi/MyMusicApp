import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';
import querystring from 'querystring';


// MongoDB connection URI
const uriUser =mongoose.createConnection("mongodb+srv://liel:URH3JsFd39aeS9d@users.bn7mipr.mongodb.net/MyMusicApp?retryWrites=true&w=majority");
const uriPlaylist =mongoose.createConnection ("mongodb+srv://liel:URH3JsFd39aeS9d@playlists.bn7mipr.mongodb.net/MyMusicApp?retryWrites=true&w=majority");

// Spotify API credentials
const CLIENT_ID = '63df0d7b18364e369c2b704ebde82427';
const CLIENT_SECRET = '58d8dea6569448ccb3bfda430fe9d99d'; 

// Create an Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// // Connect to MongoDB
// Define what will be in the db platform
const userSchema = new mongoose.Schema({
  email: String,
  confirmEmail: String,
  password: String,
  name: String,
  dob: String,
  gender: String,
});

const playlistSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  playlists:[{
  name: String,
  songs: [{
    songId: String,
    songName: String,
    artistNames:[String],
    imageUrl:String
  }]
  }]
});
const User = uriUser.model('User', userSchema);
const Playlist = uriPlaylist.model('Playlist', playlistSchema);
// Define the /api/signup endpoint
app.post('/api/signup', async (req, res) => {
  const { email, confirmEmail, password, name, dob, gender } = req.body;

  // Create default playlists
  const defaultPlaylists = [
    { name: 'Top 50', songs: [] },
    { name: 'Favorites', songs: [] }
  ];

  // Create a new user document
  const newUser = new User({
    email,
    confirmEmail,
    password,
    name,
    dob,
    gender,
  });
  const newPlaylist = new Playlist({
    userId: newUser._id,
    playlists: defaultPlaylists,
  });
  try {
    // Save the user to the database
    const savedUser = await newUser.save();
    const savedPlaylist = await newPlaylist.save();
    res.status(201).send(savedUser);
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).send({ message: 'Error signing up user', error });
  }
});

// Define the /api/login endpoint for user login
app.post('/api/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name, password });
    if (!user) {
      return res.status(401).send({ message: 'Invalid username or password' });
    }

    res.status(200).send(user);
  } catch (error) {
    console.error('Error logging in', error);
    res.status(500).send({ message: 'Error logging in', error });
  }
});

// Define the /api/user/:userId/playlists endpoint to get user playlists
app.get('/api/user/:userId/playlists', async (req, res) => {
  const { userId } = req.params;

  try {
    const userPlaylists = await Playlist.find({ userId });
    if (!userPlaylists || userPlaylists.length === 0) {
      return res.status(404).send({ message: 'User playlists not found' });
    }

    // Extract playlists array from each document
    const playlists = userPlaylists.map(doc => doc.playlists).flat();
    res.status(200).send(playlists);
  } catch (error) {
    console.error('Error retrieving playlists:', error);
    res.status(500).send({ message: 'Error retrieving playlists', error });
  }
});


// Define the /api/user/:userId/playlists/:playlistName/songs endpoint to add a song to a playlist
app.post('/api/user/:userId/playlists/:playlistName/songs', async (req, res) => {
  const { userId, playlistName } = req.params;
  const { song } = req.body;

  try {
    const user = await Playlist.findOne( { userId } );
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    const playlist = user.playlists.find(pl => pl.name === playlistName);
    if (!playlist) {
      return res.status(404).send({ message: 'Playlist not found' });
    }
    playlist.songs.push({
      songId: song.id,
      songName: song.name,
      artistNames: song.artists.map(artist => artist.name),
      imageUrl: song.album.images[0]?.url || ''
    });
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    console.error('Error adding song to playlist:', error);
    res.status(500).send({ message: 'Error adding song to playlist', error });
  }
});

app.post('/api/user/:userId/playlists', async (req, res) => {
  const { userId } = req.params;
  const { name} = req.body;

  try {
    const user = await Playlist.findOne( { userId } );
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    const playlistTest = user.playlists.find(pl => pl.name === name);
    if (playlistTest) {
      return res.status(404).send({ message: 'Playlist already exist' });
    }
    user.playlists.push({     
      name: name,
      songs: []     
    });
    await user.save();
    res.status(200).send(user.playlists.find(pl => pl.name === name));
  } catch (error) {
    console.error('Error adding playlist:', error);
    res.status(500).send({ message: 'Error adding playlist', error });
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
















