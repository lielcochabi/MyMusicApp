<template>
  <div>
    <SignUpForm @submit="submit" v-if="currentTab === 'SignUpForm'" />
    <Navbar @changeTabs="changeTabs" @search="handleSearch" msg="MySongApp" />
    <Sidenav @changeTab="changeTab" />
    <Playlists v-if="currentTab === 'Playlists'" />
    <Home @PlaylistTab="PlaylistTab" v-if="currentTab === 'Home'" />
    <About v-if="currentTab === 'About' || currentTab === null" />
    <Spotify ref="spotify" @update-current-playing="updateCurrentPlaying" />
    <Player :currentTrack="currentTrack" />
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
import Spotify from './components/Spotify.vue';

export default {
  components: {
    Navbar,
    Sidenav,
    Playlists,
    Home,
    About,
    SignUpForm,
    Player,
    Spotify,
  },
  data() {
    return {
      currentTab: "",
      formValue: {
        email: '',
        confirmEmail: '',
        password: '',
        name: '',
        dob: '',
        gender: '',
      },
      submitted: true,
      currentTrack: null
    };
  },
  methods: {
    changeTab(tab) {
      this.currentTab = tab.__name || tab.name;
    },
    PlaylistTab(playTab) {
      this.changeTab(playTab);
    },
    submit(formValue) {
      console.log('Form:', formValue);
      this.submitted = true;
      console.log(this.submitted);
      this.changeTab('Home');
    },
    changeTabs(signIn) {
      console.log(signIn);
      this.changeTab(signIn);
    },
    handleSearch(query) {
      this.$refs.spotify.searchSongs(query);
    },
    updateCurrentPlaying(track) {
      this.currentTrack = track;
    }
  }
};
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
