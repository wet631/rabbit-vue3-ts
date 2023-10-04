type GoodsDetail = {
  pictures: string[];
  properties: {
    name: string;
    value: string;
  }[];
};
// sku 类型 最小库存单元 => 决定是否禁用
// sku的类型
export type Sku = {
  id: string;
  inventory: number;
  oldPrice: string;
  price: string;
  skuCode: string;
  specs: {
    name: string;
    valueName: string;
  }[];
};

// 规格按钮
export type SpecValue = {
  desc: string;
  name: string;
  picture: string;
  selected: boolean; //选中还是未选中
  disabled: boolean; //控制禁用与否
};

// 商品的规格类型
export type Spec = {
  name: string;
  values: SpecValue[];
};
// 商品模块的类型声明
export type GoodsInfo = {
  id: string;
  name: string;
  spuCode: string;
  desc: string;
  price: string;
  oldPrice: string;
  discount: number;
  inventory: number;
  salesCount: number;
  commentCount: number;
  collectCount: number;
  mainVideos: any[];
  videoScale: number;
  mainPictures: string[];
  isPreSale: boolean;
  isCollect?: any;
  recommends?: any;
  userAddresses?: any;
  evaluationInfo?: any;
  categories: {
    id: string;
    name: string;
  }[];
  specs: Spec[];
  skus: Sku[];
  details: GoodsDetail;
};

// 城市列表类型
export type AreaList = {
  code: string;
  level: number;
  name: string;
  areaList: AreaList[];
};
