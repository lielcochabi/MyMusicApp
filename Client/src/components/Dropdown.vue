<template>
    <div ref="dropdown" class="dropdown">
      <ul class="dropdown-menu">
        <li 
          v-for="song in songs" 
          :key="song.id" 
          @contextmenu.prevent="showOptions($event, song)" 
          class="dropdown-item"
        >
          <img :src="song.album.images[0]?.url || 'https://via.placeholder.com/50'" alt="Song Image" class="song-image">
          <div class="song-info">
            <span class="song-name">{{ song.name }}</span>
            <span class="song-artist">{{ song.artists.map(artist => artist.name).join(', ') }}</span>
          </div>
        </li>
      </ul>
      <div v-if="showOptionsMenu" class="options-menu" :style="{ top: `${menuPosition.y}px`, left: `${menuPosition.x}px` }">
        <div class="options-item" @click="addToPlaylists('Favorites')">Add to Favorites</div>
        <div class="options-item" @click="addToPlaylists('Top 50')">Add to Top 50</div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    props: {
      songs: Array,
    },
    setup(props, { emit }) {
      const showOptionsMenu = ref(false);
      const menuPosition = ref({ x: 0, y: 0 });
      const selectedSong = ref(null);
  
      const showOptions = (event, song) => {
        menuPosition.value = {x:event.clientX,y:event.clientY};
        selectedSong.value = song;
        showOptionsMenu.value = true;
      };
      const addToPlaylists = (playlistName) => {
        emit('add-to-playlist', { playlist:playlistName, song: selectedSong.value });
        showOptionsMenu.value = false;
      };
  
      document.addEventListener('click', () => {
        showOptionsMenu.value = false;
      });
  
      return {
        showOptionsMenu,
        menuPosition,
        showOptions,
        addToPlaylists,
      };
    },
  };
  </script>
  
  <style scoped>
  .dropdown {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    max-height: 300px;
    overflow-y: auto;
    background-color: rgb(0, 0, 0);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 3;
    border-radius: 4px;
  }
  
  .dropdown-menu {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  
  .dropdown-item {
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
  }
  
  .dropdown-item:hover {
    background-color: #1db954; 
  }
  
  .song-image {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    border-radius: 4px;
  }
  
  .song-info {
    display: flex;
    flex-direction: column;
  }
  
  .song-name {
    font-size: 14px;
    font-weight: bold;
  }
  
  .song-artist {
    font-size: 12px;
    color: gray;
  }
  
  .options-menu {
    position: relative;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    z-index: 4;
  }
  
  .options-item {
    padding: 10px;
    cursor: pointer;
    margin-left: 10px;
  }
  
  .options-item:hover {
    background-color: #1db954; 
  }
  </style>
  