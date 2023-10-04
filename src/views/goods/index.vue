<script lang="ts" setup>
import useStore from "@/store";
import { storeToRefs } from "pinia";
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import GoodsSales from "./components/goods-sales.vue";
import GoodsName from "./components/goods-name.vue";
import GoodsSku from "./components/goods-sku.vue";
import GoodsDetail from "./components/goods-detail.vue";
import GoodsHot from './components/goods-hot.vue'
import GoodsImage from "@/views/goods/components/goods-image.vue";
const { goods } = useStore();
const route = useRoute();
const count = ref(5);
// 1.一进入页面立刻执行
// 2.依赖路由参数 路由参数变化 就需要进行执行
watchEffect(() => {
  const id = route.params.id as string;
  // 必须id存在且是商品页才能发请求
  if (id && route.fullPath === `/goods/${id}`) {
    goods.resetGoodsInfo();
    goods.getGoodsInfo(id);
  }
});
const { info } = storeToRefs(goods);

const changeSku = (skuId: string) => {
  // console.log(skuId)
  const sku = info.value.skus.find((item: any) => item.id === skuId);
  if (sku) {
    info.value.inventory = sku.inventory;
    info.value.price = sku.price;
    info.value.oldPrice = sku.oldPrice;
  }
};
</script>

<template>
  <div class="xtx-goods-page">
    <div class="container">
      <Transition name="fade">
        <div v-if="info.categories">
          <!-- 面包屑 -->
          <XtxBread>
            <XtxBreadItem to="/">首页</XtxBreadItem>
            <XtxBreadItem :to="`/category/${info.categories[1].id}`">
              {{ info.categories[1].name }}
            </XtxBreadItem>
            <XtxBreadItem :to="`/category/sub/${info.categories[0].id}`">
              {{ info.categories[0].name }}
            </XtxBreadItem>
            <XtxBreadItem>{{ info.name }}</XtxBreadItem>
          </XtxBread>

          <!-- 商品信息 -->
          <div class="goods-info">
            <div class="media">
              <GoodsImage :images="info.mainPictures"></GoodsImage>
              <GoodsSales />
            </div>
            <div class="spec">
              <!-- 商品名称  -->
              <GoodsName :goods="info" />
              <!-- sku组件 规格组件 -->
              <GoodsSku :goods="info" @changeSku="changeSku" />
              <!-- 数字选择框 -->
              <XtxNumbox
                v-model="count"
                :max="info.inventory"
                isLabel
                model="count"
              ></XtxNumbox>
              <XtxButton type="primary" style="margin-top: 20px">
                加入购物车
              </XtxButton>
            </div>
          </div>

          <!-- 商品详情 -->
          <div class="goods-footer">
            <div class="goods-article">
              <!-- 商品+评价 -->
              <div class="goods-tabs">
                <!-- 商品详情 -->
                <GoodsDetail :goods="info" />
              </div>
            </div>
            <!-- 24热榜+专题推荐 -->
            <div class="goods-aside">
              <!-- 24热榜+专题推荐 -->
              <div class="goods-aside">
                <GoodsHot :type="1" />
                <GoodsHot :type="2" />
                <GoodsHot :type="3" />
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <XtxBread>
            <XtxBreadItem to="/"></XtxBreadItem>
          </XtxBread>
          <!-- 商品信息 -->
          <div class="goods-info"></div>
          <!-- 商品详情 -->
          <div class="goods-footer">
            <div class="goods-article">
              <!-- 商品+评价 -->
              <div class="goods-tabs"></div>
            </div>
            <!-- 24热榜+专题推荐 -->
            <div class="goods-aside"></div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
