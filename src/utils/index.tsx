import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Shanghai");

/**
 * @description 将时间值转换为ms为单位的时间戳
 * @param val 参数可以是 s | ms
 * @returns ms
 */
export function parseTimestamp(val: string): number {
  // 13位时间戳(ms) 无需转换
  const msReg = /^\d{13}$/;
  if (msReg.test(val)) {
    return Number(val);
  }

  // 10位时间戳(sec)转13位时间戳(ms)
  const secReg = /^\d{10}$/;
  if (secReg.test(val)) {
    return Number(val) * 1000;
  }

  // 2023-05-22 17:07:08
  const regTime1 = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
  if (regTime1.test(val)) {
    return dayjs(val).valueOf();
  }

  console.log("位实现该时间的解析：", val);
  return Date.now();
}

/**
 * @description 提取对象的属性值
 * @param obj
 * @param propString eg: list[0].title
 * @returns
 */
export function getPropertyByString(prop: string, data: any): any {
  try {
    // 将 propString 按 "." 分隔，获取 key 及其父级对象数组
    const propArray = prop.split(".");

    // 如果 propString 只包含一个 key，则直接返回 getProperty(obj, key)
    if (propArray.length === 1) {
      return data[propArray[0]];
    }

    // 否则，递归获取子对象的属性值
    const currentProp = propArray.shift()!;
    const childObj = data[currentProp];
    if (!childObj) {
      return undefined;
    }

    return getPropertyByString(propArray.join("."), childObj);
  } catch (error) {
    console.error(error);
    console.log("getPropertyByString", { data, prop });
    return undefined;
  }
}

export function formatTextByTemplate(template: string, data: {}) {
  let str = "";

  // 正则匹配插槽 {name}
  const regexp = /{(\w+)}/g; // {name}

  let match;
  while ((match = regexp.exec(template)) !== null) {
    const prop = match[1];

    str = template.replace(`{${prop}}`, getPropertyByString(prop, data));
  }

  return str;
}
