import { createApp } from "vue";
import App from "./App.vue";
// 让所有初始化样式统一
import "normalize.css";
// 导入自己的公共样式
import "@/assets/styles/common.less";
import router from './router'
import { createPinia } from 'pinia'
// 注册组建的形式 
// import XtxSkeleton from "@/components/skeleton/index.vue"
import XtxUI from '@/components/index'
const app = createApp(App);
app.use(createPinia()) 
app.use(router);
// 注册组建 组建名 组建值
// app.component('XtxSkeleton',XtxSkeleton)
app.use(XtxUI) 

app.mount("#app");
