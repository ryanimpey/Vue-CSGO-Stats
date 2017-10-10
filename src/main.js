// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// Absolute Imports
import 'buefy/lib/buefy.css';
import Buefy from 'buefy';
import Vue from 'vue';

// Relative Imports
import '../static/font-awesome/css/font-awesome.css';

import App from './App';
import router from './router';


Vue.use(Buefy, {
  defaultIconPack: 'fa',
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
