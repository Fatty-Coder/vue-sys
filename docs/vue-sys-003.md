## 集成element plus及编写主页

安装element plus

```sh
yarn add element-plus
```

在 src/mian.ts 全局引用element-plus组件，这里暂且不讨论按需引用和自动导入等复杂操作，有兴趣可以自行研究，代码如下：

```javascript

import { createApp } from 'vue';
import App from './App.vue';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);
app.use(ElementPlus);
app.mount('#app');

```

然后在所有的vue页面都可以自由使用element-plus了，譬如在 src/App.vue 使用 el-button，然后触发一个点击，代码如下：

```html
<template>
  <div>
    <h1>Hello,Vue3！</h1>
    <el-button type="primary" @click="onClick" plain>点击</el-button>
    <div>num:{{ num }}</div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const num = ref(10);
const onClick = () => {
  num.value++;
};
</script>
```
接下来需要做一个后台的简单布局，需要有左菜单栏，右顶部和内容展示区域

事前准备，现在sass非常流行，可以压缩和支持css变量，所以得安装sass依赖

```sh
yarn add -D sass-embedded
```

@根路径的支持，相对路径总是太多层，很容易出错，现在@跟路径比较方便，但nodejs只支持javascript，如果用typescript就得安装多一个依赖

```sh
yarn add @types/node
```

还需要配置vite.config.ts文件，不然会报错，配置如下：

```json
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue(), eslintPlugin()],
  // 配置别名
  resolve: {
    alias: {
      /** @ 符号指向 src 目录 */
      '@': resolve(__dirname, './src'),
    },
  },
  //启动服务配置
  server: {
    /** 端口号 */
    port: 3301,
    /** 是否自动打开浏览器 */
    open: true,
    /** 端口被占用时，是否直接退出 */
    strictPort: true,
  },
});

```

主要新增了resolve别名节点，将@映射到跟目录

新建一个 assets 目录，放置一个logo.png文件，修改 src/App.vue 文件如下：

```html
<template>
  <div>
    <img src="@/assets/logo.png" class="sidebar-logo" />
    <h1>Hello,Vue3！</h1>
    <el-button type="primary" @click="onClick" plain>点击</el-button>
    <div>num:{{ num }}</div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const num = ref(10);
const onClick = () => {
  num.value++;
};
</script>

<style lang="scss">
.sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
    }
</style>
```

如果运行不出错，则已经成功安装了两个依赖

先预览项目的目录结构，因为教程主要讲Vue的搭建，所以scss的细节暂时会跳过，所以大伙只能下载我提供的tech003的分支样式了

```html
vue-sys/
├── node_modules/         # 项目依赖
├── src/                  # 源代码
│   ├── assets/           # 静态资源
│   ├── components/       # Vue组件
│   ├── layout/            # Vue后台共用布局
│   ├── styles/           # scss样式目录
│   ├── App.vue           # 根组件
│   └── main.ts           # 加载主程序
├── eslint.config.mjs          # ESLint配置文件
├── index.html        # 入口HTML文件
├── .prettierrc.json        # Prettier配置文件
├── package.json          # 项目配置和依赖
├── tsconfig.json          # typescript配置和依赖
├── vite.config.ts          # vite配置和依赖
└── README.md         # 项目说明

```

assets 和 styles 这两个目录文件我会跳过不讲，项目需要的资源请自行到源码下载，当然有兴趣的可以自行研究研究

接下来编写 Sidebar 页面，就是左边栏的菜单

编写前需修改一下 eslint.config.mjs 配置文件，取消双字命名文件到限制，不然文件名不能为index.vue、index.ts、site.css等，修改如下：

rules: {'vue/multi-word-component-names': 'off',}

```typescript
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';

export default [
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
  {
    rules: {'vue/multi-word-component-names': 'off',},
  },
];
```

在src/main.ts ,引入全局的 /styles/index.scss，代码如下

```typescript
import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';

import 'element-plus/dist/index.css';
import '@/styles/index.scss';

const app = createApp(App);
app.use(ElementPlus);
app.mount('#app');
```

新建目录 src/layout/Sidebar 目录 ，新建index.vue模版页代码如下：

```html
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


```

在 src/layout 新建 index.vue 主模版，代码如下：

```html
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
const showTag = ref(false);
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

```

在App.vue 引入主模版 /layout/index.vue ，代码如下：

```html
<template>
  <div>
    <Layout></Layout>
  </div>
</template>
<script setup lang="ts">
import Layout from '@/layout/index.vue';
</script>

```

运行代码检查和启动，命令如下：

```sh
// 代码检查
yarn run lint:eslint

// 运行前端程序
yarn run dev
```

如果页面运行正常，则会看到左菜单栏，如果运行出错，看看报错内容是否缺少图片和css资源

然后编写顶部Header模块

新建目录 src/layout/Header 目录 ，新建index.vue模版页代码如下：

```html
<template>
  <div class="m-layout-header">
    <div class="header">
      <div class="left"></div>
      <div class="tool-bar-right">
        <div class="m-info">
          <el-popover width="200px" placement="bottom">
            <template #reference>
              <el-badge :value="1" class="item-info-pop">
                <el-icon class="bell" style="font-size: 20px"><Bell /></el-icon>
              </el-badge>
            </template>
            <div class="right-item-menu">
              <el-tabs
                v-model="activeName"
                class="demo-tabs"
                @tab-click="handleClick"
              >
                <el-tab-pane label="通知" name="first">
                  <div class="item-child">
                    GitHub开源地址：<el-button
                      type="primary"
                      link
                      @click="
                        toGitHub(
                          'https://github.com/zouzhibin/vue-admin-perfect'
                        )
                      "
                      >点我</el-button
                    >
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-popover>
        </div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-avatar :size="30" class="avatar" :src="AvatarLogo" />
            admin
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :command="2">
                <el-icon><Edit /></el-icon>修改密码</el-dropdown-item
              >
              <el-dropdown-item :command="1" divided>
                <el-icon><SwitchButton /></el-icon>退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { TabsPaneContext } from 'element-plus';

import AvatarLogo from '@/assets/image/avatar.png';

const activeName = ref('first');
const toGitHub = (link) => {
  window.open(link);
};
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>

<style lang="scss" scoped>
.avatar {
  margin-right: 6px;
}
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.mobile {
  .m-layout-header {
    left: 0 !important;
    width: 100% !important;
  }
}
.header {
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  padding: 0 10px 0 0;
  box-sizing: border-box;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .tool-bar-right {
    display: flex;
    align-items: center;
    .right-item-menu {
      margin-right: 22px;
    }
  }
}
.zb-fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
}
.zb-no-fixed-header {
  width: 100% !important;
}

.m-layout-header {
  width: 100%;
  background: white;
  transition: width 0.28s;
  flex-shrink: 0;
  box-sizing: border-box;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
}
.fixed-header-collapse {
  width: calc(100% - 60px);
}
.fixed-header-no-collapse {
  width: calc(100% - 210px);
}
.el-dropdown {
  display: flex;
  height: 100%;
  align-items: center;
}

.transverseMenu {
  display: flex;
  .el-menu {
    overflow: hidden;
  }
  .tool-bar-right {
    display: flex;
    justify-content: flex-end;
    min-width: 300px;
    flex-shrink: 0;
  }
}
.m-info {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  .item-info-pop {
    display: flex;
    align-items: center;
  }
  .bell {
    color: black;
  }
  .item-child {
    display: flex;
    align-items: center;
    font-size: 13px;
  }
}
::v-deep(.el-divider--horizontal) {
  margin-bottom: 10px;
  margin-top: 10px;
}
.transverseMenu {
  .bell {
    color: white;
  }
}
</style>

```

修改 src/layout/index.vue 

```html
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

    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import Sidebar from '@/layout/Sidebar/index.vue';
import UHeader from '@/layout/Header/index.vue';

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
...

```

运行代码，顶部会多了个导航

依次建立 Footer 和 Main 模版 代码如下

```html
// src/layout/Footer/index.vue
<template>
  <div class="footer-layout">
    <span href="/" target="_blank"> 2024 © VUE-SYS. </span>
  </div>
</template>

<style scoped lang="scss">
.footer-layout {
  height: 40px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border-top: 1px solid #e4e7ed;
  flex-shrink: 0;
  color: rgba(0, 0, 0, 0.45);
}
</style>

```

```html
// src/layout/Main/index.vue
<template>
  <div class="app-main">
    <div class="app-main-inner">Home</div>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import Footer from '@/layout/Footer/index.vue';
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


```

修改主模版 /src/layout/index.vue

```html
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
...
```

这时再运行就会得到一个完整的后台页面了
