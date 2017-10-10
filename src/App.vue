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
              <p class="title is-3">CS:GO Stats</p>
              <p class="subtitle is-5">Quick and simple stats checker for CS:GO</p>
              <div class="field">
                <p class="control has-icons-right">
                  <input class="input" type="email" placeholder="Steam Username">
                  <span class="icon is-small is-right">
                    <i class="fa fa-steam"></i>
                  </span>
                </p>
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
export default {
  name: 'app',
};
</script>


<style scoped>
img {
  height: 65px;
}

.hero{
  background: url('./assets/images/background.jpg');
}

.logo-container{
  display: flex;
  justify-content: center;
}
</style>

