export interface NewsOptions {
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

export interface AppConfig {
  widgets: NewsOptions[];
}
