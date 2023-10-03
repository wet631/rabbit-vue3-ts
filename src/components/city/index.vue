<script lang="ts" setup name="XtxCity">
import { ref, watch } from "vue";
import { onClickOutside } from "@vueuse/core";
import axios from "axios";
// 地址的数据
defineProps<{
  userAddress?: string;
}>();

// 选择的城市结果类型 组建对外输出的信息格式
export type CityResult = {
  provinceCode: string;
  provinceName: string;
  cityCode: string;
  cityName: string;
  countyCode: string;
  countyName: string;
};

const emit = defineEmits<{
  (e: "changeCity", value: CityResult): void;
}>();


// 城市列表类型
type AreaList = {
  code: string;
  level: number;
  name: string;
  areaList: AreaList[];
};

// 选择城市的结果
const changeResult = ref({
  provinceCode: "",
  provinceName: "",
  cityCode: "",
  cityName: "",
  countyCode: "",
  countyName: "",
});

// 点击是否展示省市区
const active = ref(false);
const toggle = () => {
  active.value = !active.value;
};
const cityList = ref<AreaList[]>([]);
const cacheList = ref<AreaList[]>([]);
const getCityList = async () => {
  const res = await axios.get<AreaList[]>(
    "https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json"
  );
  // 获取到省市县的数据 并进行在div上进行渲染
  // 操作视图
  cityList.value = res.data;
  // 保存原始数据
  cacheList.value = res.data;
};
getCityList();

// 监听关闭弹窗的处理，恢复数据 watchEffet一般处理路由缓存的问题
watch(active, (value) => {
  // 当关闭active的时候，需要回复数据
  if (!value) {
    cityList.value = cacheList.value;
  }
});

const target = ref(null);
// 处理点击外面时候关闭弹框
onClickOutside(target, (e) => {
  // 当点击target元素的外面的时候，就会触发
  active.value = false;
});

// 点击城市渲染下属城市 通过层级进行判断
const selectCity = (city: AreaList) => {
  if (city.level === 0) {
    // 省
    changeResult.value.provinceName = city.name;
    changeResult.value.provinceCode = city.code;
    cityList.value = city.areaList;
  }
  if (city.level === 1) {
    // 市
    changeResult.value.cityName = city.name;
    changeResult.value.cityCode = city.code;
    cityList.value = city.areaList;
  }
  if (city.level === 2) {
    // 县（区）
    changeResult.value.countyName = city.name;
    changeResult.value.countyCode = city.code;
    // 关闭弹窗
    active.value = false;
    // 子传父
    emit("changeCity", changeResult.value);
  }
};
</script>
<template>
  <div class="xtx-city" ref="target">
    <div class="select" :class="{ active: active }" @click="toggle">
      <span class="value" v-if="userAddress">{{ userAddress }}</span>
      <span class="placeholder" v-else>请选择配送地址</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-show="active">
      <span
        class="ellipsis"
        v-for="item in cityList"
        :key="item.code"
        @click="selectCity(item)"
      >
        {{ item.name }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
