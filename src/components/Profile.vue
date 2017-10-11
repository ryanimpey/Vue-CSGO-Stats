<template>
  <div class="Profile column">
    <div class="columns">
      <div class="column is-2 is-offset-4 profile-text">
        <p class="title is-4">{{ this.$route.params.username }} </p>
        <p class="subtitle is-6"><a target="_blank" rel="noopener noreferrer" v-bind:href="steamURLValue">{{ steamUserID }}</a></p>
      </div>
      <div class="column is-2">
        <img v-bind:src="steamUserAvatar" class="profile-avatar is-pulled-right">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import async from 'async';
import steamAPIKey from '../assets/keys';

export default {
  name: 'Profile',
  beforeMount() {
    async.series([
      (callback) => {
        this.getSteamID();
        callback(null, 'Get ID');
      },
      (callback) => {
        setTimeout(() => {
          this.getSteamStats();
          callback(null, 'Get Stats');
        }, 1000);
      },
      (callback) => {
        callback(null, '3');
      },
    ], (error, results) => {
      console.log(results);
    });
  },
  methods: {
    getSteamID() {
      axios.get(`http://localhost:3000/steamid?username=${this.$route.params.username}`)
      .then((response) => {
        this.steamUserID = response.request.response;
        console.log(response);
        this.steamURLValue = `http://steamcommunity.com/profiles/${this.steamUserID}`;
      })
      .catch((error) => {
        console.log(error);
      });
    },
    getSteamStats() {
      axios.get(`http://localhost:3000/steamstats?steamid=${this.steamUserID}`)
      .then((response) => {
        this.steamUserStats = response;
        this.steamUserAvatar = response.data.avatarmedium;
        console.log(this.steamUserStats.data.avatarmedium);
      })
      .catch((error) => {
        console.log(error);
      });
    },
  },
  data() {
    return {
      msg: this.$route.params.username,
      steamUserID: 'holder',
      steamUserStats: [],
      steamURLValue: '',
      steamUserAvatar: '',
      url: `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${steamAPIKey}&vanityurl=${this.$route.params.username}`,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .profile-text{
    margin-top: 10px;
  }
  .profile-avatar{
    height: 60px;
    border-radius: 360px;
  }
</style>
