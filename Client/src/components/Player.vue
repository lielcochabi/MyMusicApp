<template>
  <div class="player">
    <div class="track-info" v-if="currentTrack">
      <img :src="currentTrack.album.images[0]?.url" alt="Album Art" />
      <div class="track-details">
        <h4>{{ currentTrack.name }}</h4>
        <p>{{ currentTrack.artists.map(artist => artist.name).join(', ') }}</p>
      </div>
    </div>
    <div class="controls">
      <button @click="prevTrack">Previous</button>
      <button @click="playPauseTrack" :class="{ 'playing': isPlaying }">Play/Pause</button>
      <button @click="nextTrack">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Player',
  props: {
    currentTrack: Object
  },
  data() {
    return {
      isPlaying: false
    };
  },
  methods: {
    playPauseTrack() {
      this.isPlaying = !this.isPlaying;
    },
    prevTrack() {
      console.log('Previous track');
    },
    nextTrack() {
      console.log('Next track');
    }
  }
}
</script>

<style scoped>
.player {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background-color: #000000;
  color: white;
  padding: 10px 20px;
  z-index: 9999;
}

.track-info {
  display: flex;
  align-items: center;
  margin-right: 20px; /* Add spacing between track info and controls */
}

.track-info img {
  height: 50px;
  width: 50px;
  margin-right: 20px; /* Add spacing between image and text */
}

.track-details {
  display: flex;
  flex-direction: column;
}

.track-details h4,
.track-details p {
  margin: 0;
}

.controls {
  display: flex;
  gap: 20px; /* Increased spacing between buttons */
}

.controls button {
  background: #66bb6a; /* Light green */
  border: none;
  color: white;
  font-size: 16px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.controls button:hover {
  background: #388e3c; /* Darker green on hover */
}

.controls button.playing {
  background: #ef5350; /* Red for pause button when playing */
}
</style>
