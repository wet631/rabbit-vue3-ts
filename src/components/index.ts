// 注册插件文件 统一注册全局文件   注册全局指令
import XtxSkeleton from "@/components/skeleton/index.vue";
import XtxCarousel from "@/components/carousel/index.vue";
import XtxMore from "./more/index.vue";
import defaultImg from '@/assets/images/200.png'
import { App } from "vue";
import { useIntersectionObserver } from "@vueuse/core";
export default {
  // app 创建出来的应用实例  类型是固定的 vue库内部会提供好的实例类型
  install(app: App) {
    // 构建组建
    app.component("XtxSkeleton", XtxSkeleton);
    app.component("XtxCarousel", XtxCarousel);
    app.component("XtxMore", XtxMore);

    // 构建指令
    app.directive('lazy', {
        mounted(el: HTMLImageElement, { value }) {
          // 图片的懒加载逻辑
          // 参数1：回调函数
          // 参数2：可选的配置
        //   el 目标元素  binding指令的相关信息==>value
          const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
            if (isIntersecting) {
              // 停止监听
              stop()
              // 给el元素设置src属性
              // value = '123.jpg'
              el.src = value
              // 如果图片加载失败，显示默认的图片
              el.onerror = function () {
                el.src =  defaultImg
              }
            }
          })
        }
      })
  },
};
