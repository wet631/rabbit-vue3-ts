import XtxSkeleton from "@/components/skeleton/index.vue";
import XtxCarousel from "@/components/carousel/index.vue";
import XtxMore from "@/components/more/index.vue";
import XtxBread from "./Bread/index.vue";
import XtxBreadItem from "./Bread/Item.vue";
import XtxCity from "@/components/city/index.vue";
import XtxNumbox from "@/components/numbox/index.vue";
import XtxButton from "@/components/button/index.vue";
import XtxCheckbox from "@/components/checkbox/index.vue";
import XtxMessage from '@/components/message/index.vue'
declare module "vue" {
  export interface GlobalComponents {
    // 组建名        组建类型
    XtxSkeleton: typeof XtxSkeleton;
    XtxCarousel: typeof XtxCarousel;
    XtxMore: typeof XtxMore;
    XtxBread: typeof XtxBread;
    XtxBreadItem: typeof XtxBreadItem;
    XtxCity: typeof XtxCity;
    XtxNumbox: typeof XtxNumbox;
    XtxButton: typeof XtxButton;
    XtxCheckbox: typeof XtxCheckbox;
    XtxMessage: typeof XtxMessage
  }
}
export {};
