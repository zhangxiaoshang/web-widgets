export interface NewsOption {
  type: 1;
  // 基本信息
  size: Size;
  name: string;
  icon: string;

  // 数据获取
  origin: string;
  method: Method;
  api: string;
  revalidate?: number;

  // 属性映射
  mapList: string;
  mapTitle: string;
  mapTime: string;

  linkTemplate: string;
}

// 雪球估值
export interface XueQiuGuZhiOption {
  type: 2;
  size: Size;
  api: string;
  indexCodeList: string[];
}

// 牛熊指标
export interface NiuXiongZhiBiaoOption {
  type: 3;
  size: Size;
}

export type WidgetProps =
  | NewsOption
  | XueQiuGuZhiOption
  | NiuXiongZhiBiaoOption;

export interface AppConfig {
  widgets: WidgetProps[];
}
