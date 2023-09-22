import { createApp } from "vue";
import App from "./App.vue";
// 让所有初始化样式统一
import "normalize.css";
// 导入自己的公共样式
import "@/assets/styles/common.less";
import router from './router'
import { createPinia } from 'pinia'
const app = createApp(App);
app.use(router);
app.use(createPinia())
app.mount("#app");
