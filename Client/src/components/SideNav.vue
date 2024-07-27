<template>
    <div class="sidenav">
      <ul>
        <li  @click="changeTabs(tab)" v-for="(tab, index) in tabs" :key="index">{{ tab.name }}</li>
      </ul>
    </div>
  </template>
  
<script>
  export default {
    data(){
      return{
        tabs: [
      { name: "Home", text: "home"},
      { name: "Playlists", text: "Playlists" },
      { name: "About", text: " About " },
    ], 
       }
      },
      methods: {
        changeTabs(tab) {       
          this.$emit('changeTab', tab.name);
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
    color: white;
    font-size: 1.2em;
  }
  
  li:hover {
    cursor: pointer;
    color: #1db954;
    background-color: #1a1a1a; 
    padding: 5px 10px;
    border-radius: 5px;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  a:hover {
    background-color: #555;
  }
  </style>