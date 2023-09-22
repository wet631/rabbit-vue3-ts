import { defineStore } from "pinia";
import request from "@/utils/request";
import { ApiRes, CategoryItem } from "@/types/data";
export default defineStore("category", {
  state: () => ({
    list: [] as CategoryItem[],
  }),
  actions: {
    async getAllCategory() {
      const res = await request.get<ApiRes<CategoryItem[]>>(
        "/home/category/head"
      );
      this.list = res.data.result; 
    },
  },
  getters: {},
});
