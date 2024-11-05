<template>
  <div class="home-page">
    <button v-if="!accessToken" @click="loginToSpotify">{{ buttonText }}</button>
    <button v-if="accessToken" @click="logout">Disconnect from Spotify</button>
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
import auth from '../auth';

export default {
  name: "Home",
  data() {
    return {
      albums: [
        { id: 1, name: "Top 50", cover: "https://www.kolibrimusic.com/wp-content/uploads/2017/10/spotify-top-50-global.jpg" },
        { id: 2, name: "Favorites", cover: "https://misc.scdn.co/liked-songs/liked-songs-300.png" },
      ],
      accessToken: null,
      buttonText: "Connect to Spotify"
    };
  },
  methods: {
    goToLibrary(name) {
      this.$emit('changeTab', name);
    },
    loginToSpotify() {
      window.location.href = auth.getAuthUrl();
    },
    logout() {
      localStorage.removeItem('spotify_access_token');
      this.accessToken = null;
      this.buttonText = "Connect to Spotify";
    },
    async handleRedirect() {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        try {
          const token = await auth.getToken(code);
          this.accessToken = token;
          localStorage.setItem('spotify_access_token', token);
          this.clearUrlParams(); 
          this.checkIfConnected();
        } catch (error) {
          console.error('Error exchanging Spotify code for token:', error);
        }
      }
    },
    clearUrlParams() {
      const url = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, url);
    },
    checkIfConnected() {
      if (this.accessToken) {
        this.buttonText = "Connected to Spotify";
      } else {
        this.buttonText = "Connect to Spotify";
      }
    }
  },
  async mounted() {
    const storedToken = localStorage.getItem('spotify_access_token');
    if (storedToken) {
      this.accessToken = storedToken;
      this.checkIfConnected();
    } else {
      await this.handleRedirect();
    }
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
  padding: 15px 30px; 
  cursor: pointer;
  font-size: 1.2em; 
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
