import {
  dayjs,
  parseTimestamp,
  getPropertyByString,
  formatTextByTemplate,
} from "@/utils";
import { JinSeCaiJinNewsOption } from "@/interface";

import { Widget } from "@/app/components/Widget/Widget";
import { WidgetHeader } from "@/app/components/Widget/WidgetHeader";
import { WidgetContent } from "@/app/components/Widget/WidgetContent";

function LinkItem(
  props: { index: number; data: any } & Partial<JinSeCaiJinNewsOption>
) {
  const { size, index, data, nameTemplate, linkTemplate, timeProp } = props;

  const link = formatTextByTemplate(data, linkTemplate);
  const title = formatTextByTemplate(data, nameTemplate);
  const time = parseTimestamp(getPropertyByString(String(timeProp), data));
  const datetimeFormated = dayjs(time)
    .tz("Asia/Shanghai")
    .format("YYYY-MM-DD HH:mm:ss");
  const timeFormated = dayjs(time).tz("Asia/Shanghai").format("HH:mm");

  return (
    <li className="flex gap-x-1 py-1">
      {size !== "small" && (
        <span className={`flex-none w-5 text-stone-400 font-mono`}>
          {index}
        </span>
      )}

      <a
        href={link}
        target="_blank"
        className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap visited:text-stone-400 hover:text-black hover:font-bold"
        title={title}
      >
        {title}
      </a>

      {size !== "small" && timeProp && (
        <span
          className={`flex-none w-22 text-right font-mono text-stone-400`}
          title={datetimeFormated}
        >
          {timeFormated}
        </span>
      )}
    </li>
  );
}

export async function JinSeCaiJinNews(props: JinSeCaiJinNewsOption) {
  const {
    size,
    icon,
    name,
    origin,
    revalidate,
    api,
    dataProp,
    nameTemplate,
    linkTemplate,
    timeProp,
  } = props;

  try {
    // 1. 获取数据
    const res = await fetch(api, { next: { revalidate: revalidate || 60 } });
    const resData = await res.json();
    const data = getPropertyByString(resData, dataProp);

    return (
      <Widget size={size}>
        <WidgetHeader icon={icon} name={name} link={origin}></WidgetHeader>

        <WidgetContent>
          <ul>
            {data?.map((item: any, index: number) => (
              <LinkItem
                key={JSON.stringify(item)}
                index={index + 1}
                size={size}
                data={item}
                nameTemplate={nameTemplate}
                linkTemplate={linkTemplate}
                timeProp={timeProp}
              ></LinkItem>
            ))}
          </ul>
        </WidgetContent>
      </Widget>
    );
  } catch (error: any) {
    return (
      <Widget size={size}>
        <WidgetHeader icon={icon} name={name} link={origin}></WidgetHeader>
        <WidgetContent>
          <p className="text-center">{error.message}</p>
        </WidgetContent>
      </Widget>
    );
  }
}
