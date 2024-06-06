<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <img src="https://cdn-icons-png.flaticon.com/128/3669/3669986.png" alt="Logo" class="logo" />
      <span class="brand-name">{{ msg }}</span>
    </div>
    <ul class="navbar-menu">
      <li class="nav-item" v-for="(tab, index) in tabs" :key="index">
        <a href="#" class="nav-link" @click="changeTabs(tab)">{{ tab.text }}</a>
      </li>
    </ul>
  </nav>
</template>
<script>
import { ref, reactive } from 'vue';
import Playlists from '../views/Playlists.vue';
import Home from '../views/Home.vue';
import SignUpForm from '../views/SignUpForm.vue';

export default {
  name: 'Navbar',
  props: {
    msg: String,
    accountName: String,
  },
  data() {
    return {
      count: 1,
      tabs: reactive([
        { name: "Home", text: "Home" },
        { name: "Playlists", text: "Playlists" },
        { name: "SignUpForm", text: "Sign Up" },
      ]),
    };
  },
  methods: {
    changeTabs(tab) {
      this.$emit('changeTabs', tab);
    },
  },
};
</script>
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
  background-color: #040404;
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
  margin-left: auto; /* Add this line */
  margin-right: 20px; /* Add this line for right-side spacing */
}

.nav-item {
  margin-left: 20px;
}

.nav-link {
  color: white;
  text-decoration: none;
  transition: color 0.3s ease, background-color 0.3s ease;
}

.nav-link:hover {
  text-decoration: underline;
  color: #1db954;
  background-color: #1a1a1a;
  padding: 5px 10px;
  border-radius: 5px;
}
</style>
