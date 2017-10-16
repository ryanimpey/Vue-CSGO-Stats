<template>
  <div class="Profile column">
    <div class="columns">
      <div class="column is-2 is-offset-4 profile-text">
        <p class="title is-4">{{ this.$route.params.username }} </p>
        <p class="subtitle is-6">
          <a target="_blank" rel="noopener noreferrer" v-bind:href="steamURLValue">{{ steamUserID }}</a>
        </p>

      </div>
      <div class="column is-2">
        <img v-bind:src="steamUserAvatar" class="profile-avatar is-pulled-right">
      </div>
    </div>
    <br>
    <div class="columns">
      <div class="column is-4 is-offset-2 has-text-centered">
        <statistic statTitle="Kills" v-bind:statDesc="steamUserStats[0].value" statIcon="fa-superpowers" />
        <statistic statTitle="Time Played" v-bind:statDesc="steamUserStats[2].value" statIcon="fa-clock-o" />
        <statistic statTitle="Bombs Planted" v-bind:statDesc="steamUserStats[3].value" statIcon="fa-bomb" />
        <statistic statTitle="Damage Done" v-bind:statDesc="steamUserStats[6].value" statIcon="fa-user-times" />
      </div>
      <div class="column is-4 has-text-centered">
        <statistic statTitle="Deaths" v-bind:statDesc="steamUserStats[1].value" statIcon="fa-remove" />
        <statistic statTitle="Wins" v-bind:statDesc="steamUserStats[5].value" statIcon="fa-trophy" />
        <statistic statTitle="Bombs Defused" v-bind:statDesc="steamUserStats[4].value" statIcon="fa-bomb" />
        <statistic statTitle="Money Earned" v-bind:statDesc="steamUserStats[7].value" statIcon="fa-usd" />
      </div>
    </div>
    <div class="columns">
      <div class="column is-2 is-offset-5 has-text-centered">
        <p class="subtitle is-5">
          <span>Advanced</span>
          <span class="icon has-text-info">
            <i class="fa fa-chevron-down has-text-white"></i>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import async from 'async';
import steamAPIKey from '../assets/keys';
import Statistic from './Statistic';

export default {
  name: 'Profile',
  components: {
    Statistic,
  },
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
        this.getGameStats();
        callback(null, 'Get Game Stats');
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
          this.steamURLValue = `http://steamcommunity.com/profiles/${this.steamUserID}`;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getSteamStats() {
      axios.get(`http://localhost:3000/steamstats?steamid=${this.steamUserID}`)
        .then((response) => {
          this.steamUserAvatar = response.data.avatarmedium;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getGameStats() {
      axios.get(`http://localhost:3000/gamestats?steamid=${this.steamUserID}`)
        .then((response) => {
          this.steamUserStats = response.data.playerstats.stats;
          console.log(this.steamUserStats);
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
.profile-text {
  margin-top: 10px;
}

.profile-avatar {
  height: 60px;
  border-radius: 360px;
}

.statistic {
  padding-bottom: 15px;
}
</style>
