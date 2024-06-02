<template>
  <div >
    <Navbar msg="MySongApp" />
    <Sidenav @changeTab="changeTab"/>
    <Playlists v-if="currentTab === 'Playlists'" />
    <Home @PlaylistTab="PlaylistTab"  v-if="currentTab === 'Home'" />
    <About v-if="currentTab === 'About'|| currentTab === null" />
  </div>
</template>

<script>
import { ref } from 'vue';
import Navbar from './components/NavBar.vue';
import Sidenav from './components/SideNav.vue';
import Playlists from './components/Playlists.vue';
import Home from './components/Home.vue';
import About from './components/About.vue';
import SignUpForm from './components/SignUpForm.vue';

export default {
  components: {
    Navbar,
    Sidenav,
    Playlists,
    Home,
    About,
  },
  data() {
    return {
      currentTab: "",
    }
  },
  methods: {
    changeTab(tab) {

      this.currentTab = tab.__name || tab.name;
    },
    PlaylistTab(playTab) {
      this.changeTab(playTab)
    }
  },
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