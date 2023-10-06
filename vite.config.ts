import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// 标准用法 node环境 需要使用require
// 原因在于vite中没有不支持require()
// const path = require('path')
import vueSetupExtend from "vite-plugin-vue-setup-extend";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    vueSetupExtend(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // 配置开发服务器
  server: {
    // QQ三方登录的回调uri为：http://www.corho.com:8080/#/login/callback
    // vite 中配置： www.corho.com:8080
    host: "www.corho.com",
    port: 8080,
    // 其他有价值的配置项
    open: true, // 帮我们打开浏览器
    cors: true, // 允许开发时 ajax 跨域
  },
  // 配置css的全局注入
  css: {
    // 预加载
    preprocessorOptions: {
      less: {
        additionalData: `
          @import "@/assets/styles/variables.less";
          @import "@/assets/styles/mixins.less";
        `,
      },
    },
  },
});
