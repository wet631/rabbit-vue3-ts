<script lang="ts" setup>
import HomeBanner from "./components/home-banner.vue";
import HomeCategory from "./components/home-category.vue";
import HomeNew from "./components/home-new.vue";
import HomeHot from "./components/home-hot.vue";
</script>

<template>
  <div class="page-home">
    <!-- 首页轮播区域  -->
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <!-- banner轮播图 -->
        <HomeBanner />
      </div>
    </div>
    <!-- <XtxMore>查看更多</XtxMore> -->
    <!-- 新鲜好物 -->
    <HomeNew></HomeNew>
    <!-- 人气推荐 -->
    <HomeHot></HomeHot>
  </div>
</template>

<style lang="less" scoped></style>
