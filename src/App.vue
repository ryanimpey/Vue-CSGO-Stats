<template>
  <div id="app">
    <section class="hero is-info is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-3 logo-container">
              <img src="./assets/svg/csgo-logo.svg">
            </div>
          </div>
          <div class="columns is-centered">
            <div class="column is-3 has-text-centered">
              <p class="title is-3" @click="routerpush">CS:GO Stats</p>
              <p class="subtitle is-5">Quick and simple stats checker for CS:GO</p>
              <div class="field has-addons">
                <div class="control has-icons-right">
                  <input class="input" type="text" v-model="steamusername" v-on:keyup.enter="geturl" placeholder="Steam Username">
                  <span class="icon is-small is-right">
                    <i class="fa fa-steam"></i>
                  </span>
                </div>
                <div class="control">
                  <a class="button is-success" v-bind:href="steamuserdata">
                    Go!
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="columns is-centered">
            <router-view/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import Router from './router/';

export default {
  name: 'app',
  data() {
    return {
      steamusername: '',
      steamuserurl: '/user/',
      steamuserdata: '/user',
    };
  },
  methods: {
    geturl: () => {
      this.steamuserdata = this.steamuserurl + this.steamusername;
    },
    routerpush: () => {
      // Router.push('/user/r1mp3x');
    },
  },
  mounted() {
    window.addEventListener('keyup', () => {
      this.steamuserdata = this.steamuserurl + this.steamusername;
    });
  },
};
</script>


<style scoped>
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

