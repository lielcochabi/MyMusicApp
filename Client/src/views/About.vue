<template>
    <div class="about-page">
      <section class="about-section">
        <h1>About MusicApp</h1>
        <p>
          Welcome to MusicApp, your ultimate destination for discovering, enjoying, and sharing music. Whether you are a music enthusiast, a budding artist, or simply someone looking to explore new sounds, MusicApp is designed to cater to all your musical needs.
        </p>
      </section>
      <section class="features-section">
        <h2>Features</h2>
        <ul>
          <li>Discover new music through personalized recommendations</li>
          <li>Create and share playlists with friends</li>
          <li>Access a vast library of songs and albums from various genres</li>
          <li>Enjoy high-quality audio streaming</li>
          <li>Follow your favorite artists and stay updated with their latest releases</li>
        </ul>
      </section>
      <section class="mission-section">
        <h2>Our Mission</h2>
        <p>
          At MusicApp, our mission is to connect people through the power of music. We believe that music has the ability to transcend boundaries, bring joy, and inspire. Our goal is to provide a platform where everyone can find their favorite tunes, discover new artists, and share their love for music with the world.
        </p>
      </section>
      <section class="contact-section">
        <h2>Contact Us</h2>
        <p>
          If you have any questions, feedback, or suggestions, feel free to reach out to us at <a href="mailto:support@musicapp.com">support@musicapp.com</a>. We'd love to hear from you!
        </p>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: "About",
  };
  </script>
  
  <style scoped>
  .about-page {
    color: white;
    background-color: #191414; 
    font-family: Arial, sans-serif;
    padding: 20px;
    min-height: 100vh;
  }
  
  .about-section,
  .features-section,
  .mission-section,
  .contact-section {
    margin-bottom: 40px;
  }
  
  h1, h2 {
    color: #1db954; 
  }
  
  p, li {
    color: white;
  }
  
  ul {
    list-style-type: none; 
    padding-left: 0; 
  }
  
  a {
    color: #1db954; 
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  </style>
  