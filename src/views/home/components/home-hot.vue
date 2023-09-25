<script lang="ts" setup>
import useStore from "@/store";
import HomePanel from "./home-panel.vue";
import { useLazyData } from "@/utils/hooks";
import HomeSkeleton from './home-skeleton.vue'
const { home } = useStore();
const target = useLazyData(() => {
  // 传值进去
  home.getHotList();
});
</script>
<template>
  <HomePanel ref="target" title="人气推荐" sub-title="人气爆款 不容错过">
   <Transition name="fade">
    <ul v-if="home.newGoodList.length > 0" ref="pannel" class="goods-list">
      <li v-for="item in home.hotGoodList" :key="item.id">
        <RouterLink to="/">
          <img v-lazy="item.picture" alt="" />
          <p class="name">{{ item.title }}</p>
          <p class="desc">{{ item.alt }}</p>
        </RouterLink>
      </li>
    </ul>

    <HomeSkeleton v-else></HomeSkeleton>
   </Transition>
  </HomePanel>
</template>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
.home-skeleton {
  width: 1240px;
  height: 406px;
  display: flex;
  justify-content: space-between;
  .item {
    width: 306px;
    .xtx-skeleton ~ .xtx-skeleton {
      display: block;
      margin: 16px auto 0;
    }
  }
}
</style>
