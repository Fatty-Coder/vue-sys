<template>
  <div class="app-main">
    <div class="app-main-inner">
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import Footer from '@/layout/Footer/index.vue';
import { RouterView } from 'vue-router';
</script>

<style lang="scss" scoped>
.app-main {
  flex: 1;
  display: flex;
  overflow-x: hidden;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  .app-main-inner {
    flex: 1;
    display: flex;
    overflow-x: hidden;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
