// 注册插件文件 统一注册全局文件 
import XtxSkeleton from "@/components/skeleton/index.vue"
import XtxCarousel from '@/components/carousel/index.vue'
import XtxMore from './more/index.vue'
import { App } from 'vue'
export default {
    // app 创建出来的应用实例  类型是固定的 vue库内部会提供好的实例类型 
    install(app:App){
        app.component('XtxSkeleton',XtxSkeleton)
        app.component('XtxCarousel',XtxCarousel)
        app.component('XtxMore', XtxMore)
    }
}