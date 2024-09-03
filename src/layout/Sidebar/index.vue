<template>
  <div class="has-logo">
    <div class="sidebar-logo-container">
      <transition name="sidebarLogoFadeCl">
        <router-link
          v-if="isCollapse"
          key="collapse"
          class="sidebar-logo-link"
          to="/"
        >
          <img src="@/assets/logo.png" class="sidebar-logo" />
        </router-link>
        <router-link v-else key="expand" class="sidebar-logo-link" to="/">
          <img src="@/assets/logo.png" class="sidebar-logo" />
          <h1 class="sidebar-title">Vue Admin Perfect</h1>
        </router-link>
      </transition>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        background-color="#304156"
        text-color="#bfcbd9"
        :collapse-transition="false"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
      >
        <sub-item
          v-for="route in asyncRoutes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import SubItem from './components/SubItem.vue';
import { useRoute } from 'vue-router';
import { ref, computed } from 'vue';
import { asyncRoutes } from '@/router/index';

const isCollapse = ref(false);

// 在setup中获取store
const route = useRoute();
const activeMenu = computed(() => {
  const { meta, path } = route;
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});
</script>

<style lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  height: 100%;
}
.crollbar-wrapper {
  height: 100%;
  .el-scrollbar__view {
    height: 100%;
  }
}

.sidebarLogoFadeCl-enter-active {
  transition: opacity 2s;
}
.sidebarLogoFadeCl-enter-from,
.sidebarLogoFadeCl-leave-to {
  opacity: 0;
}
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
    }
    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      margin-left: 12px;
      line-height: 50px;
      font-size: 14px;
      vertical-align: middle;
    }
  }
}
</style>
