<template>
  <div class="app">
    <TopBar />
    <router-view></router-view>
  </div>
</template>

<script>
import TopBar from './components/layout/TopBar.vue'
import auth from '@/services/auth'

export default {
  name: 'App',
  components: {
    TopBar
  },
  created() {
    auth.checkAuth();
  }
};
</script>