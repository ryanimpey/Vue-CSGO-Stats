<template>
  <div class="statistic">
    <p class="title is-4">
      <span class="icon has-text-info">
        <i class="fa has-text-white" v-bind:class="statIcon"></i>
      </span>
      <span>{{statTitle}}</span>
    </p>
    <p class="subtitle is-5">{{statDesc}}</p>
  </div>
</template>

<script>
export default {
  name: 'Statistic',
  props: {
    statTitle: {
      type: String,
      required: true,
    },
    statDesc: {
      required: true,
    },
    statIcon: {
      type: String,
      required: true,
    },
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
