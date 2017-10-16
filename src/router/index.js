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
      component: Index,
      meta: { title: 'CSGO Stats Viewer' },
    },
    {
      name: 'stats',
      path: '/stats',
      component: Profile,
      meta: { title: 'CSGO Stats Viewer' },
      props: true,
    },
  ],
});
