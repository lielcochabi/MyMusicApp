<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)

</script>

<template>
    <nav class="navbar">
      <div class="navbar-brand">
        <img src="https://via.placeholder.com/40" alt="Logo" class="logo">
        <span class="brand-name">{{ msg }}</span>
      </div>
      <ul class="navbar-menu">
        <li class="nav-item"><a href="#" class="nav-link">New Music</a></li>
        <li class="nav-item"><a href="#" class="nav-link">Favorites</a></li>
        <li class="nav-item"><a href="#" class="nav-link">Browse</a></li>
        <li class="nav-item"><a href="#" class="nav-link">Podcasts</a></li>
      </ul>
    </nav>
  </template>

<style scoped>
.navbar {
    position: absolute;
    top: 0;
    width: 100vw;
    left: 0;
    z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: white;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.logo {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.brand-name {
  font-size: 1.2rem;
}

.navbar-menu {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin-right: 10px;
}

.nav-link {
  color: white;
  text-decoration: none;
}

.nav-link:hover {
  text-decoration: underline;
}
</style>
