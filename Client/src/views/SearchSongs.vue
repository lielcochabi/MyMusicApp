<template>
  <div class="Playlists">
    <div class="songs-table">
      <h2>Songs</h2>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Artist</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="song in songs" :key="song.id" 
            :class="{ 'glow': selectedSong === song}"
            @click="selectSong(song)">
            <td><img :src="song.album.images[0]?.url || 'https://via.placeholder.com/50'" alt="Song Image" class="song-image"></td>
            <td>{{ song.name }}</td>
            <td>{{ song.artists.map(artist => artist.name).join(', ') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="playlists-table">
      <h2>Playlists</h2>
      <table>
        <thead>
          <tr>
            <th>Playlist Name</th>
          </tr>
        </thead>
        <tbody v-for="playlist in playlists" :key="playlist._id">
          <tr :class="{ 'glow': selectedPlaylist === playlist}"
            @click="selectPlaylist(playlist)">
            <td >{{ playlist.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SearchSongs',
  props:{
    searchQuary: '',
  },
  data(){
    return {
      songs: [],
      playlists: [],
      selectedSong: null,
      selectedPlaylist:null,
    }
  },  
  methods:{
    async fetchPlaylists() {
      try {
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        const response = await axios.get(`http://localhost:3000/api/user/${userId}/playlists`);
        this.playlists = response.data;
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    },
    async getAccessToken(){
      try {
        const response = await axios.post('http://localhost:3000/api/token');
        localStorage.setItem('accessToken', response.data.access_token); 
        return response.data.access_token;
      } catch (error) {
        console.error('Error getting access token', error);
      }
    },
    async searchSongs(query){
      let accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        accessToken = await this.getAccessToken();
      }
      try {
        const response = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        this.songs = response.data.tracks.items;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          accessToken = await this.getAccessToken();
          if (accessToken) {
            const response = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            this.songs = response.data.tracks.items;
          }
        } else {
          console.error('Error searching songs', error);
        }
      }
    },
    async addToPlaylist(playlist, song ){
      const userId = JSON.parse(localStorage.getItem('user'))._id;
      try {
        await axios.post(`http://localhost:3000/api/user/${userId}/playlists/${playlist.name}/songs`, { song });
        alert(`Added to ${playlist.name}`);
      } catch (error) {
        console.error(`Error adding song to ${playlist.name}`, error);
      }
    },
    selectSong(song) {
      if(this.selectedSong!=null &&this.selectedSong===song){
        this.selectedSong=null;
      }else{
        this.selectedSong = song;
      }

    },
    selectPlaylist(playlist){
      if(this.selectedPlaylist!=null &&this.selectedPlaylist===playlist){
        this.addToPlaylist(playlist,this.selectedSong);
      }else{
        if(this.selectedSong!=null){
        this.selectedPlaylist=playlist;
      }else{
        alert("choose a song first");
      }
      }
    }
  },
  mounted() {
    if(this.getAccessToken()){
      this.searchSongs(this.searchQuary);
      this.fetchPlaylists();
    }
    else{
      alert("search first");
    }
  },
};
</script>

<style scoped>
.Playlists {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  width: 100%;
  color: #1db954;
}

.songs-table,
.playlists-table {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: left;
}

.song-image {
  width: 50px;
  height: 50px;
  border-radius: 4px;
}

.glow {
  box-shadow: 0 0 10px #1db954;
  transition: box-shadow 0.3s ease-in-out;
}
</style>
