import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import Profile from '@/components/Profile';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: { title: 'CSGO Stats Viewer' },
    },
    {
      path: '/user/:username',
      name: 'Profile Stats',
      component: Profile,
      meta: { title: 'CSGO Stats Viewer' },
    },
  ],
});
