<template>
  <div class="Playlists">
    <h1 class="title">Playlists:</h1>
    <div class="playlist" v-for="playlist in playlists" :key="playlist._id">
      <h2>{{ playlist.name }}</h2>
    </div>
    <input type="text" v-model="newPlaylistName" placeholder="Enter playlist name" />
    <button @click="createPlaylist">Add Playlist</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      name: "Playlists",
      playlists:[],
      newPlaylistName: ''
    };
  },
  methods: {
    async fetchPlaylists() {
      try {
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        const response = await axios.get(`http://localhost:3000/api/user/${userId}/playlists`);
        this.playlists = response.data;
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    },
    async createPlaylist() {
      try {
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        if (this.newPlaylistName === '') {
          alert("Please enter a playlist name");
          return;
        }
        const playlist = {
          name: this.newPlaylistName,
          songs: []
        };
        const response = await axios.post(`http://localhost:3000/api/user/${userId}/playlists`, playlist);
        this.playlists.push(response.data);
        this.newPlaylistName = '';
      } catch (error) {
        console.error('Error creating playlist:', error);
      }
    }
  },
  mounted() {
    this.fetchPlaylists();
  },
};
</script>

<style scoped>
.Playlists {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
  width: 60vw;
  color: #1db954;
}
.playlist {
    display: flex;
    align-items: center;
    background-color: #2d2d2d; 
    padding: 20px;
    height: 10px;
    border-radius: 10px; 
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
.playlist {
  margin-bottom: 40px;
}
.title {
  position: absolute;
  top: 10%;
  font-weight: bold;
}
</style>
