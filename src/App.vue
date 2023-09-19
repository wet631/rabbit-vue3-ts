<script setup lang="ts">
import request from '@/utils/request'
const test = async () => {
  const res = await request.get('/home/index')
  console.log(res)
}
test()
</script>
<template>
  <div>111</div>
</template>
<style scoped></style>