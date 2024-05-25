<script setup>
import Navbar from './components/NavBar.vue'
import Sidenav from './components/SideNav.vue'
import SongsGallery from './components/SongsGallery.vue'
</script>

<template>
  <Navbar msg="MySongApp" />
  <Sidenav />
  <SongsGallery />
</template>

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
