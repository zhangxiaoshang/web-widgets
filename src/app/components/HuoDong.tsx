import { HuoDongOption } from "@/interface/";
import { Widget, WidgetHeader, WidgetContent } from "./Widget";
import {
  dayjs,
  parseTimestamp,
  getPropertyByString,
  formatTextByTemplate,
} from "@/utils";

export default async function HuoDong(props: HuoDongOption) {
  const {
    size,
    name,
    icon,

    origin,
    method,
    api,
    revalidate,

    mapList,
    titleTemplate,
    extraTemplate,
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
                title={getPropertyByString(titleTemplate, item)}
              >
                {formatTextByTemplate(titleTemplate, item)}
              </a>

              {size !== "small" && extraTemplate && (
                <span
                  className={`flex-none w-22 text-right font-mono text-stone-400`}
                >
                  {formatTextByTemplate(extraTemplate, item)}
                </span>
              )}
            </li>
          ))}
        </ul>
      </WidgetContent>
    </Widget>
  );
}
