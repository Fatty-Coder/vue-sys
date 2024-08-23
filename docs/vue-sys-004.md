## 安装路由和写一个简单的登陆

__注意：此教程涉及的源码在 https://github.com/Fatty-Coder/vue-sys/tree/tech004__

安装 路由组件

```sh
yarn add vue-router
yarn add @types/vue-router --dev
```

新建 src/views/login 目录，在目录下面新建index.vue登陆页面，内容如下：

```html
<template>
    <div>
        Login
    </div>
</template>
<script lang="ts" setup>
</script>
```

新建 src/views/home 目录，在目录下面新建index.vue登陆页面，内容如下：

```html
<template>
  <div>Home</div>
</template>
<script lang="ts" setup>
</script>
```

因为是测试页面，所以比较简单

然后新建路由规则，创建 src/router 目录，在目录下面新建 index.ts 路由规则，代码如下：

```javascript
import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router';
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
    component: () => import('@/views/home/index.vue'),
    hidden: true,
    meta: { title: '首页' },
  
  },
];

const router = createRouter({
  history: createWebHashHistory(), // hash
  routes: constantRoutes,
});

export default router;
```

在 src/main.ts 添加路由，代码如下：

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import router from './router';

import 'element-plus/dist/index.css';
import '@/styles/index.scss';

const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.mount('#app');
```

```sh
// 运行代码检查
yarn run lint:eslint

// 运行自动格式化代码
yarn run lint:prettier

// 启动项目
yarn run dev

```

这时在浏览器输入地址便可访问刚才做的两个页面

http://localhost:3301/#/        home
http://localhost:3301/#/login       login

然后我们只需要编写登陆代码，输入代码便跳到home，退出则跳到login

我们先制作一个简易的登陆框

```html
<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-left"></div>
      <div class="login-form">
        <div class="login-title">
          <img class="icon" src="@/assets/logo.png" alt="logo" />
          <h2 class="title">Vue-Admin</h2>
        </div>
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="0"
        >
          <el-form-item label="" prop="username">
            <el-input
              placeholder="请输入用户名"
              autoComplete="on"
              style="position: relative"
              v-model="ruleForm.username"
              @keyup.enter="submitForm"
            >
              <template #prefix>
                <el-icon class="el-input__icon"><UserFilled /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input
              placeholder="请输入密码"
              autoComplete="on"
              @keyup.enter="submitForm"
              v-model="ruleForm.password"
              :type="passwordType"
            >
              <template #prefix>
                <el-icon class="el-input__icon"><GoodsFilled /></el-icon>
              </template>
              <template #suffix>
                <div class="show-pwd" @click="showPwd">
                  <svg-icon
                    :icon-class="
                      passwordType === 'password' ? 'eye' : 'eye-open'
                    "
                  />
                </div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item style="width: 100%">
            <el-button
              :loading="loading"
              class="login-btn"
              type="primary"
              @click="submitForm"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import type { FormInstance } from 'element-plus';
import { ElNotification } from 'element-plus';
import { useRouter } from 'vue-router';

const ruleFormRef = ref<FormInstance>();
const router = useRouter();

const passwordType = ref('password');
const loading = ref(false);
const rules = reactive({
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
});
// 表单数据
const ruleForm = reactive({
  username: 'vueadmin',
  password: '123456',
});

const showPwd = () => {
  if (passwordType.value === 'password') {
    passwordType.value = '';
  } else {
    passwordType.value = 'password';
  }
};
const submitForm = () => {
  loading.value = true;
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      // 登录
      setTimeout(async () => {
        router.push({
          path: '/',
        });
        ElNotification({
          message: '欢迎登录 Vue Sys',
          type: 'success',
          duration: 3000,
        });
        loading.value = true;
      }, 1000);
    } else {
      console.log('error submit!');
      loading.value = false;
      //return false;
    }
  });
};
</script>

<style lang="scss">
$dark_gray: #889aa4;
.login-box {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 620px;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-left {
    width: 50%;
    img {
      width: 100%;
      max-width: 900px;
      min-height: 1024px;
    }
  }
  .login-form {
    max-width: 480px;
    width: 50%;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    box-sizing: border-box;
  }
  .login-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
    .title {
      margin: 0;
      font-size: 30px;
      white-space: nowrap;
    }
    .icon {
      width: 60px;
    }
  }
  ::v-deep(.el-input__inner) {
    height: 40px;
  }
}
.login-btn {
  margin-top: 20px;
  width: 100%;
  height: 47px;
}
.show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  user-select: none;
  ::v-deep(.svg-icon) {
    vertical-align: 0;
  }
}
.login-container {
  background-color: #f0f2f5;
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 25px;
  box-sizing: border-box;
}
.login-dark {
  position: absolute;
  right: 20px;
  top: 20px;
}

@media (max-width: 850px) {
  .login-container {
    padding: 10px;
  }
  .login-box {
    .login-form {
      width: 88%;
      .title {
        font-size: 20px;
      }
    }
  }
  .login-left {
    display: none;
  }
}
</style>

```

页面制止好后点击登陆便可直接进入后台首页了，但是有个问题，如果后台需要验证权限，有登陆权限才能使用后台，所以必须有个值保存在浏览器，以前我们经常会使用cookie保存，但Vue3有个状态管理库Pinia
这样可以判断Pinia是否已经有值来判断是否已登陆

安装Pinia

```sh
yarn add pinia
```

新建目录 src/store/modules ,然后新建文件 user.ts ,代码如下：

```javascript
import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: 'userState',
  // state: 返回对象的函数
  state: () => ({
    // 登录token
    token: null,
    // 登录用户信息
    userInfo: {},
    // 角色
    roles: [],
  }),
  getters: {},
  // 可以同步 也可以异步
  actions: {
    // 登录
    login(userInfo) {
      const { username } = userInfo;
      return new Promise((resolve) => {
        this.token = username;
        this.userInfo = userInfo;
        this.getRoles();
        resolve(username);
      });
    },
    // 获取用户授权角色信息，实际应用中 可以通过token通过请求接口在这里获取用户信息
    getRoles() {
      return new Promise((resolve) => {
        // 获取权限列表 默认就是超级管理员，因为没有进行接口请求 写死
        this.roles = ['admin'];
        resolve(this.roles);
      });
    },
    // 获取用户信息 ，如实际应用中 可以通过token通过请求接口在这里获取用户信息
    getInfo(roles) {
      return new Promise((resolve) => {
        this.roles = roles;
        resolve(roles);
      });
    },
    // 退出
    logout() {
      return new Promise((resolve) => {
        this.token = null;
        this.userInfo = {};
        this.roles = [];
        resolve(null);
      });
    },
  },
});


```

这个 userstroe主要是建立一个 state 用于存储 用户信息，这个状态只保存在浏览器内存中，如果刷新页面或者从根目录进入网站，内存值会置空

这时需要修改 src/views/login/index.vue 登陆代码，让其登陆后写入到 userStore中，代码如下：

```html
...
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import type { FormInstance } from 'element-plus';
import { ElNotification } from 'element-plus';
import { useRouter } from 'vue-router';

import { useUserStore } from '@/store/modules/user';

const ruleFormRef = ref<FormInstance>();
const router = useRouter();

const userStore = useUserStore();

const passwordType = ref('password');
const loading = ref(false);
const rules = reactive({
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
});
// 表单数据
const ruleForm = reactive({
  username: 'vueadmin',
  password: '123456',
});

const showPwd = () => {
  if (passwordType.value === 'password') {
    passwordType.value = '';
  } else {
    passwordType.value = 'password';
  }
};
const submitForm = () => {
  loading.value = true;
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      // 登录
      setTimeout(async () => {
        //登陆并写入到 userStore
        userStore.login(ruleForm);
        router.push({
          path: '/',
        });
        ElNotification({
          message: '欢迎登录 Vue Sys',
          type: 'success',
          duration: 3000,
        });
        loading.value = true;
      }, 1000);
    } else {
      console.log('error submit!');
      loading.value = false;
      //return false;
    }
  });
};
</script>
...
```

在路由目录 src/router 新建判断路由权限的文件 permission.ts 代码如下：

 ```javascript
 import router from './index';
import { useUserStore } from '@/store/modules/user';
//import { usePermissionStore } from './store/modules/permission';

const whiteList = ['/login']; // 设置白名单

router.beforeEach(async (to, from, next) => {

  // 设置标题
  if (typeof to.meta.title === 'string') {
    document.title = to.meta.title || 'vue sys';
  }
  const userStore = useUserStore();
  // 确定用户是否已登录过，存在Token
  const hasToken = userStore.token;
  if (hasToken) {
    if (to.path === '/login') {
      // 如果已登录，请重定向到主页
      next({ path: '/' });
    } 
    else{
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});

 ```

核心代码就是判断 userStore是否有已登陆的token，如果存在就直接进入首页，这里写的比较浅显，真实的后台是需要后端返回校验的token或者比较流行的jwt令牌，这里主要是模拟，通俗的说明原理

然后修改 src/main.ts 代码，把permission路由守卫模块引入全局

 ```javascript
 import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import router from './router';
import { createPinia } from 'pinia';

//导入路由守卫
import '@/router/permission';

import 'element-plus/dist/index.css';
import '@/styles/index.scss';

const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.use(createPinia());
app.mount('#app');
```

然后启动项目，这时如果输入 http://localhost:3301/#/home 会跳转到登陆页，然后点击登陆之后就可以，这里是模拟登陆，所以并未校验密码是否正确

剩下我们需要编写退出登陆

这时，我们先修改 src/router/index.ts 路由表，让其真正的加载子页面，代码如下：

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
        meta: { title: '首页', icon: 'House', affix: true, role: ['other'] },
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

这时，我们需要修改模版页 src/layout/Main/index.vue 让他支持子页面 <router-view>, 然后router-view就可以加载路由配置的children了。代码如下：

```html
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

```

然后需要修改Header，添加退出按钮事件，清除 src/store/user.ts登陆的token值

修改 src/layout/Header/index.vue 代码如下：

```javascript
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
        <el-dropdown @command="commandAction">
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
import { TabsPaneContext, ElMessageBox, ElMessage } from 'element-plus';
import { useUserStore } from '@/store/modules/user';
import router from '@/router';

import AvatarLogo from '@/assets/image/avatar.png';

const userStore = useUserStore();

const activeName = ref('first');
const toGitHub = (link) => {
  window.open(link);
};

const logOut = async () => {
  ElMessageBox.confirm('您是否确认退出登录?', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      await userStore.logout();
      await router.push({ path: '/login' });
      //TagsViewStore.clearVisitedView();
      ElMessage({
        type: 'success',
        message: '退出登录成功！',
      });
    })
    .catch(() => {});
};
const commandAction = (key: number) => {
  switch (key) {
    case 1:
      logOut();
      break;
  }
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

启动项目，便可自由的点击登陆和退出登陆

这里有个隐藏的bug，其实也不算bug，假如你需要持续保持登陆状态，无论浏览器何时打开，都能保存登陆状态，那我们就必须对userStore的值永久保存了，这里涉及到一个pinia的插件，其原理就是把内存值写到localStoreage

安装 pinia-persistedstate-plugin 和 pinia-plugin-persistedstate

```sh

yarn add pinia-persistedstate-plugin

yarn add pinia-plugin-persistedstate

```

修改 src/store/modules/user.ts 代码，使其支持永久保存

```javascript
import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: 'userState',
  // state: 返回对象的函数
  state: () => ({
    // 登录token
    token: null,
    // 登录用户信息
    userInfo: {},
    // 角色
    roles: [],
  }),
  getters: {},
  // 可以同步 也可以异步
  actions: {
    // 登录
    login(userInfo) {
      const { username } = userInfo;
      return new Promise((resolve) => {
        this.token = username;
        this.userInfo = userInfo;
        this.getRoles();
        resolve(username);
      });
    },
    // 获取用户授权角色信息，实际应用中 可以通过token通过请求接口在这里获取用户信息
    getRoles() {
      return new Promise((resolve) => {
        // 获取权限列表 默认就是超级管理员，因为没有进行接口请求 写死
        this.roles = ['admin'];
        resolve(this.roles);
      });
    },
    // 获取用户信息 ，如实际应用中 可以通过token通过请求接口在这里获取用户信息
    getInfo(roles) {
      return new Promise((resolve) => {
        this.roles = roles;
        resolve(roles);
      });
    },
    // 退出
    logout() {
      return new Promise((resolve) => {
        this.token = null;
        this.userInfo = {};
        this.roles = [];
        resolve(null);
      });
    },
  },
  // 进行持久化存储
  persist: {
    // 本地存储的名称
    key: 'userState',
    //保存的位置
    storage: window.localStorage, //localstorage
  },
});
```

然后在 src/main.ts 加入pinia永久保存到支持

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import router from './router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import '@/router/permission';

import 'element-plus/dist/index.css';
import '@/styles/index.scss';

const app = createApp(App);
app.use(ElementPlus);
app.use(router);
//app.use(createPinia());

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia)
app.mount('#app');

```

如果vscode报错，那可以运行代码检查，然后看具体出错原因，如果都没报任何错误，重启一下vscode便不会提示了，如果还是报错，那只能自己百度自行解决了。

运行启动，这时，如果上一次已经登陆，那么就会直接进入后台首页
