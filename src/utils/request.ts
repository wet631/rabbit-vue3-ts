import Message from "@/components/message";
import useStore from "@/store";
import axios, { AxiosError } from "axios";
export const baseURL = 'https://apipc-xiaotuxian-front.itheima.net/'
// 备用接口地址: http://pcapi-xiaotuxian-front-devtest.itheima.net/
const instance = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front.itheima.net/",
  // baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net/",
  timeout: 5000,
});
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么  获取到token
    const {user} = useStore()
    if(user.profile.token){
      config.headers!.Authorization = `Bearer ${user.profile.token}`
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError<{ message: string; code: string }>) {
    // 对响应错误做点什么 响应压根没回来
    if (!error.response) {
      Message.error("网络异常，请稍后重试");
    } else {
      const { code, message } = error.response.data;
      if (code === "501" && message === "三方登录失败") {
        Message.error("当前qq号与平台账号未关联");
      } else {
        // 有响应 正常给提示
        Message.error(message);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
