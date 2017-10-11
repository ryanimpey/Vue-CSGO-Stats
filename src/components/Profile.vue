<template>
  <div class="Profile column">
    <div class="columns">
      <div class="column is-2 is-offset-4 profile-text">
        <p class="title is-4">{{ this.$route.params.username }} </p>
        <p class="subtitle is-6">{{ steamUserID }} </p>
      </div>
      <div class="column is-2">
        <img src="http://placehold.it/300x300" class="profile-avatar is-pulled-right">
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
        callback(null, 'Get ID');
        this.getSteamID();
      },
      (callback) => {
        callback(null, '2');
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
        this.steamUserID = response.data;
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
