<template>
    <div class="Playlists">
      <div class="song-card" v-for="(song, index) in songs" :key="index">
        <img :src="song.imageUrl" :alt="song.name" class="song-image">
        <div class="song-name">{{ song.name }}</div>
      </div>
    </div>
  </template>
  
  <script setup>
  const songs = [
    { name: 'Song 1', imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Song 2', imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Song 3', imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Song 4', imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Song 5', imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Song 6', imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Song 7', imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Song 8', imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Song 9', imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Song 10', imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Song 11', imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Song 12', imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Song 13', imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Song 14', imageUrl: 'https://via.placeholder.com/150' }
  ];



  </script>
  
  <style scoped>
  .Playlists {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 20px;
    width: 60vw;
  }
  
  .song-card {
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
  
  .song-image {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }
  
  .song-name {
    margin-top: 10px;
    font-weight: bold;
    text-align: center;
  }
  </style>
  