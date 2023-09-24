import XtxSkeleton from "@/components/skeleton/index.vue"
import XtxCarousel from '@/components/carousel/index.vue'

declare module 'vue' {
  export interface GlobalComponents {
    // 组建名        组建类型
    XtxSkeleton: typeof XtxSkeleton,
    XtxCarousel:typeof XtxCarousel
  }
}
export {}