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
        <statistic statTitle="Kills" v-bind:statDesc="steamStatisticsHolder[0]" statIcon="fa-superpowers" />
        <statistic statTitle="Time Played" v-bind:statDesc="steamStatisticsHolder[1]" statIcon="fa-clock-o" />
        <statistic statTitle="Bombs Planted" v-bind:statDesc="steamStatisticsHolder[2]" statIcon="fa-bomb" />
        <statistic statTitle="Damage Done" v-bind:statDesc="steamStatisticsHolder[3]" statIcon="fa-user-times" />
      </div>
      <div class="column is-4 has-text-centered">
        <statistic statTitle="Deaths" v-bind:statDesc="steamStatisticsHolder[4]" statIcon="fa-remove" />
        <statistic statTitle="Wins" v-bind:statDesc="steamStatisticsHolder[5]" statIcon="fa-trophy" />
        <statistic statTitle="Bombs Defused" v-bind:statDesc="steamStatisticsHolder[6]" statIcon="fa-bomb" />
        <statistic statTitle="Money Earned" v-bind:statDesc="steamStatisticsHolder[7]" statIcon="fa-usd" />
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
// import async from 'async';
import steamAPIKey from '../assets/keys';
import Statistic from './Statistic';

export default {
  name: 'Profile',
  components: {
    Statistic,
  },
  created() {
    this.requestData();
  },
  methods: {
    async requestData() {
      try {
        await this.getSteamID();
        await setTimeout(() => {
          this.getSteamStats();
          this.getGameStats();
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    },
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
          this.steamStatisticsHolder = [
            this.steamUserStats[0].value,
            this.steamUserStats[2].value,
            this.steamUserStats[3].value,
            this.steamUserStats[6].value,
            this.steamUserStats[1].value,
            this.steamUserStats[5].value,
            this.steamUserStats[4].value,
            this.steamUserStats[7].value,
          ];
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
      steamStatisticsHolder: [
        'Kills Holder',
        'Time Holder',
        'Planted Holder',
        'Damage Holder',
        'Deaths Holder',
        'Wins Holder',
        'Defused Holder',
        'Money Holder',
      ],
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
