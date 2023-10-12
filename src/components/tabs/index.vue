<script setup lang="tsx">
import { Slots, useSlots } from "vue";
import { provide } from "vue";

// 需要获取到插槽的内容  一方面渲染插槽的内容 另一方面根据插槽的内容动态渲染导航
const slots = useSlots();

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["update:modelValue",'tab-click']);

// 将modelValue共享下去 让其保持响应式
const { modelValue } = toRefs(props);
provide("activeNameValue", modelValue);

const clickFn = (item: any) => {
  // 子传父
  emit("update:modelValue", item.props?.name);
  emit("tab-click", {
    tab:item,
    index:index
  });

};
const Tabs = () => {
  // 拿到默认插槽节点
  const defaultArr = (slots as any).default();

  // 动态生成导航
  const panes: any = [];
  // 对每个节点做判断
  defaultArr.forEach((item: any) => {
    // 处理基本的写法，直接内部写 XtxTabsPanel
    if (item.type.name === "XtxTabsPane") {
      panes.push(item);
    } else {
      // 处理v-for的情况
      if (item.children) {
        // 一个节点 => 7个panel  遍历children 动态往panes中推
        item.children.forEach((panel: any) => {
          panes.push(panel);
        });
      }
    }
  });

  //  根据panes动态的生成导航
  const navs = (
    <nav>
      {panes?.map((item,index) => {
        return (
          <a
            href="javascript:;"
            class={{ active: props.modelValue === item.props?.name }}
            onClick={() => clickFn(item,index)}
          >
            {item.props?.label}
          </a>
        );
      })}
    </nav>
  );
  return <div class="xtx-tabs">{[navs, panes]}</div>;
};
</script>

<template>
  <Tabs></Tabs>
</template>

<style lang="less">
.xtx-tabs {
  background: #fff;
  > nav {
    height: 60px;
    line-height: 60px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    > a {
      width: 110px;
      border-right: 1px solid #f5f5f5;
      text-align: center;
      font-size: 16px;
      &.active {
        border-top: 2px solid @xtxColor;
        height: 60px;
        background: #fff;
        line-height: 56px;
      }
    }
  }
}
</style>
