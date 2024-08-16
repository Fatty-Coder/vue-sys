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
