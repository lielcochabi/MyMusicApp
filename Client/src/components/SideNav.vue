<template>
    <div class="sidenav">
      <ul>
        <li  @click="changeTabs(tab)" v-for="(tab, index) in tabs" :key="index">{{ tab.name }}</li>
      </ul>
    </div>
  </template>
  
<script>
  import Playlists from '../views/Playlists.vue';
  import Home from '../views/Home.vue';
  import About from '../views/About.vue';

  export default {
    data(){
      return{
        tabs: [
      { name: "Home", text: "home"},
      { name: "Playlists", text: "Playlists" },
      { name: "About", text: " About " },
      // { name: "Settings", text: "settings" },
    ], 
       }
      },
      methods: {
        changeTabs(tab) {
          this.$emit('changeTab', tab);
        },
      }
  };
</script>
  <style scoped>
  .sidenav {
    height: 100%;
    width: 250px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
    padding-top: 60px;
  }
  
  ul {
    padding: 0;
    list-style-type: none;
  }
  
  li {
    padding: 8px 8px;
    text-align: left;
    color: white; /* Text color */
    font-size: 1.2em;
  }
  
  li:hover {
    cursor: pointer;
    transition: color 0.3s ease, background-color 0.3s ease; /* Smooth transition for hover effect */
    text-decoration: underline;
    color: #1db954; /* Light green color on hover */
    background-color: #1a1a1a; /* Slightly darker background color for hover effect */
    padding: 5px 10px; /* Add padding to highlight the hover state */
    border-radius: 5px; /* Rounded corners for hover state */
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  a:hover {
    background-color: #555;
  }
  </style>