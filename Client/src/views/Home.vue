<template>
  <div class="home-page">
    <main>
      <section class="hero">
        <h2>Discover New Music</h2>
        <button class="browse-button" @click="goToLibrary('Playlists')">Browse Playlists</button>
      </section>
      <section class="featured-albums">
        <h3>Featured Albums</h3>
        <div class="album-grid">
          <div @click="goToLibrary(album.name)" class="album" v-for="album in albums" :key="album.id">
            <img :src="album.cover" :alt="album.name" />
            <p>{{ album.name }}</p>
          </div>
        </div>
      </section>
    </main>
    <footer>
      <p>&copy; 2024 MusicApp. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import Playlists from './Playlists.vue';

export default {
  name: "Home",
  data() {
    return {
      albums: [
        { id: 1, name: "Top 50", cover: "https://www.kolibrimusic.com/wp-content/uploads/2017/10/spotify-top-50-global.jpg" },
        { id: 2, name: "Favorites", cover: "https://misc.scdn.co/liked-songs/liked-songs-300.png" },
      ],
    };
  },
  methods: {
    goToLibrary(name) {
        this.$emit('changeTab',name);
    },
  },
};
</script>

<style scoped>
.home-page {
  color: white;
  background-color: #000000;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.hero {
  text-align: center;
  margin-bottom: 40px;
}

.hero h2 {
  font-size: 2em;
  margin-bottom: 20px;
}

.browse-button {
  background-color: #1db954;
  color: white;
  border: none;
  padding: 15px 30px; /* Increased padding for larger button */
  cursor: pointer;
  font-size: 1.2em; /* Increased font size */
  border-radius: 20px;
}

.browse-button:hover {
  background-color: #1ed760;
}

.featured-albums {
  margin-top: 40px;
  flex-grow: 1;
  overflow-y: auto;
}

.featured-albums h3 {
  font-size: 1.5em;
  margin-bottom: 20px;
}

.album-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.album {
  background-color: #282828;
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 200px;
}

.album img {
  width: 100%;
  max-width: 200px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 10px;
}

footer {
  text-align: center;
  padding: 10px 0;
  background-color: #000000;
  font-size: 0.8em;
  color: #b3b3b3;
}
</style>
