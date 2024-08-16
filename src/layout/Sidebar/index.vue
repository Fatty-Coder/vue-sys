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
        background-color="#304156"
        text-color="#bfcbd9"
        default-active="2"
        class="el-menu-vertical-demo"
      >
        <el-menu-item index="1">
          <span>Home</span>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <span>菜单</span>
          </template>
          <el-menu-item index="2-1">菜单1</el-menu-item>
          <el-menu-item index="2-2">菜单2</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isCollapse = ref(true);
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
