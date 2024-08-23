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
    } else {
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
