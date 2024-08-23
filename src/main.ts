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
app.use(pinia);
app.mount('#app');
