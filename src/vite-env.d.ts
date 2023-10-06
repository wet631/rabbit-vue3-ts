/// <reference types="vite/client" />
// 推荐使用
declare module "*.vue" {
  // 引入vue模块中ts的方法
  import type { DefineComponent } from "vue";
  // 定义vue组件以及类型注解
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// 在这个命名空间下 可以声明很多方法
declare namespace QC {
  const Login: {
    /**
     * 检查QQ是否登录成功
     */
    check: () => boolean;
    /**
     * 获取openId
     *声明当中回调的类型 callback: (openId: string) => void
     */
    getMe: (callback: (openId: string) => void) => void;
  };
  const api: (api: "get_user_info") => { success: (res: any) => void };
}
