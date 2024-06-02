<template>
  <div class="home-page">
    <main>
      <section class="hero">
        <h2>Discover New Music</h2>
        <button @click="goToLibrary">Browse Playlists</button>
      </section>
      <section class="featured-albums">
        <h3>Featured Albums</h3>
        <div class="album-grid">
          <div class="album" v-for="album in albums" :key="album.id">
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
        { id: 1, name: "Album 1", cover: "@/assets/album1.jpg" },
        { id: 2, name: "Album 2", cover: "@/assets/album2.jpg" },
        { id: 3, name: "Album 3", cover: "@/assets/album3.jpg" },
      ],
      playTab:Playlists
    };
  },
  methods: {
    goToLibrary() {
      this.$emit('PlaylistTab', Playlists)
    },
  },
};
</script>

<style scoped>
.home-page {
  color: white;
  background-color: #000000; /* Set the background color to black */
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

.hero button {
  background-color: #1db954;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1em;
  border-radius: 20px;
}

.hero button:hover {
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}

.album {
  background-color: #282828;
  padding: 20px;
  text-align: center;
  border-radius: 10px;
}

.album img {
  width: 100%;
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
