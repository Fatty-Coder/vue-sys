## 实现菜单栏与主界面的联动

首先要实现菜单栏的菜单点击功能，这要对element plus的el-menu要有所了解，其实底层就是通过typescript加载静态或者动态菜单数组，然后展示在左菜单栏，如果内链接就使用router-link，如果是外部链接就直接a标签+需要跳转的网址

下面是纯手工打的菜单栏


```html
      <el-menu
        :default-active="activeMenu"
        background-color="#304156"
        text-color="#bfcbd9"
        :collapse-transition="false"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
      >
        <el-menu-item index="1">
          <span>Home</span>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <span>菜单</span>
          </template>
          <router-link to="/home">
            <el-menu-item index="2-1">菜单1</el-menu-item>
          </router-link>
          <router-link to="/login">
            <el-menu-item index="2-2">菜单2</el-menu-item>
          </router-link>
          <a href="https://www.baidu.com" target="_blank">
            <el-menu-item index="2-3">百度</el-menu-item>
          </a>
        </el-sub-menu>
      </el-menu>

```

一般为了扩展，我们会定义一系列的菜单数组，菜单结构有千万种，但是我选择跟路由类结构相似，这个以后会说明原因

```javascript
const menuItems = [
  {
    path: '/menu',
    name: 'menu',
    meta: { title: '菜单' },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: { title: '主页', keepAlive: true, icon: 'MenuIcon' },
      },
      {
        path: 'setting',
        name: 'setting',
        meta: { title: '设置', keepAlive: true, icon: 'MenuIcon' },
      },
    ],
  },
];
```

然后写一个无限级的菜单组件 src/layout/Sidebar/components/SubItem.vue   ，代码如下：

```html
<template>
  <template v-if="!item.hidden">
    <template
      v-if="!item.alwaysShow && hasOneShowingChild(item.children, item)"
    >
      <router-link
        v-if="onlyOneChild.meta"
        :to="resolvePath(onlyOneChild.path)"
      >
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <el-icon :size="20">
            <component :is="onlyOneChild?.meta.icon"></component>
          </el-icon>
          <template #title>{{
            onlyOneChild.meta && onlyOneChild.meta.title
          }}</template>
        </el-menu-item>
      </router-link>
    </template>
    <el-sub-menu :index="resolvePath(item.path)" v-else popper-append-to-body>
      <template #title>
        <el-icon :size="20">
          <component :is="item.meta?.icon"></component
        ></el-icon>
        <span>{{ item.meta && item.meta.title }}</span>
      </template>
      <sub-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </el-sub-menu>
  </template>
</template>

<script lang="ts" setup>
import path from 'path-browserify';
import { ref } from 'vue';
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  basePath: {
    type: String,
    default: '',
  },
});

const onlyOneChild = ref(null);
const hasOneShowingChild = (children = [], parent) => {
  const showingChildren = children.filter((item) => {
    // 过滤掉需要隐藏的菜单
    if (item.hidden) {
      return false;
    } else {
      // 临时设置（如果只有一个显示子项，则将使用）
      onlyOneChild.value = item;
      return true;
    }
  });

  // 当只有一个子路由器时，默认情况下会显示该子路由器
  if (showingChildren.length === 1) {
    return true;
  }
  // 如果没有要显示的子路由器，则显示父路由器
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true };
    return true;
  }

  return false;
};

const resolvePath = (routePath) => {
  return path.resolve(props.basePath, routePath);
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
</style>

```

然后在 src/layout/Sidebar/index.vue这个页面便可调用这个无限级菜单组件了。代码如下：

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
        :default-active="activeMenu"
        background-color="#304156"
        text-color="#bfcbd9"
        :collapse-transition="false"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
      >
        <sub-item
          v-for="route in menuItems"
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

const isCollapse = ref(false);

const menuItems = [
  {
    path: '/menu',
    name: 'menu',
    meta: { title: '菜单' },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: { title: '主页', keepAlive: true, icon: 'MenuIcon' },
      },
      {
        path: 'setting',
        name: 'setting',
        meta: { title: '设置', keepAlive: true, icon: 'MenuIcon' },
      },
    ],
  },
];

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
```

因为 设置 菜单点击会跳到 #/menu/setting ，所以我们必须制作一个setting页面，模拟切换效果

新建 src/views/menu/Setting.vue ,代码如下：

```html
<template>
  <div>Setting</div>
</template>
<script lang="ts" setup></script>
```

新增 #/menu/setting  的路由，修改 src/router/index.ts

```javascript

import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router';
import Layout from '@/layout/index.vue';
// 扩展继承属性
interface extendRoute {
  hidden?: boolean;
}

/**
 * path ==> 路由路径
 * name ==> 路由名称
 * component ==> 路由组件
 * redirect ==> 路由重定向
 * alwaysShow ==> 如果设置为true，将始终显示根菜单，无论其子路由长度如何
 * hidden ==> 如果“hidden:true”不会显示在侧边栏中（默认值为false）
 * keepAlive ==> 设为true 缓存
 * meta ==> 路由元信息
 * meta.title ==> 路由标题
 * meta.icon ==> 菜单icon
 * meta.affix ==> 如果设置为true将会出现在 标签栏中
 * meta.breadcrumb ==> 如果设置为false，该项将隐藏在breadcrumb中（默认值为true）
 */

export const constantRoutes: Array<RouteRecordRaw & extendRoute> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/inde.vue'),
    hidden: true,
    meta: { title: '登录' },
  },
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
        meta: { title: '首页', icon: 'House', affix: true },
      },
      {
        path: '/menu/setting',
        component: () => import('@/views/menu/Setting.vue'),
        name: 'setting',
        meta: { title: '设置', icon: 'House', affix: true, role: ['other'] },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(), // hash
  routes: constantRoutes,
});

export default router;


```

这时，运行代码，便可在主页和设置来回切换

但是会存在一个问题，如果我们再新增一个 【菜单】 时，我们得改菜单数组和路由表，这就是前面提到，菜单数组结构为什么要跟路由表结构一样了，我们只需抽离他们共有的部分然后菜单渲染时读取路由表的路由数组便可

所以我们要在路由目录下面新建一个 src/router/moduels/common.ts，代码如下：

```javascript
import Layout from '@/layout/index.vue';

const commonRouter = [
  {
    path: '/menu',
    component: Layout,
    name: 'menu',
    meta: {
      title: '菜单',
      icon: 'School',
    },
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
        meta: { title: '主页', keepAlive: true, icon: 'MenuIcon' },
      },
      {
        path: 'setting',
        component: () => import('@/views/menu/Setting.vue'),
        name: 'setting',
        meta: { title: '设置', keepAlive: true, icon: 'MenuIcon' },
      },
    ],
  },
];

export default commonRouter;

```

然后在主路由表附加这个通用的路由表

```javascript
import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router';
import commonRouter from './moduels/common';
// 扩展继承属性
interface extendRoute {
  hidden?: boolean;
}

// 异步组件
export const asyncRoutes = [
  ...commonRouter,
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
  },
];

/**
 * path ==> 路由路径
 * name ==> 路由名称
 * component ==> 路由组件
 * redirect ==> 路由重定向
 * alwaysShow ==> 如果设置为true，将始终显示根菜单，无论其子路由长度如何
 * hidden ==> 如果“hidden:true”不会显示在侧边栏中（默认值为false）
 * keepAlive ==> 设为true 缓存
 * meta ==> 路由元信息
 * meta.title ==> 路由标题
 * meta.icon ==> 菜单icon
 * meta.affix ==> 如果设置为true将会出现在 标签栏中
 * meta.breadcrumb ==> 如果设置为false，该项将隐藏在breadcrumb中（默认值为true）
 */

export const constantRoutes: Array<RouteRecordRaw & extendRoute> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/inde.vue'),
    hidden: true,
    meta: { title: '登录' },
  },
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
  },
];

const router = createRouter({
  history: createWebHashHistory(), // hash
  routes: constantRoutes.concat(asyncRoutes),
});

export default router;

```

最后修改左菜单栏  src/layout/Sidebar/index.vue 加载菜单的数组了，代码如下：

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

...

```

这样以后只需要修改路由表便可以连同菜单一起修改了

启动访问，跟之前的菜单联动一致