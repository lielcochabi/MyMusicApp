<template>
  <div class="Songs">

    <div v-for="playlist in playlists" :key="playlist._id">

      <div v-if="playlist.name === playlistPressed">
        <h2 class="playlist">{{ playlist.name }}</h2>

        <div class="song-card" v-for="(song, index) in songs" :key="index" @click="playSong(song)">
          <img :src="song.imageUrl || 'https://via.placeholder.com/150'" :alt="song.songName" class="song-image">
          <div class="song-name">{{ song.songName }}</div>
          <div class="song-artist">{{ song.artistNames.join(', ') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Songs",
  props: {
    playlistName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      playlists: [],
      playlistPressed: "",
      songs: [] 
    };
  },
  methods: {

    async fetchPlaylists() {
      const userId = JSON.parse(localStorage.getItem('user'))._id;
      try {
        const response = await axios.get(`http://localhost:3000/api/user/${userId}/playlists`);
        this.playlists = response.data;

        if (this.playlistPressed) {
          this.loadSongsFromPlaylist(this.playlistPressed);
        }
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    },
    loadSongsFromPlaylist(playlistName) {
      const selectedPlaylist = this.playlists.find(playlist => playlist.name === playlistName);
      if (selectedPlaylist) {
        this.songs = selectedPlaylist.songs || []; 
      } else {
        this.songs = []; 
      }
    },
    playSong(song) {
      console.log(song)
      this.$emit('playSong', song);
    }
  },
  watch: {
    
    playlistPressed(newPlaylistName) {
      this.loadSongsFromPlaylist(newPlaylistName);
    }
  },
  mounted() {
    this.playlistPressed = this.playlistName;
    this.fetchPlaylists();
  }
};
</script>
  
  <style scoped>
  .Songs {
    display: grid;
    grid-gap: 20px;
    width: 60vw; 
    margin: 0 auto; 
  }
  
  .song-card {
    display: flex;
    align-items: center;
    background-color: #2d2d2d; 
    padding: 20px;
    height: 10px;
    border-radius: 10px; 
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
  
  .song-image {
    width: 45px; 
    height: 45px; 
    border-radius: 5px;
  }
  
  .song-details {
    display: flex;
    flex-direction: column;
    margin-left: 20px; 
    flex-grow: 1;
  }
  
  .song-name {
    font-weight: bold;
    color: #ffffff; 
  }
  
  .song-artist {
    color: #b3b3b3; 
    font-size: 1em; 
    margin-left: auto; 
    white-space: nowrap; 
  }
  
  .song-card:hover {
    background-color: #3a3a3a; 
  }

  .playlist{
    position: absolute;
    top: 10%;
    color: #1db954;
    font-weight: bold;
  }
  </style>
  