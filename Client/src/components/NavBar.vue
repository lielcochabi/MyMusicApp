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
        <img src="https://cdn-icons-png.flaticon.com/128/3669/3669986.png" alt="Logo" class="logo">
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
  transition: color 0.3s ease, background-color 0.3s ease; /* Smooth transition for hover effect */
}

.nav-link:hover {
  text-decoration: underline;
  color: #1db954; /* Light green color on hover */
  background-color: #1a1a1a; /* Slightly darker background color for hover effect */
  padding: 5px 10px; /* Add padding to highlight the hover state */
  border-radius: 5px; /* Rounded corners for hover state */
}
</style>