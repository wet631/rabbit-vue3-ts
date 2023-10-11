import { ApiRes } from "@/types/data";
import { Profile } from "@/types/user";
import request from "@/utils/request";
import { getProfile, removeProfile, setProfile } from "@/utils/storage";
import { defineStore } from "pinia";
import useStore from "..";
export default defineStore({
  id: "user",
  // 状态
  state: () => ({
    // 个人信息
    profile: getProfile(),
  }),
  actions: {
    // 用户名密码登录
    async login(account: string, password: string) {
      const res = await request.post<ApiRes<Profile>>("/login", {
        account,
        password,
      });
      // 1. 保存用户信息到 state 中
      this.profile = res.data.result;
      // 让本地存
      setProfile(res.data.result);
      
      const {cart } = useStore()
      cart.mergeLocalCart()
    },
    //获取短信验证码
    async sendMobileMsg(mobile: string) {
      await request.get("/login/code", {
        params: {
          mobile,
        },
      });
    },
    async mobileLogin(mobile: string, code: string) {
      const res = await request.post<ApiRes<Profile>>("/login/code", {
        mobile,
        code,
      });
      // 1. 保存用户信息到 state 中
      this.profile = res.data.result;
      // setProfile(res.data.result);
      const { cart } = useStore();
      cart.mergeLocalCart();
    },
    // 退出
    logout() {
      // 只清除了个人信息
      this.profile = {} as Profile;
      removeProfile();
      const { cart } = useStore();
      // 清空购物车
      cart.clearCart();
    },
    // qq登录
    //  source: 1为pc，2为webapp，3为微信小程序, 4为Android, 5为ios, 6为qq, 7为微信
    async qqLogin(openId: string) {
      const res = await request.post<ApiRes<Profile>>("/login/social", {
        unionId: openId,
        source: 6,
      });
      // 1. 保存用户信息到 state 中
      this.profile = res.data.result;
      setProfile(res.data.result);
      const { cart } = useStore();
      cart.mergeLocalCart();
    },
    // 绑定qq的短信验证码
    async sendQQBindMsg(mobile: string) {
      await request.get("/login/social/code", {
        params: {
          mobile,
        },
      });
    },
    // 提供绑定的QQ登录
    async qqBindLogin(openId: string, mobile: string, code: string) {
      const res = await request.post<ApiRes<Profile>>("/login/social/bind", {
        mobile,
        code,
        unionId: openId,
      });
      // 1. 保存用户信息到 state 中
      this.profile = res.data.result;
      setProfile(res.data.result);

      const { cart } = useStore();
      cart.mergeLocalCart();
    },
    // 无账号无绑定 获取验证码
    async sendQQPathMsg(mobile: string) {
      await request.get("/register/code", {
        params: {
          mobile,
        },
      });
    },
    // 无账号无绑定 完善信息进行登录
    async qqPatchLogin(data: any) {
      const res = await request.post<ApiRes<Profile>>(
        `/login/social/${data.openId}/complement`,
        data
      );
      // 1. 保存用户信息到 state 中
      this.profile = res.data.result;
      setProfile(res.data.result);
      const { cart } = useStore();
      cart.mergeLocalCart();
    },
  },
  getters: {},
});
