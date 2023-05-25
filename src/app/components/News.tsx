import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { NewsOption } from "@/interface/";
import { Widget, WidgetHeader, WidgetContent } from "./Widget";
import {
  parseTimestamp,
  getPropertyByString,
  formatTextByTemplate,
} from "@/utils";

dayjs.extend(utc);
dayjs.extend(timezone);

export default async function News(props: NewsOption) {
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
  const list = getPropertyByString(mapList, data);

  return (
    // large: 330*345
    <Widget size={size}>
      <WidgetHeader icon={icon} name={name} link={origin}></WidgetHeader>

      <WidgetContent>
        <ul>
          {list?.map((item: any, index: number) => (
            <li key={index} className="flex gap-x-1 py-1">
              {size !== "small" && (
                <span className={`flex-none w-5 text-stone-400 font-mono`}>
                  {index + 1}
                </span>
              )}

              <a
                href={formatTextByTemplate(linkTemplate, item)}
                target="_blank"
                className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap"
                title={getPropertyByString(mapTitle, item)}
              >
                {getPropertyByString(mapTitle, item)}
              </a>

              {size !== "small" && mapTime && (
                <span
                  className={`flex-none w-22 text-right font-mono text-stone-400`}
                  title={dayjs(
                    parseTimestamp(getPropertyByString(mapTime, item))
                  ).format("YYYY-MM-DD HH:mm:ss")}
                >
                  {dayjs(parseTimestamp(getPropertyByString(mapTime, item)))
                    .tz("Asia/Shanghai")
                    .format("HH:mm")}
                </span>
              )}
            </li>
          ))}
        </ul>
      </WidgetContent>
    </Widget>
  );
}
