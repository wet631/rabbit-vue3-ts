// 所有的接口的通用类型
export interface ApiRes<T> {
  code: string;
  msg: string;
  result: T;
}

// // 单个分类的类型
// export type CategoryItem = {
//   id: string
//   name: string
//   picture: string
//   open: boolean
//   children: CategoryItem[]
// }

export type CategoryGoods = {
  desc: string;
  id: string;
  name: string;
  picture: string;
  price: string;
};

// 单个分类的类型
export type CategoryItem = {
  id: string;
  name: string;
  picture: string;
  open: boolean;
  children: CategoryItem[];
  goods: CategoryGoods[];
};

// 轮播图每一项的类型声明
export type BannerItem = {
  hrefUrl: string;
  id: string;
  imgUrl: string;
  type: string;
};
