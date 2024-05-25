<template>
    <div class="sidenav">
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>
  </template>
  
  <script setup>
  // No script setup needed since we don't have any reactive logic
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
  }
  
  a {
    text-decoration: none;
    color: white;
  }
  
  a:hover {
    background-color: #555;
  }
  </style>
  