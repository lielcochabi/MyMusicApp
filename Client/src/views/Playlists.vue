<template>
  <div>
    <div class="inputAndButton">
      <input class="input" type="text" v-model="newPlaylistName" placeholder="Enter playlist name" />
      <button class="button" @click="createPlaylist">Add Playlist</button>
    </div>
    <h1 class="title">Playlists:</h1>
    <div class="playlist-container">
      <div @click="goToPlaylist(playlist.name)" class="playlist" v-for="playlist in playlists" :key="playlist._id">
        <h2>{{ playlist.name }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      playlists: [],
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
      if(this.checkIfExist()){
        return;
      }
      try {
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        if (!this.newPlaylistName.trim()) {
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
    },
    checkIfExist(){
      const exist=this.playlists.some(playlist=>playlist.name===this.newPlaylistName)
      if(exist){     
        alert("playlist already exists");
      }
      return exist;
    },
    goToPlaylist(playlistName) {
      this.$emit('changeTab', playlistName);
    },
  },
  mounted() {
    this.fetchPlaylists();
  },
};
</script>
<style scoped>

.inputAndButton {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  gap: 10px; 
}

.input {
  padding: 10px;
  width: 500px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.button {
  padding: 10px 20px;
  background-color: #1db954;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}


.title {

  margin-top: 20px; 
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #1db954;
}

.playlist-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  margin-top: 30px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}


.playlist {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2d2d2d;
  padding: 20px;
  height: 150px;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  color: white;
  text-align: center;
}
</style>
