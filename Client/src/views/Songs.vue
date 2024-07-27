<template>
    <div class="Songs">
      <div  v-for="playlist in playlists" :key="playlist._id">
        <div v-if="playlist.name===playlistPressed">
          <div @click="PlayMusic(song)">
            <h2 class="playlist">{{ playlist.name }}</h2>
            <div class="song-card" v-for="(song, index) in playlist.songs" :key="index">
            <img :src="song.imageUrl || 'https://via.placeholder.com/150'" :alt="song.songName" class="song-image">
            <div class="song-name">{{ song.songName }}</div>
            <div class="song-artist">{{ song.artistNames.join(', ') }}</div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
      name :"Songs",
      props:{
        playlistName:{}
      },
    data() {
      return {
        playlists: [],
        playlistPressed:"",
      };
    },
    methods: {
        fetchPlaylists () {
        const  userId = JSON.parse(localStorage.getItem('user'))._id;
         axios.get(`http://localhost:3000/api/user/${userId}/playlists`)
          .then(response => {
            this.playlists = response.data;
          })
          .catch(error => {
            console.error('Error fetching playlists:', error);
          });
      },
      PlayMusic(song){
        this.$emit('play-music', song);
      }
    },
    mounted() {
      this.fetchPlaylists();
      this.playlistPressed=this.playlistName;
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
    margin-left: 20px; /* Increased margin */
    flex-grow: 1;
  }
  
  .song-name {
    font-weight: bold;
    color: #ffffff; /* White color for text */
  }
  
  .song-artist {
    color: #b3b3b3; /* Light gray color for text */
    font-size: 1em; /* Increased font size */
    margin-left: auto; /* Push to the far right */
    white-space: nowrap; /* Prevent text from wrapping */
  }
  
  .song-card:hover {
    background-color: #3a3a3a; /* Darker gray on hover */
  }

  .playlist{
    position: absolute;
    top: 10%;
    color: #1db954;
    font-weight: bold;
  }
  </style>
  