<script setup lang="ts" name="GoodsSku">
import { GoodsInfo, SpecValue, Spec } from "@/types/goods";
import bwPowerSet from "@/utils/power-set";
// sku组件的基本使用
// 1.必须传入商品信息对象 拥有启用禁用 选择功能
// 2.可选 传入 skuId 默认回显 默认让一些规格选中
// 3.当全部规格 选完的时候 确定了一个sku 需要子传父 将skuId 传给父

const props = defineProps<{
  goods: GoodsInfo;
  skuId?: string;
}>();

const emit = defineEmits<{
  (e: "changeSku", skuId: string): void;
}>();
const SplitStr = "+";
//修改按钮的选中状态
const changeSelected = (spec: Spec, specValue: SpecValue) => {
  if (specValue.disabled) return;
  if (specValue.selected) {
    //如果已经选中的话 那么就取消选中
    specValue.selected = false;
  } else {
    // 把同级所有(包括sub)的全部取消选中
    spec.values.forEach((v) => (v.selected = false));
    // 让sub选中
    specValue.selected = true;
  }
  //   一旦按钮被重新选择了 按钮状态也会随之需要更新
  updateDisabledStatus();

  //    判断 是否可选规格 都选择
  const selectArr = getSelectedSpec().filter((item) => item);
  if (selectArr.length === props.goods.specs.length) {
    // 说明全部选中 将得到的数组 转成字符串 去pathMap 中找到的对应的skuId
    const key = selectArr.join(SplitStr);
    const result = pathMap[key];
    const skuId = result[0];
    emit("changeSku", skuId);
  } else {
    // 取消的时候也要进行传递 
    emit("changeSku", "");
  }
};

//一进入页面的时候 控制状态 => 需要路径字典
// 基于数据的skus，得到路径字典
const getPatchMap = () => {
  const pathMap: any = {};
  // 1.过滤所有的skus 得到有效的skus（库存大于0）
  const skus = props.goods.skus.filter((item) => item.inventory > 0);
  // 2.遍历有效的sku 获取到sku子集 进行处理
  skus.forEach((item) => {
    // 3.整理数据 整理到 [属性1，属性2，属性3]
    const arr = item.specs.map((sub) => sub.valueName);

    // 4.基于整理到属性列表 得出子集
    const powerSet = bwPowerSet(arr);

    // 5. 遍历子集 将子集的数据 往pathMap中整理
    // 1.如果筛选条件不存在 新开属性 存
    // 2.如果筛选条件 已存在的话 在已有属性上累加
    powerSet.forEach((sub) => {
      // 将数组的信息拼合成一个字符串 将来作为键   sku.id作为值
      const key = sub.join(SplitStr);
      // 判断键在对象中是否存在
      if (key in pathMap) {
        // console.log(pathMap);
        //  存在
        pathMap[key].push(item.id);
      } else {
        // 不存在
        pathMap[key] = [item.id];
      }
    });
  });
  return pathMap;
};

// 更新按钮的禁用状态
const updateDisabledStatus = () => {
  const selectArr = getSelectedSpec();
  props.goods.specs.forEach((item, index) => {
    item.values.forEach((sub) => {
      // 让当前这个按钮 进行组合
      // 注意 这边尝试组合 判断是否禁用 需要拷贝一份原数组
      const tempArr = [...selectArr];
      tempArr[index] = sub.name;
      const key = tempArr.filter((item) => item).join(SplitStr);
      if (key in pathMap) {
        // 当前规格的名字在pathMap存在，不禁用
        sub.disabled = false;
      } else {
        // 当前规格在pathMap找不到，禁用
        sub.disabled = true;
      }
    });
  });
};

// 获取选中的规格
const getSelectedSpec = () => {
  const arr: string[] = [];
  // 根据现有的所有按钮 进行遍历 将选中的值 按照下标存入数组
  props.goods.specs.forEach((item) => {
    const temp = item.values.find((sub) => sub.selected);
    arr.push(temp ? temp.name : "");
  });
  return arr;
};

// 设置父传子 传递的skuId 进行回显 设置选中状态
const initSelectSpec = () => {
  const sku = props.goods.skus.find((item) => item.id === props.skuId);
  if (sku) {
    // 如果根据父组件传递的skuId找到了对应的sku,设置默认选中
    props.goods.specs.forEach((item, index) => {
      // 获取到sku中选中的规格
      const value = sku.specs[index].valueName;
      // 让value对应的规格选中
      const spec = item.values.find((item) => item.name === value);
      spec!.selected = true;
    });
  }
};
// 1.基于数据skus 得到路径字典
const pathMap = getPatchMap();
// 2.先按照skuId进行初始化 将选中的状态设置好
initSelectSpec();
// 3.根据目前已经选中的项 更新禁用状态
updateDisabledStatus();
</script>
<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.name">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="sub in item.values" :key="sub.name">
          <img
            v-if="sub.picture"
            :src="sub.picture"
            alt=""
            :title="sub.name"
            @click="changeSelected(item, sub)"
            :class="{ selected: sub.selected, disabled: sub.disabled }"
          />
          <span
            v-else
            :class="{ selected: sub.selected, disabled: sub.disabled }"
            @click="changeSelected(item, sub)"
            >{{ sub.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>

<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        margin-top: 5px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        padding: 0 20px;
        margin-top: 5px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
