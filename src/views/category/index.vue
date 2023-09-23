<template>
    <div class="category">一级分类的{{ route.params }}</div>
  </template>
  
  <script lang="ts" name="TopCategory" setup>
  import { useRoute } from 'vue-router';
  const route = useRoute()

  </script>
  
  <style></style>