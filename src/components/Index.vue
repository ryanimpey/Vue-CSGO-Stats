<template>
  <div>
    <a class="button is-success" @click="launchHelpDialog">Need help?</a>
    <div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  methods: {
    launchHelpDialog() {
      this.$dialog.alert({
        type: 'is-success',
        title: 'How to use',
        message: this.dialogMsg,
        confirmText: 'Alright!',
      });
    },
  },
  data() {
    return {
      dialogMsg:
      `To use this tool simply enter your steam ID in the box above. Your
      stats will be showed right below in the area you just clicked this help
      button in! By pressing advanced, you'll be shown advanced data including
      map stats, weapon data, and more!`,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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
