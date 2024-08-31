import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";
import querystring from "querystring";
import fs from "fs";
import path from "path";


import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const envFilePath = path.resolve(__dirname, "../env.json");
const envConfig = JSON.parse(fs.readFileSync(envFilePath, "utf-8"));


const {
  MONGODB_URI_USER,
  MONGODB_URI_PLAYLIST,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
} = envConfig;

if (
  !MONGODB_URI_USER ||
  !MONGODB_URI_PLAYLIST ||
  !SPOTIFY_CLIENT_ID ||
  !SPOTIFY_CLIENT_SECRET
) {
  console.error(
    "Required environment variables are missing. Please check your env.json file."
  );
  process.exit(1); 
}

const uriUser = mongoose.createConnection(MONGODB_URI_USER);
const uriPlaylist = mongoose.createConnection(MONGODB_URI_PLAYLIST);

const app = express();


app.use(cors());
app.use(bodyParser.json());

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
  playlists: [
    {
      name: String,
      songs: [
        {
          songId: String,
          songName: String,
          artistNames: [String],
          imageUrl: String,
        },
      ],
    },
  ],
});

const User = uriUser.model("User", userSchema);
const Playlist = uriPlaylist.model("Playlist", playlistSchema);

app.post("/api/signup", async (req, res) => {
  const { email, confirmEmail, password, name, dob, gender } = req.body;

  const defaultPlaylists = [
    { name: "Top 50", songs: [] },
    { name: "Favorites", songs: [] },
  ];

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
    const savedUser = await newUser.save();
    await newPlaylist.save();
    res.status(201).send(savedUser);
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send({ message: "Error signing up user", error });
  }
});

app.post("/api/login", async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name, password });
    if (!user) {
      return res.status(401).send({ message: "Invalid username or password" });
    }

    res.status(200).send(user);
  } catch (error) {
    console.error("Error logging in", error);
    res.status(500).send({ message: "Error logging in", error });
  }
});

app.get("/api/user/:userId/playlists", async (req, res) => {
  const { userId } = req.params;

  try {
    const userPlaylists = await Playlist.find({ userId });
    if (!userPlaylists || userPlaylists.length === 0) {
      return res.status(404).send({ message: "User playlists not found" });
    }

    const playlists = userPlaylists.map((doc) => doc.playlists).flat();
    res.status(200).send(playlists);
  } catch (error) {
    console.error("Error retrieving playlists:", error);
    res.status(500).send({ message: "Error retrieving playlists", error });
  }
});

app.post(
  "/api/user/:userId/playlists/:playlistName/songs",
  async (req, res) => {
    const { userId, playlistName } = req.params;
    const { song } = req.body;

    try {
      const user = await Playlist.findOne({ userId });
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      const selectedPlaylist = user.playlists.find(
        (playlist) => playlist.name === playlistName
      );
      if (!selectedPlaylist) {
        return res.status(404).send({ message: "Playlist not found" });
      }
      selectedPlaylist.songs.push({
        songId: song.id,
        songName: song.name,
        artistNames: song.artists.map((artist) => artist.name),
        imageUrl: song.album.images[0]?.url || "",
      });
      await user.save();
      res.status(200).send(user);
    } catch (error) {
      console.error("Error adding song to playlist:", error);
      res.status(500).send({ message: "Error adding song to playlist", error });
    }
  }
);

app.post("/api/user/:userId/playlists", async (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  try {
    const user = await Playlist.findOne({ userId });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const playlistTest = user.playlists.find(
      (playlist) => playlist.name === name
    );
    if (playlistTest) {
      return res.status(404).send({ message: "Playlist already exist" });
    }
    user.playlists.push({
      name: name,
      songs: [],
    });
    await user.save();
    res
      .status(200)
      .send(user.playlists.find((playlist) => playlist.name === name));
  } catch (error) {
    console.error("Error adding playlist:", error);
    res.status(500).send({ message: "Error adding playlist", error });
  }
});

app.post("/api/token", async (req, res) => {
  const tokenUrl = "https://accounts.spotify.com/api/token";
  const credentials = Buffer.from(
    `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  try {
    const response = await axios.post(
      tokenUrl,
      querystring.stringify({
        grant_type: "client_credentials",
        scope:
          "streaming user-read-email user-read-private user-modify-playback-state user-read-playback-state user-library-read user-library-modify",
      }),
      {
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
