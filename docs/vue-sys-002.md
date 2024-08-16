# 安装一些常用的编码插件

__注意：此教程涉及的源码在 https://github.com/Fatty-Coder/vue-sys/tree/tech002__

安装eslint、prettier

```sh
// 添加eslint、 prettier并配置
yarn create vite-pretty-lint

// 添加typescript-eslint 依赖 因为是编码需要，所以只加在dev
yarn add typescript-eslint --dev

```

如果生成.eslintignore、.eslintrc.json这两个文件请删除，不然运行代码检查会报错

新增 lint:eslint 和 lint:prettier 检测命令，修改 package.json ,代码如下

```json
{
  "name": "vue-sys",
  "private": true,
  "version": "1.0.0-beta",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    //新增
    "lint:eslint": "eslint --cache --max-warnings 0 \"{src,tests,types}/**/*.{vue,js,jsx,ts,tsx}\" --fix",
    "lint:prettier": "prettier --write \"{src,tests,types}/**/*.{vue,js,jsx,ts,tsx,json,css,less,scss,html,md}\""
  },
  "dependencies": {
    "@vitejs/plugin-vue": "^5.1.2",
    "typescript": "^5.5.4",
    "vite": "^5.4.0",
    "vue": "^3.4.37",
    "vue-tsc": "^2.0.29"
  },
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^8.1.0",
    "@typescript-eslint/parser": "^8.1.0",
    "eslint": "^9.9.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.2.1",
    "eslint-plugin-vue": "^9.27.0",
    "prettier": "^3.3.3",
    "typescript-eslint": "^8.1.0",
    "vite-plugin-eslint": "^1.8.1",
    "vue-eslint-parser": "^9.4.3"
  }
}
```

运行代码检测

```sh
// 运行代码检测
yarn run lint:eslint

// 运行代码格式化
yarn run lint:prettier

```

提示：lint:eslint 名称不是固定的，你可以命名为 xlint、 jiance、checkcode等等

*固定运行端口*

一般运行代码时，应用都会启动随机端口，如果端口被占用会使用新的端口号，为了以后测试方便，所以固定启动端口就非常有必要，特别是存储的Cookie，如果改变了端口会失效。所以固定端口只需修改 vite.config.ts 配置，配置如下：

```javascript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [vue(), eslintPlugin()],
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