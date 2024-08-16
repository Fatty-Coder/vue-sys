# vue3+TS+Vite+Element Plus管理系统

__注意：此教程涉及的源码在 https://github.com/Fatty-Coder/vue-sys/tree/tech001__

搭建一个通用的后台管理系统框架，使用目前主流技术栈

基础命令配置会跳过，不会使用yarn可以自行搜索一下，使用yarn主要为了省流量和硬盘空间 ^_^

新建一个目录 vue-sys 然后在目录下输入命令：

```sh
//添加vue
yarn add vue@latest

//添加vite
yarn add vite@latest

//添加TypeScript支持
yarn typescript vue-tsc -D

//添加@vitejs/plugin-vue依赖，这个跟vite.config.ts相关
yarn add @vitejs/plugin-vue

```

在根目录新建tsconfig.json文件，配置如下：

```json
{
    "compilerOptions": {
      "target": "ESNext",
      "useDefineForClassFields": true,
      "module": "ESNext",
      "moduleResolution": "Node",
      "strict": false,
      "jsx": "preserve",
      "sourceMap": true,
      "resolveJsonModule": true,
      "isolatedModules": true,
      "esModuleInterop": true,
      "lib": ["ESNext", "DOM"],
      // 跳过库检查，解决打包失败
      "skipLibCheck": true,
      /** baseUrl 用来告诉编译器到哪里去查找模块，使用非相对模块时必须配置此项 */
      "baseUrl": ".",
      "paths": {
        "@/*": ["src/*"]
      }
    },
    "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

在根目录新建vite.config.ts文件，配置如下：

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue()
  ],
})
```

在根目录新建index.html文件，其实整个html就是启动了main.ts。内容如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link rel="icon" href="/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>后台管理系统</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

新建一个src目录，并创建App.vue文件，内容如下：

```html
<template>
    <div>
      <h1>Hello,Vue3！</h1>
    </div>
</template>
<script setup lang="ts">

</script>
```

在src目录，创建main.ts文件，内容如下：

```typescript
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

以上步骤完成后，恭喜你，已经搭建了一个简易的前端，用最简洁的代码和目录去理解Vue的运行逻辑，然后使用yarn run 运行你的第一个程序

```sh
yarn run dev
```

进阶：使用Chrome浏览器调试你的前端程序，可以修改App.vue文件并加入断点（当然也可以在chrome加入断点），代码如下：

```html
<template>
    <div>
      <h1>Hello,Vue3！</h1>
      <span>num:{{ num }}</span>
    </div>
</template>
<script setup lang="ts">
let num : Number
debugger
num = 10 
</script>
```

