<script lang="ts" setup>
import useStore from "@/store";
import { storeToRefs } from "pinia";
import { watchEffect } from "vue";
import { useRoute } from "vue-router";
import GoodsSales from "./components/goods-sales.vue";
import GoodsName from "./components/goods-name.vue";
import GoodsImage from "@/views/goods/components/goods-image.vue";
const { goods } = useStore();
const route = useRoute();

// 1.一进入页面立刻执行
// 2.依赖路由参数 路由参数变化 就需要进行执行
watchEffect(() => {
  const id = route.params.id as string;
  // 必须id存在且是商品页才能发请求
  if (id && route.fullPath === `/goods/${id}`) {
    goods.getGoodsInfo(id);
  }
});
const { info } = storeToRefs(goods);
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
              <GoodsName :goods="info" />
            </div>
          </div>

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
