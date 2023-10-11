import request from "@/utils/request";
import { defineStore } from "pinia";
import { CartItem } from "@/types/cart";
import { ApiRes } from "@/types/data";
import useStore from "..";

type CheckObj = {
  isEffective: boolean;
  nowPrice: number;
  stock: number;
};

const useCartStore = defineStore({
  id: "cart",
  // 状态
  state: () => ({
    // 购物车列表
    list: [] as CartItem[],
  }),
  persist: {
    key: "rabbit-cart-92",
  },
  // 计算
  getters: {
    // 标记是否登录
    // !!=>转boolean
    isLogin(): boolean {
      const { user } = useStore();
      return !!user!.profile?.token;
    },
    // 基于原有的数据 进行筛选出有效的购物车列表
    // 计算有效商品列表 isEffective = true  filter
    effectiveList(): CartItem[] {
      return this.list.filter((item) => item.stock > 0 && item.isEffective);
    },
    // 有效商品总数量  把effctiveList中的每一项的count叠加起来
    effectiveListCounts(): number {
      return this.effectiveList.reduce((sum, item) => sum + item.count, 0);
    },
    // 总钱数  = 所有单项的钱数累加  单项的钱数 = 数量 * 单价
    effectiveListPrice(): string {
      return this.effectiveList
        .reduce((sum, item) => sum + item.count * Number(item.nowPrice), 0)
        .toFixed(2);
    },
    // 统计是否全部选中 设置是否全选
    isAllSelected(): boolean {
      return (
        this.effectiveList.length !== 0 &&
        this.effectiveList.every((item) => item.selected)
      );
    },
    // 已选择的列表
    selectedList(): CartItem[] {
      return this.effectiveList.filter((item) => {
        item.selected;
      });
    },
    // 已选择的总数量
    selectedListCounts(): number {
      return this.selectedList.reduce((sum, item) => sum + item.count, 0);
    },
    // 已选择的列表总价
    selectedListPrice(): string {
      return this.selectedList
        .reduce((sum, item) => sum + item.count * Number(item.nowPrice), 0)
        .toFixed(2);
    },
  },
  // 方法
  actions: {
    async addCart(data: CartItem) {
      if (this.isLogin) {
        const { skuId, count } = data;
        await request.post("/member/cart", {
          skuId,
          count,
        });
        // 重新获取购物车数据
        this.getCartList();
      } else {
        // console.log("本地add操作");
        // 1. 判断购物车列表中是否有该商品数据
        const goods = this.list.find((item) => item.skuId === data.skuId);
        if (goods) {
          // 2. 如果商品存在，直接把数量加起来
          goods.count += data.count;
        } else {
          // 3. 如果商品不存在，直接添加该商品
          this.list.unshift(data);
        }
      }
    },
    // 获取购物车列表
    async getCartList() {
      if (this.isLogin) {
        const res = await request.get<ApiRes<CartItem[]>>("/member/cart");
        this.list = res.data.result;
      } else {
        // console.log("本地获取操作");
        // 遍历 只发送一次请求
        this.list.forEach(async (cartItem) => {
          const skuId = cartItem.skuId;
          const res = await request.get<ApiRes<CheckObj>>(
            `/goods/stock/${skuId}`
          );
          const cartItemInfo = res.data.result;
          cartItem.nowPrice = (+cartItemInfo).toFixed(2);
          cartItem.stock = cartItemInfo.stock;
          cartItem.isEffective = cartItemInfo.isEffective;
        });
      }
    },
    // 删除购物车商品
    async deleteCart(skuIds: string[]) {
      if (this.isLogin) {
        await request.delete("/member/cart", {
          data: {
            ids: skuIds,
          },
        });
        this.getCartList();
      } else {
        // 只要skuIds 数组中存在 就要删除 =>都不留
        this.list = this.list.filter((item) => !skuIds.includes(item.skuId));
      }
    },
    // 修改更新购物车商品
    async updateCart(
      skuId: string,
      data: { selected?: boolean; count?: number }
    ) {
      if (this.isLogin) {
        await request.put(`/member/cart/${skuId}`, data);
        // 重新获取最新购物车列表
        this.getCartList();
      } else {
        const sku = this.effectiveList.find((item) => item.skuId === skuId)!;
        // 不等于undefined就说明传值了
        if (data.selected !== undefined) sku.selected = data.selected;
        if (data.count !== undefined) sku.count = data.count;
      }
    },
    // 修改全选或者全不选
    async updateCartAllSelected(isSelected: boolean) {
      if (this.isLogin) {
        await request.put("/member/cart/selected", {
          selected: isSelected,
        });
        // 获取购物车列表
        this.getCartList();
      } else {
        this.list.forEach((item) => {
          item.selected = isSelected;
        });
      }
    },
    // 清除购物车
    clearCart() {
      this.list = [];
    },
    // 合并购物车
    async mergeLocalCart() {
      const data = this.list.map(({ skuId, selected, count }) => ({
        skuId,
        selected,
        count,
      }));
      await request.post("/member/cart/merge", data);
      // 合并成功，重新获取购物车列表
      this.getCartList();
    },
  },
});

export default useCartStore;
