<template>
  <div>
    <Navbar @changeTab="changeTab" @search="search" />
    <div class="content">
      <SignUpForm @submit="submit" v-if="currentTab === 'SignUpForm'" />
      <LoginForm v-if="currentTab === 'LoginForm'" />
      <Home @changeTab="changeTab" v-if="currentTab === 'Home'" />
      <About v-if="currentTab === 'About'" />
      <Playlists v-if="currentTab === 'Playlists'" />
      <Sidenav @changeTab="changeTab" />
      <Songs :playlistName="playlistName" v-if="currentTab === 'Songs'" />
      <Player :currentTrack="currentTrack" />
      <SearchSongs :searchQuary="searchQuary"  v-if="currentTab==='SearchSongs'"/>
    </div>
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
      searchQuary:'',
    };
  },
  methods: {
    changeTab(tabName) {
      if(tabName === "Top 50" || tabName === "Favorites"){
        this.playlistName = tabName;
        this.currentTab = 'Songs';
      } else {
        this.currentTab = tabName;
      }
    },
    submit(formValue) {
      this.submitted = true;
      this.changeTab('Home');
    },
    search(searchData){
      this.searchQuary=searchData;
      this.changeTab('SearchSongs')
    }
  },
};
</script>

<style>
.content {
  padding-top: 60px; 
}
</style>
