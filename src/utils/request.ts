import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
  AxiosRequestConfig,
} from 'axios';
//import { ElMessage } from 'element-plus';
import { useUserStore } from '@/store/modules/user';
// 创建axios实例 进行基本参数配置
const service = axios.create({
  // 默认请求地址，根据环境的不同可在.env 文件中进行修改
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 设置接口访问超时时间
  timeout: 5000, // request timeout，
  // 跨域时候允许携带凭证
  withCredentials: true,
});

//  request interceptor 接口请求拦截
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    /**
     * 用户登录之后获取服务端返回的token,后面每次请求都在请求头中带上token进行JWT校验
     * token 存储在本地储存中（storage）、vuex、pinia
     */
    const userStore = useUserStore();
    const token: string = userStore.token;
    // 自定义请求头
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error: AxiosError) => {
    // 请求错误，这里可以用全局提示框进行提示
    return Promise.reject(error);
  }
);

//  response interceptor 接口响应拦截
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 直接返回res，当然你也可以只返回res.data
    // 系统如果有自定义code也可以在这里处理
    return response?.data;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/** 创建请求方法 */
function createRequest(service: AxiosInstance) {
  return function <T>(config: AxiosRequestConfig): Promise<T> {
    return service(config);
  };
}

/** 用于网络请求的方法 */
export const request = createRequest(service);
