<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <img src="https://cdn-icons-png.flaticon.com/128/3669/3669986.png" alt="Logo" class="logo" />
      <span >MySongApp</span>
    </div>
    <div class="navbar-right">
      <input 
        v-model="searchQuery" 
        @keyup.enter="search" 
        class="search-bar" 
        placeholder="Search for a song" 
        ref="searchBar"
      />
      <ul class="navbar-menu">
        <div class="nav-item">
          <a href="#"  >
            <span  class="nav-link" @click="handleUserAction(tab)" v-if="user.name">Welcome  {{ user.name }}</span>
            <a class="space" v-else>
              <li class="nav-link" @click="handleUserAction(tab)" v-for="(tab, index) in tabs" :key="index">{{ tab.text }}</li>
            </a>
          </a>
        </div>
      </ul>
    </div>
   
  </nav>
</template>

<script>
import LoginForm from '../views/LoginForm.vue';
import { ref, onMounted } from 'vue';

export default {
  name: 'Navbar',
  components: {
    LoginForm, 

  },
  data(){
      return{
        tabs: [
          { name: "SignUpForm", text: "Sign Up"},
          { name: "LoginForm", text: "Login" },
        ],
      }
    },
  methods:{
    search(){
      this.$emit('search',this.searchQuery);
    }
  },
  setup(props, { emit }) {
    const searchQuery = ref('');
    const user = ref({});
    const handleUserAction = (tab) => {
      if (user.value.name) {
        logout();
      } else {
        emit('changeTab',tab.name);
      }
    };
    const handleLoginSuccess = (userData) => {
      user.value = userData;
      localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
      localStorage.removeItem('user');
      user.value = {};
      emit('user-logged-out');
    };

    onMounted(() => {
      const userData = localStorage.getItem('user');
      if (userData) {
        user.value = JSON.parse(userData);
      }
    });
    return {
      user,
      searchQuery,
      handleUserAction,
      handleLoginSuccess,
      logout,
    };
  },
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
  color: white;
  background-color: #040404;
  padding: 10px 20px;
  box-sizing: border-box;
}

.navbar-brand {
  display: flex;
  align-items: center;
  margin-left: 0;
  font-size: 1.2rem;
}
.logo {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.navbar-right {
  display: flex;
  align-items: center;
  margin-right: 20px;
  position: relative;
}

.search-bar {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  width: 300px;
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
  align-items: center;
}

.nav-link:hover {
  color: #1db954;
  background-color: #1a1a1a;

}
.space {
  display: flex;
    gap: 10px;
}
</style>
