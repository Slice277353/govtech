<template>
  <div class="app">
    <TopBar />
    <router-view></router-view>
  </div>
</template>

<script>
import TopBar from './components/layout/TopBar.vue'

export default {
  name: 'App',
  components: {
    TopBar
  }
}
</script>