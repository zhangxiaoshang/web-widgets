import {
  dayjs,
  parseTimestamp,
  getPropertyByString,
  formatTextByTemplate,
} from "@/utils";
import { JinSeCaiJinActiveOption } from "@/interface";

import { Widget } from "@/app/components/Widget/Widget";
import { WidgetHeader } from "@/app/components/Widget/WidgetHeader";
import { WidgetContent } from "@/app/components/Widget/WidgetContent";

// 提取活动地点
function extractAddress(data: any) {
  console.log(data.title);
  const props = ["address", "street", "city", "province", "country"];

  const reg = /请选择/g;
  let address = "";
  for (let i = 0; i < props.length; i++) {
    address = data[props[i]];

    if (!reg.test(address)) {
      break;
    }
  }

  if (reg.test(address)) {
    address = "";
  }

  return address;
}

function LinkItem(
  props: { index: number; data: any } & Partial<JinSeCaiJinActiveOption>
) {
  const { size, index, data, linkTemplate, nameProp, statusProp } = props;

  const link = formatTextByTemplate(data, linkTemplate);
  const title = getPropertyByString(data, nameProp);
  const status = getPropertyByString(data, statusProp);
  const address = extractAddress(data);

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
        {!!address && <b>[{address}]</b>}
        {title}
      </a>

      {size !== "small" && status && (
        <span className={`flex-none w-22 text-right font-mono`} title={status}>
          <span
            className={
              status === "报名中"
                ? "text-rose-600"
                : status === "进行中"
                ? "text-green-600"
                : "text-stone-400"
            }
          >
            {status}
          </span>
        </span>
      )}
    </li>
  );
}

export async function JinSeCaiJinActive(props: JinSeCaiJinActiveOption) {
  const { size, icon, name, origin, revalidate, api, dataProp } = props;

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
                data={item}
                {...props}
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
