<template>
  <div class="Profile">
    <h1>{{ steamUserID }} </h1>
  </div>
</template>

<script>
import axios from 'axios';
import steamAPIKey from '../assets/keys';

export default {
  name: 'Profile',
  beforeMount() {
    this.getSteamID();
  },
  methods: {
    getSteamID() {
      axios.get(`http://localhost:3000/steamid?username=${this.$route.params.username}`)
      .then((response) => {
        console.log(response.request.response);
        this.steamUserID = JSON.parse(response.request.response);
      })
      .catch((error) => {
        console.log(error);
      });
    },
    getCSGOStats() {

    },
  },
  data() {
    return {
      msg: this.$route.params.username,
      steamUserID: 'holder',
      url: `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${steamAPIKey}&vanityurl=${this.$route.params.username}`,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
