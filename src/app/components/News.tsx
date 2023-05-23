import Image from "next/image";
import dayjs from "dayjs";
import { Roboto } from "next/font/google";
import { NewsOptions } from "@/interface/";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

function getPropertyByString(obj: any, propString: string): any {
  try {
    // 将 propString 按 "." 分隔，获取 key 及其父级对象数组
    const propArray = propString.split(".");

    // 如果 propString 只包含一个 key，则直接返回 getProperty(obj, key)
    if (propArray.length === 1) {
      return obj[propArray[0]];
    }

    // 否则，递归获取子对象的属性值
    const currentProp = propArray.shift()!;
    const childObj = obj[currentProp];
    if (!childObj) {
      return undefined;
    }

    return getPropertyByString(childObj, propArray.join("."));
  } catch (error) {
    console.error(error);
    console.log("getPropertyByString", { obj, propString });
    return undefined;
  }
}

function formatLink(linkTemplate: string, obj: any) {
  let url = "";

  // 正则匹配插槽 {abc}
  const slotReg = /{(.+)}/; // {xxx}
  const [slot, prop] = linkTemplate.match(slotReg) ?? [];

  // 通过插槽中定义的属性读取对象值，并构建url
  if (slot && prop) {
    const propVal = getPropertyByString(obj, prop);
    url = linkTemplate.replace(slot, propVal);
  }

  return url;
}

/**
 * @description 将时间值转换为ms为单位的时间戳
 * @param val 参数可以是 s | ms
 * @returns ms
 */
function formatTime(val: string): number {
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
    return new Date(val).valueOf();
  }

  console.log("位实现该时间的解析：", val);
  return Date.now();
}

// interface NewsProps {
//   // 基本信息
//   size: Size;
//   name: string;
//   icon: string;

//   // 数据获取
//   origin: string;
//   method: Method;
//   api: string;
//   revalidate?: number;

//   // 属性映射
//   mapList: string;
//   mapTitle: string;
//   mapTime: string;

//   linkTemplate: string;
// }
export default async function News(props: NewsOptions) {
  const {
    size,
    name,
    icon,

    origin,
    method,
    api,
    revalidate,

    mapList,
    mapTitle,
    mapTime,

    linkTemplate,
  } = props;

  // 1. 获取数据
  async function fetchData() {
    try {
      const res = await fetch(api, {
        method,
        next: {
          revalidate: revalidate || 60,
        },
      });

      return res.json();
    } catch (error) {
      console.error(error);
    }
  }

  // 2. 解析数据:新闻列表
  const data = await fetchData();
  const list = getPropertyByString(data, mapList);

  return (
    // large: 330*345
    <div
      className={`flex flex-col bg-white p-2 rounded-xl ${
        size === "large"
          ? "widget-lg row-span-2 col-span-2"
          : size === "medium"
          ? "widget-md row-span-1 col-span-2"
          : "widget-sm row-span-1 col-span-1"
      }`}
    >
      <div className="flex items-center ">
        <a
          href={origin}
          target="_blank"
          className="flex items-center gap-x-1 h-9 font-bold"
        >
          <span className="relative w-3.5 h-3.5">
            <Image src={icon} fill alt={name}></Image>
          </span>

          <h2>{name}</h2>
        </a>

        {/* extra */}
        {/* <span className="flex items-center ml-auto">
          <IconFullScreen active={true} onClick={() => {}}></IconFullScreen>
          <IconClsoe active={true} onClick={() => {}}></IconClsoe>
        </span> */}
      </div>

      <ul className="flex-1 overflow-y-auto">
        {list?.map((item: any, index: number) => (
          <li key={index} className="flex gap-x-1 py-1">
            {size !== "small" && (
              <span
                className={`flex-none w-5 text-stone-400 ${roboto.className}`}
              >
                {index + 1}
              </span>
            )}

            <a
              href={formatLink(linkTemplate, item)}
              target="_blank"
              className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap"
              title={getPropertyByString(item, mapTitle)}
            >
              {getPropertyByString(item, mapTitle)}
            </a>

            {size !== "small" && (
              <span
                className={`flex-none w-22 text-right font-mono text-stone-400 ${roboto.className}`}
                title={dayjs(
                  formatTime(getPropertyByString(item, mapTime))
                ).format("YYYY-MM-DD HH:mm:ss")}
              >
                {dayjs(formatTime(getPropertyByString(item, mapTime))).format(
                  "HH:mm"
                )}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
