<script lang="ts" setup name="XtxCarousel">
import { BannerItem } from "@/types/data";
import { onMounted, onUnmounted, ref, toRefs } from "vue";
// import { PropType } from 'vue';

// 如果 script中不写东西 name不起作用
// 1.js defineProps对象的写法
// defineProps({
//   slides: {
//     type: Array as PropType<BannerItem[]>,
//     required: true,
//   },
// })
// defineProps<props类型>() 给默认值
// const { slides, money = 100 } = defineProps<{
//   slides: BannerItem[],
//   money?: number
// }>()
// 设置默认值
// 第一种写法上
const {
  slides,
  autoPlay = false,
  duration = 2000,
} = defineProps<{
  slides: BannerItem[];
  autoPlay?: boolean;
  duration?: number;
}>();
// 第二种写法上
// const props = defineProps({
//   slides: {
//     type: Array as PropType<BannerItem[]>,
//     required: true,
//   },
//   duration: {
//     type: Number,
//     default: 3000,
//   },
//   autoPlay: {
//     type: Boolean,
//     default: false,
//   },
// })
const active = ref(0);
const prev = () => {
  if (active.value <= 0) {
    active.value = slides.length - 1;
  } else {
    active.value--;
  }
};

const next = () => {
  if (active.value >= slides.length - 1) {
    active.value = 0;
  } else {
    active.value++;
  }
};

// 定时器逻辑 控制轮博
const play = () => {
  // 如果没有自动播放
  if (!autoPlay) return;
  // 在ts中，使用定时器，window.setInterval
  timer = window.setInterval(() => {
    next();
  }, duration);
};
const stop = () => {
  clearInterval(timer);
};

let timer = -1;
// 自动播放
onMounted(() => {
  play();
});

onUnmounted(() => {
  stop();
});
</script>

<template>
  <div class="xtx-carousel" @mouseenter="stop" @mouseleave="play">
    <ul class="carousel-body">
      <li
        class="carousel-item"
        :class="{ fade: active === index }"
        v-for="(item, index) in slides"
        :key="item.id"
      >
        <RouterLink :to="item.hrefUrl">
          <img :src="item.imgUrl" alt="" />
        </RouterLink>
      </li>
    </ul>
    <!-- 左边箭头 -->
    <a @click="prev" href="javascript:;" class="carousel-btn prev">
      <i class="iconfont icon-angle-left"></i>
    </a>
    <!-- 右边箭头 -->
    <a @click="next" href="javascript:;" class="carousel-btn next">
      <i class="iconfont icon-angle-right"></i>
    </a>
    <!-- 小圆点 -->
    <div class="carousel-indicator">
      <span
        v-for="(item, index) in slides"
        :key="item.id"
        :class="{ active: active === index }"
        @mouseenter="active = index"
      ></span>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;

  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }

    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;

      &.fade {
        opacity: 1;
        z-index: 1;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }

    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;

      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;

        ~ span {
          margin-left: 12px;
        }

        &.active {
          background: #fff;
        }
      }
    }

    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;

      &.prev {
        left: 20px;
      }

      &.next {
        right: 20px;
      }
    }
  }

  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
