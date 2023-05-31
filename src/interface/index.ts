export enum WidgetType {
  JINSECAIJING_NEWS = "JINSECAIJING_NEWS",
  JINSECAIJING_ACTIVE = "JINSECAIJING_ACTIVE",
  XUEQIU_ZHISHUGUZHI = "XUEQIU_ZHISHUGUZHI",
  DONGFANGCAIFU_NIUXIONGZHIBIAO = "DONGFANGCAIFU_NIUXIONGZHIBIAO",
  ZENDESK_ARTICLES = "ZENDESK_ARTICLES",
}

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

// 近期活动
export interface HuoDongOption {
  type: 4;
  size: Size;
  name: string;
  icon: string;
  origin: string;
  method: Method;
  api: string;
  revalidate?: number;

  mapList: string;
  titleTemplate: string;
  extraTemplate: string;
  linkTemplate: string;
}

// 金色财经·新闻
export interface JinSeCaiJinNewsOption {
  type: WidgetType.JINSECAIJING_NEWS;
  size: Size;
  icon?: string;
  name?: string;
  origin?: string;

  revalidate?: number;
  api: string;

  dataProp: string;
  nameTemplate: string;
  linkTemplate: string;
  timeProp: string;
}
// 金色财经·活动
export interface JinSeCaiJinActiveOption {
  type: WidgetType.JINSECAIJING_ACTIVE;
  size: Size;
  name: string;
  icon: string;
  origin: string;

  revalidate?: number;
  api: string;

  dataProp: string;
  nameProp: string;
  statusProp: string;
  linkTemplate: string;
}

// 雪球·指数估值
export interface ZhiShuGuZhiOption {
  type: WidgetType.XUEQIU_ZHISHUGUZHI;
  size: Size;
  api: string;
  codes: string[];
}

// 东方财富·牛熊指标
export interface NiuXiongZhiBiaoOption {
  type: WidgetType.DONGFANGCAIFU_NIUXIONGZHIBIAO;
  size: Size;
}

// zendesk 公告
export interface ZendeskArticlesOption {
  type: WidgetType.ZENDESK_ARTICLES;
  size: Size;

  icon?: string;
  name?: string;
  origin?: string;

  revalidate?: number;
  api: string;

  dataProp: string;
  nameTemplate: string;
  linkTemplate: string;
  timeProp: string;

  keywords?: string[];
}

export type WidgetProps =
  | NewsOption
  | XueQiuGuZhiOption
  | HuoDongOption
  // new
  | JinSeCaiJinNewsOption
  | JinSeCaiJinActiveOption
  | ZhiShuGuZhiOption
  | NiuXiongZhiBiaoOption
  | ZendeskArticlesOption;

export interface AppConfig {
  widgets: WidgetProps[];
}
