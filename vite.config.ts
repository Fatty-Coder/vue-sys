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
