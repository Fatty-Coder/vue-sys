<template>
    <div class="g-container-layout" :class="classObj">
      <div v-if="!isCollapse" class="drawer-bg" @click="handleClickOutside" />
      <sidebar class="sidebar-container" v-if="mode === 'vertical'" />
      <div
        class="main-container"
        :class="{
          hideSliderLayout: mode === 'horizontal',
        }"
      >
        <div :style="{ height: `${showTag ? 90 : 0}px` }"></div>
        <u-header />
        <div
          class="m-container-content"
          :class="{ 'app-main-hide-tag': !showTag }"
        >
          <Main />
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { computed, ref } from 'vue';
  import Sidebar from '@/layout/Sidebar/index.vue';
  import UHeader from '@/layout/Header/index.vue';
  import Main from '@/layout/Main/index.vue';

// 是否折叠
const isCollapse = ref(true);

const showTag = ref(false);

// 当屏幕切换的时候进行变换
const classObj = computed(() => {
  return {
    hideSidebar: false,
    openSidebar: true,
    withoutAnimation: false,
    mobile: false,
  };
});
// 移动端点击
const handleClickOutside = () => {};
const mode = ref('vertical');
</script>

<style lang="scss" scoped>
.g-container-layout {
  //display: flex;
  height: 100%;
  width: 100%;
  .main-container {
    //overflow: auto;
    display: flex;
    flex: 1;
    box-sizing: border-box;
    flex-direction: column;
  }
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.sidebar-container {
  display: flex;
  flex-direction: column;
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 90;
}
.m-container-content {
  display: flex;
  flex: 1;
  position: relative;
  box-sizing: border-box;
}
</style>
