import { defineStore } from "pinia";
import request from "@/utils/request";
import { ApiRes, CategoryItem } from "@/types/data";
import { topCategory } from "../constants";
// 修改刷新的bug
const defaultCategory = topCategory.map((item) => {
  return {
    name: item,
  };
});

export default defineStore("category", {
  state: () => ({
    list: defaultCategory as CategoryItem[],
  }),
  actions: {
    async getAllCategory() {
      const res = await request.get<ApiRes<CategoryItem[]>>(
        "/home/category/head"
      );
      // 给每一个一级分类添加一个open属性，用于控制显示隐藏
      res.data.result.forEach((item) => {
        item.open = false;
      });
      this.list = res.data.result;
    },
    show(id: string) {
      const category = this.list.find((item) => item.id === id)
      category!.open = true
    },
    hide(id: string) {
      const category = this.list.find((item) => item.id === id)
      category!.open = false
    },
  },
  getters: {},
});
