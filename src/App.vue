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
                  <input class="input" type="text" v-model="steamusername" placeholder="Steam Username">
                  <span class="icon is-small is-right"><i class="fa fa-steam"></i></span>
                </div>
                <div class="control">
                  <button class="button is-success">Go!</button>
                </div>
              </div>
            </div>
          </div>
          <div class="columns is-centered">
            <router-view/>
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
      steamuserdata: '',
    };
  },
  methods: {
    routerpush: () => {
      // Router.push('/user/r1mp3x');
    },
  },
  mounted() {
    const steamInput = document.getElementsByClassName('input')[0];
    steamInput.addEventListener('keyup', () => {
      this.steamuserdata = `/user/${this.steamusername}`;
      console.log(this.steamuserdata);
    });
  },
};
</script>


<style scoped>
.hero{
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

