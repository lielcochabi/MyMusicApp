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
    currentTrack: Object,
    accessToken: String,
    deviceId: String,
  },
  data() {
    return {
      isPlaying: false,
      player: null,
      ready: false,
    };
  },
  watch: {
    currentTrack(newTrack) {
      if (newTrack && this.ready) {
        this.playTrack(newTrack.uri);
      }
    },
  },
  methods: {
    initializePlayer() {
    
      this.player = new Spotify.Player({
        name: 'MyMusicApp',
        getOAuthToken: (cb) => { cb(this.accessToken); }, 
        volume: 0.5,
      });

      
      this.player.connect();

      
      this.player.addListener('ready', ({ device_id }) => {
        console.log('Player is ready with Device ID:', device_id);
        this.$emit('setDeviceId', device_id); 
        this.ready = true; 
      });

   
      this.player.addListener('player_state_changed', (state) => {
        if (state) {
          this.isPlaying = !state.paused;
        }
      });

      
      this.player.addListener('initialization_error', ({ message }) => { console.error(message); });
      this.player.addListener('authentication_error', ({ message }) => { console.error(message); });
      this.player.addListener('account_error', ({ message }) => { console.error(message); });
      this.player.addListener('playback_error', ({ message }) => { console.error(message); });
    },

    playTrack(spotifyUri) {
     
      if (!this.deviceId || !this.accessToken) {
        console.error('No device ID or access token available for playback');
        return;
      }
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uris: [spotifyUri] }),
      })
        .then((response) => {
          if (response.ok) {
            console.log('Playback started');
          } else {
            console.error('Error starting playback:', response.status, response.statusText);
          }
        })
        .catch((error) => {
          console.error('Error playing song:', error);
        });
    },

    playPauseTrack() {
      if (this.isPlaying) {
        this.player.pause().then(() => {
          console.log('Playback paused');
          this.isPlaying = false;
        }).catch((err) => {
          console.error('Error pausing playback:', err);
        });
      } else {
        this.player.resume().then(() => {
          console.log('Playback resumed');
          this.isPlaying = true;
        }).catch((err) => {
          console.error('Error resuming playback:', err);
        });
      }
    },

    prevTrack() {
      this.player.previousTrack().then(() => {
        console.log('Skipped to previous track');
      }).catch((err) => {
        console.error('Error skipping to previous track:', err);
      });
    },

    nextTrack() {
      this.player.nextTrack().then(() => {
        console.log('Skipped to next track');
      }).catch((err) => {
        console.error('Error skipping to next track:', err);
      });
    },
  },

  mounted() {
   
    if (window.Spotify) {
      this.initializePlayer();
    } else {
      
      window.onSpotifyWebPlaybackSDKReady = () => {
        this.initializePlayer();
      };
    }
  },
};
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
  margin-right: 20px; 
}

.track-info img {
  height: 50px;
  width: 50px;
  margin-right: 20px;
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
  gap: 20px; 
}

.controls button {
  background: #66bb6a; 
  border: none;
  color: white;
  font-size: 16px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.controls button:hover {
  background: #388e3c; 
}

.controls button.playing {
  background: #ef5350; 
}
</style>
