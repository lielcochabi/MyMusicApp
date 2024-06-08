<!-- Spotify.vue -->
<template>
  <div>
    <div v-if="songs.length > 0" class="search-results">
      <h2>Top 10 Search Results</h2>
      <ul>
        <li 
          v-for="song in songs.slice(0, 10)" 
          :key="song.id" 
          class="song-item" 
          :class="{ playing: song.id === currentPlaying?.id }"
          @click="playSong(song)"
        >
          <img :src="song.album.images[0]?.url" alt="Song Image" class="song-image" />
          <div class="song-info">
            <span class="song-name">{{ truncatedSongName(song) }}</span>
            <div class="dropdown">
              <button class="dropbtn">Options</button>
              <div class="dropdown-content">
                <a href="#" @click.prevent="addToPlaying(song)">Add to Playing</a>
                <a href="#" @click.prevent="addToFavorites(song)">Add to Favorites</a>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';

export default {
  setup(props, { emit }) {
    const accessToken = ref(null);
    const songs = ref([]);
    const currentPlaying = ref(null);

    const getAccessToken = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/token');
        accessToken.value = response.data.access_token;
      } catch (error) {
        console.error('Error getting access token', error);
      }
    };

    const searchSongs = async (query) => {
      if (!accessToken.value) {
        await getAccessToken();
      }
      if (query) {
        try {
          const response = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
            headers: {
              Authorization: `Bearer ${accessToken.value}`,
            },
          });
          songs.value = response.data.tracks.items;
        } catch (error) {
          console.error('Error searching songs', error);
        }
      }
    };

    const playSong = (song) => {
      currentPlaying.value = song;
      emit('update-current-playing', song);
    };

    const addToPlaying = (song) => {
      console.log(`Add to Playing: ${song.name}`);
      // Add logic to handle adding the song to the playing queue
    };

    const addToFavorites = (song) => {
      console.log(`Add to Favorites: ${song.name}`);
      // Add logic to handle adding the song to the favorites
    };

    const truncatedSongName = (song) => {
      const name = `${song.name} by ${song.artists.map(artist => artist.name).join(', ')}`;
      return name.length > 30 ? name.substring(0, 27) + '...' : name;
    };

    onMounted(() => {
      getAccessToken();
    });

    return {
      songs,
      searchSongs,
      currentPlaying,
      playSong,
      addToPlaying,
      addToFavorites,
      truncatedSongName,
    };
  },
};
</script>

<style scoped>
.search-results {
  margin-top: 20px;
  color: white;
}

.song-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  background-color: #282828;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
}

.song-item.playing {
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
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.song-name {
  font-size: 16px;
  font-weight: bold;
  color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: calc(100% - 80px); /* Adjust width to leave space for the options button */
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropbtn {
  background-color: #1db954;
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.dropbtn:hover, .dropbtn:focus {
  background-color: #14833b;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #282828;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 8px;
  right: 0;
}

.dropdown-content a {
  color: white;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  border-radius: 4px;
}

.dropdown-content a:hover {
  background-color: #3e3e3e;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: #14833b;
}
</style>
