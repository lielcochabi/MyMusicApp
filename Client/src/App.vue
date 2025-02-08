<template>
  <div>
    <Navbar @changeTab="changeTab" @search="search" />
    <div class="content">
      <SignUpForm @submit="submit" v-if="currentTab === 'SignUpForm'" />
      <LoginForm v-if="currentTab === 'LoginForm'" />
      <Home @changeTab="changeTab" v-if="currentTab === 'Home'" />
      <About v-if="currentTab === 'About'" />
      <Playlists @changeTab="changeTab" v-if="currentTab === 'Playlists'" />
      <Sidenav @changeTab="changeTab" />
      <Songs @playSong="playSong" :playlistName="playlistName" v-if="currentTab === 'Songs'" />
      <SearchSongs @playSong="playSong" :searchQuary="searchQuary" v-if="currentTab==='SearchSongs'"/>
    </div>
    <Player 
      :currentTrack="currentTrack" 
      :accessToken="accessToken" 
      :deviceId="deviceId" 
      @setDeviceId="setDeviceId"  
    />
  </div>
</template>

<script>
import Navbar from './components/NavBar.vue';
import Sidenav from './components/SideNav.vue';
import Playlists from './views/Playlists.vue';
import Home from './views/Home.vue';
import About from './views/About.vue';
import SignUpForm from './views/SignUpForm.vue';
import Player from './components/Player.vue';
import LoginForm from './views/LoginForm.vue';
import Songs from './views/Songs.vue';
import SearchSongs from './views/SearchSongs.vue';
import auth from './auth.js';  

export default {
  components: {
    Navbar,
    Sidenav,
    Playlists,
    Home,
    About,
    SignUpForm,
    Player,
    LoginForm,
    Songs,
    SearchSongs,
  },
  data() {
    return {
      currentTab: 'Home', 
      formValue: {
        email: '',
        confirmEmail: '',
        password: '',
        name: '',
        dob: '',
        gender: '',
      },
      submitted: false,
      currentTrack: null,  
      playlistName: '',  
      searchQuary: '',  
      accessToken: null,  
      deviceId: null,     
    };
  },
  methods: {
    changeTab(tabName) {
      const validTabs = ['Home', 'SignUpForm', 'LoginForm', 'About', 'Playlists', 'Songs', 'SearchSongs'];
      if (validTabs.includes(tabName)) {
        this.currentTab = tabName;
      } else {
        this.playlistName = tabName;
        this.currentTab = 'Songs';
      }
    },
    submit(formValue) {
      this.submitted = true;
      this.changeTab('Home');
    },
    search(searchData) {
      this.searchQuary = searchData;
      this.changeTab('SearchSongs');
    },
    playSong(song) {
      this.currentTrack = song;
    },
    async getAccessToken() {
      const storedToken = localStorage.getItem('spotify_access_token');
      if (storedToken) {
        this.accessToken = storedToken;
      } else {
        
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
          try {
            const token = await auth.getToken(code);
            this.accessToken = token;
          } catch (error) {
            console.error('Error retrieving access token:', error);
          }
        }
      }
    },
    setDeviceId(deviceId) {
      this.deviceId = deviceId;  
    }
  },
  async mounted() {
    await this.getAccessToken();  
  }
};
</script>

<style>
.content {
  padding-top: 60px; 
}
</style>
