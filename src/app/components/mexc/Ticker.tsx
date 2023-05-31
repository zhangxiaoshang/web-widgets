import numberal from "numeral";
import {
  dayjs,
  parseTimestamp,
  getPropertyByString,
  formatTextByTemplate,
} from "@/utils";
import { MexcTickerOption } from "@/interface";

import { Widget } from "@/app/components/Widget/Widget";
import { WidgetHeader } from "@/app/components/Widget/WidgetHeader";
import { WidgetContent } from "@/app/components/Widget/WidgetContent";
import { TickerPriceInfo } from "./TickerPriceInfo";

export async function MexcTicker(props: MexcTickerOption) {
  const { size, icon, name, origin, revalidate, api, symbols } = props;

  try {
    // 1. 获取数据
    const requests = symbols.map((symbol) =>
      fetch(`${api}?symbol=${symbol.replace("_", "").toUpperCase()}`, {
        next: { revalidate: revalidate || 60 },
      })
    );
    const resList = await Promise.all(requests);
    const resDataList = await Promise.all(resList.map((res) => res.json()));

    const updateAt = dayjs().tz().format("HH:mm");

    return (
      <Widget size={size}>
        <WidgetHeader
          icon={icon}
          name={size === "small" ? updateAt : `${name}(${updateAt})`}
          link={origin}
        ></WidgetHeader>

        <WidgetContent>
          {resDataList.map((data, index) => (
            <TickerPriceInfo
              key={data.symbol}
              symbol={symbols[index]}
              size={size}
              data={data}
            ></TickerPriceInfo>
          ))}
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
