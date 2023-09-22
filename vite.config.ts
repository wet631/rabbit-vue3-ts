import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// 标准用法 node环境 需要使用require
// 原因在于vite中没有不支持require()
// const path = require('path')
import vueSetupExtend from "vite-plugin-vue-setup-extend";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueSetupExtend()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
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
