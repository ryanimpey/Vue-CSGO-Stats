<template>
  <div id="app">
    <section class="hero is-info is-fullheight">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-3 logo-container">
            <a href="/"><img src="./assets/svg/csgo-logo.svg"></a>
          </div>
        </div>
        <div class="columns is-centered">
          <div class="column is-3 has-text-centered">
            <p class="title is-3">CS:GO Stats</p>
            <p class="subtitle is-5">Quick and simple stats checker for CS:GO</p>
            <div class="field has-addons">
              <div class="control has-icons-right">
                <input class="input" type="text" v-model="steamUsername" v-on:keyup.enter="submitRequest" placeholder="Steam Username">
                <span class="icon is-small is-right">
                  <i class="fa fa-steam"></i>
                </span>
              </div>
              <div class="control">
                <button class="button is-success" @click="submitRequest">Go!</button>
              </div>
            </div>
          </div>
        </div>
        <div class="columns is-centered">
          <router-view/>
        </div>
      </div>
    </section>
    <b-loading :active.sync="isLoading"></b-loading>
  </div>
</template>

<script>
import axios from 'axios';
import Router from './router/';

export default {
  name: 'app',
  data() {
    return {
      steamUsername: '',
      steamRouterLink: '',
      steamID: '',
      steamProfilePicture: '',
      steamCSGOStats: '',
      isLoading: false,
      apiCalls: {
        getSteamID: () => axios.get(`http://localhost:3000/steamid?username=${this.steamUsername}`),
        getSteamProfilePicture: () => axios.get(`http://localhost:3000/steamstats?steamid=${this.steamID}`),
        getSteamCSGOStats: () => axios.get(`http://localhost:3000/gamestats?steamid=${this.steamID}`),
      },
    };
  },
  methods: {
    async submitRequest() {
      this.isLoading = true;

      // Get steamID from axios request
      const steamID = await this.apiCalls.getSteamID();
      // Set the Vue steamID equal to the request response (The ID Number)
      this.steamID = steamID.request.response;

      // Get steam profile picture from axios request
      const steamProfilePicture = await this.apiCalls.getSteamProfilePicture();
      // Set the Vue steamProfilePicture equal to the request response (The Profile Picture)
      this.steamProfilePicture = steamProfilePicture.data.avatarfull;

      // Get CSGO statistics from axios request
      const steamCSGOStats = await this.apiCalls.getSteamCSGOStats();
      // Set the vue steamCSGOStats equal to the request response (The Full Achievements)
      this.steamCSGOStats = steamCSGOStats.data.playerstats.stats;

      // All seems good, send notification to the user.
      this.$toast.open({
        duration: 2000,
        message: 'Data retrieved!',
        type: 'is-success',
      });

      // Disable loading
      this.isLoading = false;

      // Push URL to Router
      this.routerPush();
    },
    routerPush() {
      Router.push({
        name: 'stats',
        params: {
          steamName: this.steamUsername,
          steamID: this.steamID,
          steamPicture: this.steamProfilePicture,
          steamStats: this.steamCSGOStats,
          successfulPass: true,
        },
      });
    },
  },
  mounted() {
    const steamInput = document.getElementsByClassName('input')[0];
    const self = this;
    steamInput.addEventListener('keyup', () => {
      self.steamRouterLink = `user/${this.steamUsername}`;
    });
  },
};
</script>


<style scoped>
.hero {
  padding-top: 50px;
}

img {
  height: 65px;
}

.hero {
  background: url('./assets/images/background.jpg');
}

.logo-container {
  display: flex;
  justify-content: center;
}
</style>

