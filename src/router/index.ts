import { createRouter, createWebHashHistory } from "vue-router";
// layout不需要懒加载 因为每个都要用到 加载的
import Layout from "@/views/layout/index.vue";
import Home from "@/views/home/index.vue";
import useStore from "@/store";
const router = createRouter({
  history: createWebHashHistory(),
  // 返回到顶部
  scrollBehavior: () => {
    return {
      top: 0,
    };
  },
  routes: [
    {
      path: "/",
      component: Layout,
      children: [
        {
          path: "",
          component: Home,
        },
        {
          path: "/category/:id",
          component: () => import("@/views/category/index.vue"),
        },
        {
          path: "/category/sub/:id",
          component: () => import("@/views/category/sub.vue"),
        },
        // 不跟id 无法查询到对应的商品信息
        {
          path: "/goods/:id",
          component: () => import("@/views/goods/index.vue"),
        },
        {
          path: "/cart",
          component: () => import("@/views/cart/index.vue"),
        },
        {
          path: "/member/checkout",
          component: () => import("@/views/member/pay/checkout.vue"),
        },
        {
          path: "/member/pay",
          component: () => import("@/views/member/pay/index.vue"),
        },
      ],
    },
    {
      path: "/login",
      component: () => import("@/views/login/index.vue"),
    },
    {
      path: "/login/callback",
      component: () => import("@/views/login/callback.vue"),
    },
  ],
});
// 配置路由导航守卫，拦截 /member开头的所有的地址
router.beforeEach((to, from, next) => {
  // 判断用户登没登录
  const { cart } = useStore();
  if (cart.isLogin) {
    next();
  } else {
    if (to.path.includes("/member")) {
      next({
        path: "/login",
        query: {
          //fullPath 可以携带所有的数据
          redirectUrl: to.fullPath,
        },
      });
    } else {
      next();
    }
  }
});
export default router;
