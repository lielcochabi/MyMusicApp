<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <img src="https://cdn-icons-png.flaticon.com/128/3669/3669986.png" alt="Logo" class="logo" />
      <span class="brand-name">{{ msg }}</span>
    </div>
    <div class="navbar-right">
      <input v-model="searchQuery" @keyup.enter="emitSearchQuery" class="search-bar" placeholder="Search for a song" />
      <ul class="navbar-menu">
        <li class="nav-item">
          <a href="#" class="nav-link" @click="handleUserAction">
            <span v-if="user.name">Welcome, {{ user.name }}</span>
            <span v-else>Sign Up</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    msg: String,
  },
  data() {
    return {
      searchQuery: '',
      user: {}, // Add a user data property
    };
  },
  methods: {
    emitSearchQuery() {
      this.$emit('search', this.searchQuery);
    },
    handleUserAction() {
      if (this.user.name) {
        this.logout();
      } else {
        this.$emit('changeTabs', { name: 'SignUpForm', text: 'Sign Up' });
      }
    },
    logout() {
      localStorage.removeItem('user');
      this.user = {};
      this.$emit('user-logged-out');
    },
    updateUser(userData) {
      this.user = userData;
    }
  },
  created() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }
};
</script>

<style scoped>
.navbar {
  position: absolute;
  top: 0;
  width: 100%;
  left: 0;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  background-color: #040404;
  padding: 10px 20px;
  box-sizing: border-box; /* Ensure padding is included in the element's total width and height */
}

.navbar-brand {
  display: flex;
  align-items: center;
  margin-left: 0; /* Remove left padding to align with the wall */
}

.logo {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.brand-name {
  font-size: 1.2rem;
}

.navbar-right {
  display: flex;
  align-items: center;
  margin-right: 20px; /* Add margin to the right side */
}

.search-bar {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  width: 300px; /* Adjust width as needed */
  margin-right: 20px;
}

.navbar-menu {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
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

.user-name {
  margin-left: 20px;
  color: #1db954;
  font-size: 1rem;
  cursor: pointer; /* Add cursor pointer to indicate clickable */
}

.search-results {
  margin-top: 60px;
}
</style>
