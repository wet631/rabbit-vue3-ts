<script lang="ts" setup name="Layout">
import AppTopnav from "./components/app-topnav.vue";
import AppHeader from "./components/app-header.vue";
import AppFooter from "./components/app-footer.vue";
import AppHeaderSticky from "./components/app-header-sticky.vue";
import useStore from "@/store";
const { category } = useStore();
category.getAllCategory();
</script>
<template>
  <AppTopnav></AppTopnav>
  <AppHeader></AppHeader>
  <AppHeaderSticky></AppHeaderSticky>
  <main class="app-body">
    <!-- 路由出口 -->
    <RouterView></RouterView>
  </main>
  <AppFooter></AppFooter>
</template>

<style lang="less" scoped>
.app-body {
  min-height: 600px;
}
</style>
