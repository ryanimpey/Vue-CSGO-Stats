<template>
  <div class="Profile column">
    <div class="columns">
      <div class="column is-2 is-offset-4 profile-text">
        <p class="title is-4">{{ steamName }} </p>
        <p class="subtitle is-6">
          <a target="_blank" rel="noopener noreferrer" v-bind:href="steamProfile">{{ steamID }}</a>
        </p>

      </div>
      <div class="column is-2">
        <img v-bind:src="steamPicture" class="profile-avatar is-pulled-right">
      </div>
    </div>
    <br>
    <div class="columns">
      <div class="column is-4 is-offset-2 has-text-centered">
        <statistic statTitle="Kills" v-bind:statDesc="steamStats[0].value" statIcon="fa-superpowers" />
        <statistic statTitle="Time Played" v-bind:statDesc="steamStats[1].value" statIcon="fa-clock-o" />
        <statistic statTitle="Bombs Planted" v-bind:statDesc="steamStats[2].value" statIcon="fa-bomb" />
        <statistic statTitle="Damage Done" v-bind:statDesc="steamStats[3].value" statIcon="fa-user-times" />
      </div>
      <div class="column is-4 has-text-centered">
        <statistic statTitle="Deaths" v-bind:statDesc="steamStats[4].value" statIcon="fa-remove" />
        <statistic statTitle="Wins" v-bind:statDesc="steamStats[5].value" statIcon="fa-trophy" />
        <statistic statTitle="Bombs Defused" v-bind:statDesc="steamStats[6].value" statIcon="fa-bomb" />
        <statistic statTitle="Money Earned" v-bind:statDesc="steamStats[7].value" statIcon="fa-usd" />
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
import Statistic from './Statistic';
import Router from '../router';

export default {
  name: 'Profile',
  components: {
    Statistic,
  },
  created() {
    if (!this.successfulPass) {
      Router.push('/');
    }
  },
  props: {
    steamName: {
      required: true,
      type: String,
      default: 'Name',
    },
    steamID: {
      type: String,
      required: true,
      default: 'ID',
    },
    steamPicture: {
      type: String,
      required: true,
      default: 'Picture',
    },
    steamStats: {
      type: Array,
      required: true,
      default: 'Stats',
    },
    successfulPass: {
      default: false,
    },
  },
  data() {
    return {
      steamProfile: `steamcommunity.com/profiles/${this.steamID}`,
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
